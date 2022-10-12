import React, { useEffect, useRef } from "react";
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTest from "../../hooks/useGetTest";
import PageContainer from "../../components/PageContainer";
import HomeTable from "../../components/HomeTable";
import useExportSubmissions from "../../hooks/useExportSubmissions";
import { CSVLink } from "react-csv";
import SpaceBetweenBox from "../../components/SpaceBetweenBox";
import { useNavigate } from "react-router";
import useQuestions from "../../hooks/useQuestions";

const Test = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { testId } = useParams();
  const { test } = useGetTest(testId);
  const { csv } = useExportSubmissions(testId);
  const { questions: questionsData } = useQuestions();
  const csvLink = useRef();

  const answerLink = `${window.location.host}/answer/${testId}`;

  useEffect(() => {
    if (csv) {
      const element = document.getElementById("link");
      if (element) {
        element.style.display = "none";
      }
    }
  }, [csv]);

  if (!test || !questionsData) {
    return <Typography>Loading</Typography>;
  }

  const questions = questionsData.filter((quest) =>
    test.questions.includes(quest.id)
  );

  console.log(test.instructionsPage);

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {test.title}
      </Typography>
      <SpaceBetweenBox>
        <HomeTable rows={questions} link="/question" title="Questions" />
        <Box sx={{ flex: 1, marginTop: 2 }}>
          <Typography color={theme.palette.primary.main} variant="h5">
            Instructions Page
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            variant="body1"
            sx={{ whiteSpace: "pre-line" }}
          >
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
        </Box>
      </SpaceBetweenBox>
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
        <Button
          variant="contained"
          onClick={() => navigate(`/test/${testId}/edit`)}
        >
          Edit test
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Test;
