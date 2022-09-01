import { doc, setDoc } from "@firebase/firestore";

import { db } from "../services/firebaseConfig";

export default function useSubmitAnswer() {
  function submitAnswer(values) {
    setDoc(doc(db, "submissions", Date.now().toString()), {
      testId: values.testId,
      demographicAnswers: values.demographicAnswers,
      answers: values.answers,
      elapsedTime: values.elapsedTime.toString(),
      exitScreen: values.exitScreen,
    })
      .then(() => {
        console.log("Submission created!");
      })
      .catch((error) => console.error(error.message));
  }

  return { submitAnswer };
}
