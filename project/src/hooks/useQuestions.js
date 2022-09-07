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

export default function useQuestions() {
  const [questions, setQuestions] = useState();
  const { user } = useGetUser();

  useEffect(() => {
    getQuestions();
  }, [user]);

  const questionsCollectionRef = collection(db, "questions");

  function getQuestions() {
    getDocs(questionsCollectionRef)
      .then((response) => {
        if (user) {
          const questionsList = response.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }));
          const filtered = questionsList.filter(
            (question) =>
              question.data.isPrivate === false ||
              question.data.creator === user.email
          );
          setQuestions(filtered);
        }
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
      creator: user.email,
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
