import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../services/firebaseConfig";

export default function useGetTest(testId) {
  const [test, setTest] = useState();

  useEffect(() => {
    getTest();
  }, []);

  function getTest() {
    const docRef = doc(db, "tests", testId);
    getDoc(docRef)
      .then((response) => {
        if (response.exists()) {
          setTest(response.data());
        }
      })
      .catch((error) => console.log(error.message));
  }

  return { test };
}
