import React, { useEffect, useRef } from "react";
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTest from "../../hooks/useGetTest";
import PageContainer from "../../components/PageContainer";
import HomeTable from "../../components/HomeTable";
import useExportSubmissions from "../../hooks/useExportSubmissions";
import { CSVLink } from "react-csv";

const Test = () => {
  const theme = useTheme();

  const { testId } = useParams();
  const { test } = useGetTest(testId);
  const { csv } = useExportSubmissions(testId);
  const csvLink = useRef();

  const answerLink = `${window.location.host}/answer/${testId}`;

  useEffect(() => {
    if (csv) {
      const element = document.getElementById("link");
      element.style.display = "none";
    }
  }, [csv]);

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

  console.log(csv);

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
                key={question}
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
      <Box display="flex" flexDirection="row" columnGap={10} marginTop={10}>
        <Tooltip title="Link will be copied to your clipboard">
          <Button
            variant="contained"
            onClick={() => navigator.clipboard.writeText(answerLink)}
          >
            Submission Link
          </Button>
        </Tooltip>
        {csv && (
          <Box>
            <Tooltip title="Submissions will be downloaded as CSV">
              <Button
                variant="contained"
                onClick={() => csvLink.current && csvLink.current.link.click()}
              >
                Export Answers
              </Button>
            </Tooltip>
            <CSVLink
              data={csv}
              filename={`${testId}_submissions.csv`}
              id="link"
              ref={csvLink}
              target="_blank"
            />
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default Test;
