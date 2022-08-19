import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import useGetQuestion from "../../hooks/useGetQuestion";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import html2canvas from "html2canvas";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PageContainer from "../../components/PageContainer";

const Question = () => {
  const theme = useTheme();

  const { questionId } = useParams();
  const { question } = useGetQuestion(questionId);
  const [codeImage, setCodeImage] = useState();

  const handleGetCodeImage = async (question) => {
    if (question) {
      const element = document.getElementById("code-image");
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      if (element.style.display !== "none") {
        setCodeImage(data);
      }
      element.style.display = "none";
    }
  };

  useEffect(() => {
    handleGetCodeImage(question);
  }, [question]);

  if (!question) {
    return <Typography>Loading</Typography>;
  }

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {question.title}
      </Typography>
      <Box component="img" src={codeImage} />
      <div id="code-image">
        <SyntaxHighlighter language={question.syntaxHighlighting} style={nord}>
          {question.code}
        </SyntaxHighlighter>
      </div>
      <Typography
        color={theme.palette.primary.main}
        variant="h5"
        paddingBottom={2}
      >
        {question.statement}
      </Typography>
      <Accordion color="primary">
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined color="primary" />}
          sx={{
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ color: theme.palette.primary.main }}>
            Expected Answer
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: theme.palette.primary.main }}>
            {question.expectedAnswer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </PageContainer>
  );
};

export default Question;
