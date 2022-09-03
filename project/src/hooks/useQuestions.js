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

export default function useQuestions() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    getQuestions();
  }, []);

  const questionsCollectionRef = collection(db, "questions");

  function getQuestions() {
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

  function addQuestion(values) {
    const id = getId(values.title);
    setDoc(doc(db, "questions", id), {
      title: values.title,
      code: values.code,
      statement: values.statement,
      expectedAnswer: values.expectedAnswer,
      isPrivate: values.isPrivate,
      syntaxHighlighting: values.syntaxHighlighting,
    })
      .then(() => {
        console.log("Question created!");
      })
      .catch((error) => console.error(error.message));
  }

  function updateQuestion(values) {
    const questionRef = doc(db, "questions", values.id);

    updateDoc(questionRef, {
      title: values.title,
      code: values.code,
      statement: values.statement,
      expectedAnswer: values.expectedAnswer,
      isPrivate: values.isPrivate,
      syntaxHighlighting: values.syntaxHighlighting,
    })
      .then(() => {
        console.log("Question updated!");
      })
      .catch((error) => console.error(error.message));
  }

  return { questions, addQuestion, updateQuestion };
}
