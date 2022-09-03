import React from "react";
import {
  Button,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import useGetQuestion from "../../hooks/useGetQuestion";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import CodeImage from "../../components/CodeImage";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";

const Question = () => {
  const theme = useTheme();
  const navigation = useNavigate();
  const { questionId } = useParams();
  const { question } = useGetQuestion(questionId);

  if (!question) {
    return <Typography>Loading</Typography>;
  }

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {question.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          columnGap: 20,
          marginTop: 4,
          flexDirection: "column",
        }}
      >
        <CodeImage question={question} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            width: 600,
            marginTop: 4,
          }}
        >
          <Tooltip title={question.statement}>
            <TextField
              label={question.statement}
              variant="outlined"
              fullWidth
              sx={{ marginY: 2 }}
              value={question.expectedAnswer}
              InputProps={{ style: { fontSize: 24 } }}
              InputLabelProps={{ style: { fontSize: 24 } }}
            />
          </Tooltip>
          <Button
            variant="contained"
            onClick={() => navigation.navigate(`/question/${questionId}/edit`)}
          >
            Edit question
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Question;
