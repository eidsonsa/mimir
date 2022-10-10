import { useEffect, useState } from "react";
import { getPairs, randomPermutation } from "../utils/orderUtils";

export default function useOrderQuestions(test) {
  const [orderedQuestions, setOrderedQuestions] = useState(undefined);
  const questions = test ? test.questions : undefined;
  const pairsList = test ? test.pairs : undefined;

  useEffect(() => {
    if (questions && pairsList && pairsList.length !== 0) {
      const questionsNumbers = questions.map((val, index) => index);
      const pairsNumbers = pairsList.map((val) =>
        questions.findIndex((question) => question === val)
      );
      const pairs = getPairs(pairsNumbers);
      const order = randomPermutation(questionsNumbers, pairs);
      const orderedList = order.map((position) => questions[position]);
      if (pairsList.length === questions.length) {
        const fullOrderedList = orderedList;
        orderedList.forEach((val) => {
          const defaultIndex = pairsList.findIndex(
            (question) => question === val
          );
          const pair =
            defaultIndex % 2 === 0
              ? pairsList[defaultIndex + 1]
              : pairsList[defaultIndex - 1];
          fullOrderedList.push(pair);
        });
        setOrderedQuestions(fullOrderedList);
      } else {
        setOrderedQuestions(orderedList);
      }
    } else if (questions) {
      setOrderedQuestions(
        questions
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    }
  }, [questions, pairsList]);

  return { orderedQuestions };
}
