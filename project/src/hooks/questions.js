import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";

export default function useListQuestions() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    getQuestions();
  }, []);

  function getQuestions() {
    const questionsCollectionRef = collection(db, "questions");
    getDocs(questionsCollectionRef)
      .then((response) => {
        const questionsList = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setQuestions(questionsList);
      })
      .catch((error) => console.log(error.message));
  }

  return { questions };
}
