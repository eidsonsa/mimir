import React from "react";
import {
  Button,
  Box,
  Typography,
  useTheme,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import useQuestions from "../../hooks/useQuestions";
import useGetQuestion from "../../hooks/useGetQuestion";
import { useNavigate } from "react-router";
import PageContainer from "../../components/PageContainer";
import { getId } from "../../utils/idUtils";

const CreateOrEditQuestion = ({ questionId }) => {
  const theme = useTheme();
  const { addQuestion, updateQuestion } = useQuestions();
  const { question } = useGetQuestion(questionId);
  const navigate = useNavigate();

  const isEdit = !!questionId;

  if (isEdit && !question) {
    return;
  }

  const initialValues = isEdit
    ? {
        title: question.title,
        code: question.code,
        statement: question.statement,
        expectedAnswer: question.expectedAnswer,
        isPrivate: question.isPrivate,
        syntaxHighlighting: question.syntaxHighlighting,
      }
    : {
        title: "",
        code: "",
        statement: "",
        expectedAnswer: "",
        isPrivate: false,
        syntaxHighlighting: "",
      };

  const onSubmitQuestion = (values) => {
    try {
      if (isEdit) {
        const valuesWithId = { ...values, id: questionId };
        updateQuestion(valuesWithId);
      } else {
        addQuestion(values);
      }
      const id = isEdit ? questionId : getId(values.title);
      navigate(`/question/${id}`);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {isEdit ? "Edit " : "Create "} Question
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingX: 2,
          flexDirection: "column",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={onSubmitQuestion}>
          {({ handleChange, handleSubmit, setFieldValue, values }) => (
            <>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                sx={{ marginY: 1 }}
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <TextField
                label="Code"
                variant="outlined"
                multiline
                minRows={10}
                maxRows={10}
                fullWidth
                value={values.code}
                sx={{ marginY: 1 }}
                name="code"
                onChange={handleChange}
                onKeyDown={(e) => {
                  const { value } = e.target;

                  if (e.key === "Tab") {
                    e.preventDefault();

                    const cursorPosition = e.target.selectionStart;
                    const cursorEndPosition = e.target.selectionEnd;
                    const tab = "\t";

                    e.target.value =
                      value.substring(0, cursorPosition) +
                      tab +
                      value.substring(cursorEndPosition);

                    e.target.selectionStart = cursorPosition + 1;
                    e.target.selectionEnd = cursorPosition + 1;
                  }
                }}
              />
              <TextField
                label="Statement"
                variant="outlined"
                fullWidth
                sx={{ marginY: 1 }}
                value={values.statement}
                name="statement"
                onChange={handleChange}
              />
              <TextField
                label="Expected Answer"
                variant="outlined"
                fullWidth
                sx={{ marginY: 1 }}
                value={values.expectedAnswer}
                name="expectedAnswer"
                onChange={handleChange}
              />
              <FormControl sx={{ marginY: 1 }}>
                <InputLabel>Syntax Highlighting</InputLabel>
                <Select
                  label="Syntax Highlighting"
                  onChange={(event) =>
                    setFieldValue("syntaxHighlighting", event.target.value)
                  }
                  value={values.syntaxHighlighting || ""}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="javascript">Javascript</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(event) =>
                      setFieldValue("isPrivate", event.target.checked)
                    }
                    value={values.isPrivate}
                  />
                }
                label="Is Private"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ marginTop: 3 }}
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </PageContainer>
  );
};

export default CreateOrEditQuestion;