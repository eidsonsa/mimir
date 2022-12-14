import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTest from "../../hooks/useGetTest";
import PageContainer from "../../components/PageContainer";
import useQuestions from "../../hooks/useQuestions";
import CodeImage from "../../components/CodeImage";
import logo from "../../assets/logo.png";
import useSubmitAnswer from "../../hooks/useSubmitAnswer";
import useOrderQuestions from "../../hooks/useOrderQuestions";

const TestSubmission = () => {
  const theme = useTheme();

  const { testId } = useParams();
  const { test } = useGetTest(testId);
  const { orderedQuestions } = useOrderQuestions(test);

  const [page, setPage] = useState(0);
  const [demographicAnswers, setDemographicAnswers] = useState();
  const [testAnswers, setTestAnswers] = useState();
  const [actualQuestion, setActualQuestion] = useState();
  const [startTime, setStartTime] = useState();
  const [exitScreen, setExitScreen] = useState(false);
  const [showError, setShowError] = useState(false);

  const inputRef = useRef(null);

  const { questions: questionsList } = useQuestions(true);
  const { submitAnswer } = useSubmitAnswer();

  useEffect(() => {
    if (page >= 2 && page <= lastPage) {
      setActualQuestion(
        questionsList.find(
          (question) => question.id === orderedQuestions[page - 2]
        ).data
      );
    }
  }, [page, questionsList, orderedQuestions]);

  if (!test || !questionsList) {
    return <Typography>Loading</Typography>;
  }

  document.addEventListener("visibilitychange", () => {
    if (!exitScreen && document.visibilityState !== "visible") {
      setExitScreen(true);
    }
  });

  const lastPage = 1 + test.questions.length;

  const handleSubmit = () => {
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;
    const demographicAnswersArray = Object.entries(demographicAnswers).map(
      (entry) => ({ demographicQuestion: entry[0], answer: entry[1] })
    );
    const testAnswersArray = Object.entries(testAnswers).map((entry) => ({
      question: entry[0],
      answer: entry[1],
    }));
    try {
      submitAnswer({
        testId,
        demographicAnswers: demographicAnswersArray,
        answers: testAnswersArray,
        elapsedTime,
        exitScreen,
      });
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  const handleClick = () => {
    if (page === 1 || (page === 0 && test.demographicQuestions.length === 0)) {
      setStartTime(Date.now());
    }
    if (page > 1 && page !== lastPage) {
      inputRef.current.value = "";
    }
    if (page === lastPage) {
      handleSubmit();
    }
    setPage(page + 1);
  };

  const isDisabled =
    page === 1
      ? !!demographicAnswers === false ||
        Object.keys(demographicAnswers).length !==
          test.demographicQuestions.length
      : page > 1 && page <= lastPage
      ? inputRef.current && inputRef.current.value === ""
      : false;

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {test.title}
      </Typography>
      <Box marginTop={8}>
        {page === 0 ? (
          <Typography
            variant="h5"
            textAlign="left"
            sx={{ whiteSpace: "pre-line" }}
          >
            {test.instructionsPage}
          </Typography>
        ) : page === 1 ? (
          <>
            {test.demographicQuestions.length === 0 && setPage(2)}
            {test.demographicQuestions.map((question) => {
              return (
                <Box key={question} width={500}>
                  <TextField
                    label={question}
                    variant="outlined"
                    fullWidth
                    sx={{ marginY: 2 }}
                    onChange={(event) =>
                      setDemographicAnswers({
                        ...demographicAnswers,
                        [question]: event.target.value,
                      })
                    }
                  />
                </Box>
              );
            })}
          </>
        ) : page === lastPage + 1 ? (
          <>
            <Typography variant="h5">
              {showError
                ? "Something have occurred. Try again later!"
                : "Your submission was sent successfully. Thank you for using Mimir!"}
            </Typography>
            <Box component="img" src={logo} maxWidth={600} marginTop={3} />
          </>
        ) : (
          <>
            {actualQuestion ? (
              <>
                <CodeImage question={actualQuestion} />
                <TextField
                  label={actualQuestion.statement}
                  variant="outlined"
                  fullWidth
                  sx={{ marginY: 2 }}
                  inputRef={inputRef}
                  onChange={(event) =>
                    setTestAnswers({
                      ...testAnswers,
                      [actualQuestion.title]: event.target.value,
                    })
                  }
                />
              </>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </>
        )}
        {page <= lastPage && (
          <Box textAlign="center">
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{ borderRadius: 20, width: 200, marginTop: 5 }}
              disabled={isDisabled}
              fullWidth
            >
              {page === lastPage ? "Submit" : "Next"}
            </Button>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default TestSubmission;
