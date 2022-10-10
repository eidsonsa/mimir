import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";
import { getId } from "../utils/idUtils";
import useGetUser from "./useGetUser";

export default function useTests() {
  const [tests, setTests] = useState();
  const { user } = useGetUser();

  useEffect(() => {
    getTests();
  }, [user]);

  const testsCollectionRef = collection(db, "tests");

  function getTests() {
    getDocs(testsCollectionRef)
      .then((response) => {
        if (user) {
          const testsList = response.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }));
          const filtered = testsList.filter(
            (test) => test.data.creator === user.email
          );
          setTests(filtered);
        }
      })
      .catch((error) => console.log(error.message));
  }

  function addTest(values) {
    const id = getId(values.title);
    setDoc(doc(db, "tests", id), {
      title: values.title,
      instructionsPage: values.instructionsPage,
      demographicQuestions: values.demographicQuestions,
      questions: values.questions,
      showExpectedAnswer: false,
      creator: user.email,
      pairs: values.pairs,
    })
      .then(() => {
        console.log("Test created!");
      })
      .catch((error) => console.error(error.message));
  }

  function updateTest(values) {
    const testRef = doc(db, "tests", values.id);

    updateDoc(testRef, {
      title: values.title,
      instructionsPage: values.instructionsPage,
      demographicQuestions: values.demographicQuestions,
      questions: values.questions,
      showExpectedAnswer: false,
      pairs: values.pairs,
    })
      .then(() => {
        console.log("Test updated!");
      })
      .catch((error) => console.error(error.message));
  }

  return { tests, addTest, updateTest };
}
