import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";

export default function useExportSubmissions(testId) {
  const [submissions, setSubmissions] = useState();
  const [csv, setCSV] = useState();

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    getCSV();
  }, [submissions, getCSV]);

  const querySubmissions = query(
    collection(db, "submissions"),
    where("testId", "==", testId)
  );

  function getSubmissions() {
    getDocs(querySubmissions)
      .then((response) => {
        const submissionsList = response.docs.map((doc) => doc.data());
        setSubmissions(submissionsList);
      })
      .catch((error) => console.log(error.message));
  }

  function getCSV() {
    if (submissions && submissions.length >= 1) {
      const headerDemographicQuestions = submissions[0].demographicAnswers.map(
        (val) => val.demographicQuestion
      );
      const headerQuestions = submissions[0].answers.map((val) => val.question);
      const header = []
        .concat(headerDemographicQuestions)
        .concat(headerQuestions)
        .concat(["elapsedTime", "exitScreen"]);

      const items = submissions.map((obj) => {
        const answer = headerQuestions.map((val) => {
          const item = obj.answers.find((ans) => ans.question === val);
          return item ? item.answer : "";
        });
        const demographicAnswer = headerDemographicQuestions.map((val) => {
          const item = obj.demographicAnswers.find(
            (ans) => ans.demographicQuestion === val
          );
          return item ? item.answer : "";
        });
        const item = []
          .concat(demographicAnswer)
          .concat(answer)
          .concat([obj.elapsedTime ?? "", obj.exitScreen ?? ""]);
        return item;
      });

      const csvData = [].concat(items);
      csvData.unshift(header);
      setCSV(csvData);
    }
  }

  return { csv };
}
