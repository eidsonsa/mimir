import { collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";

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
    setDoc(doc(db, "questions", values.title), {
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

  return { questions, addQuestion };
}
