import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";

export default function useGetQuestion(questionId) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    getQuestion();
  }, []);

  function getQuestion() {
    if (questionId) {
      const docRef = doc(db, "questions", questionId);
      getDoc(docRef)
        .then((response) => {
          if (response.exists()) {
            setQuestion(response.data());
          }
        })
        .catch((error) => console.log(error.message));
    }
  }

  return { question };
}
