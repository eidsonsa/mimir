import React from "react";
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTest from "../../hooks/useGetTest";
import PageContainer from "../../components/PageContainer";
import HomeTable from "../../components/HomeTable";

const Test = () => {
  const theme = useTheme();

  const { testId } = useParams();
  const { test } = useGetTest(testId);

  const answerLink = `${window.location.host}/answer/${testId}`;

  if (!test) {
    return <Typography>Loading</Typography>;
  }

  const questions = test.questions.map((question) => {
    return {
      id: question,
      data: {
        title: question,
      },
    };
  });

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {test.title}
      </Typography>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <HomeTable rows={questions} link="/question" title="Questions" />
        <Box sx={{ flex: 1, marginTop: 2 }}>
          <Typography color={theme.palette.primary.main} variant="h5">
            Instructions Page
          </Typography>
          <Typography color={theme.palette.primary.main} variant="body1">
            {test.instructionsPage}
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            variant="h5"
            marginTop={6}
          >
            Demographic Questions
          </Typography>
          {test.demographicQuestions.map((question) => {
            return (
              <Typography
                color={theme.palette.primary.main}
                variant="body1"
                marginBottom={1}
              >
                {question}
              </Typography>
            );
          })}
          <Typography
            color={theme.palette.primary.main}
            variant="h5"
            marginTop={6}
          >
            Show Expected Answer
          </Typography>
          <Typography color={theme.palette.primary.main} variant="body1">
            {test.showExpectedAnswer ? "True" : "False"}
          </Typography>
        </Box>
      </Box>
      <Tooltip title="Link will be copied to your clipboard">
        <Button
          variant="contained"
          onClick={() => navigator.clipboard.writeText(answerLink)}
        >
          Submission Link
        </Button>
      </Tooltip>
    </PageContainer>
  );
};

export default Test;
