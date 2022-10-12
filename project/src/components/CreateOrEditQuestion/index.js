import React, { useState } from "react";
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
  Alert,
  Fab,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import useQuestions from "../../hooks/useQuestions";
import useGetQuestion from "../../hooks/useGetQuestion";
import { useNavigate } from "react-router";
import PageContainer from "../../components/PageContainer";
import { getId } from "../../utils/idUtils";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const CreateOrEditQuestion = ({ questionId }) => {
  const theme = useTheme();
  const { addQuestion, updateQuestion } = useQuestions();
  const { question } = useGetQuestion(questionId);
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

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
        code: [""],
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
      setShowError(true);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }
    if (values.code[0] === "") {
      errors.instructionsPage = "Required";
    }
    if (!values.statement) {
      errors.instructionsPage = "Required";
    }
    if (!values.expectedAnswer) {
      errors.instructionsPage = "Required";
    }

    return errors;
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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitQuestion}
          validate={validate}
          validateOnMount
        >
          {({ handleChange, handleSubmit, setFieldValue, values, isValid }) => {
            return (
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
                <FieldArray
                  name="code"
                  render={(arrayHelpers) => (
                    <>
                      {values.code &&
                        values.code.map((val, index) => (
                          <>
                            <TextField
                              label="Code Snippet"
                              variant="outlined"
                              multiline
                              minRows={10}
                              maxRows={10}
                              fullWidth
                              value={val}
                              sx={{ marginY: 1 }}
                              name={`code.${index}`}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                const { value } = e.target;

                                if (e.key === "Tab") {
                                  e.preventDefault();

                                  const cursorPosition =
                                    e.target.selectionStart;
                                  const cursorEndPosition =
                                    e.target.selectionEnd;
                                  const tab = "\t";

                                  e.target.value =
                                    value.substring(0, cursorPosition) +
                                    tab +
                                    value.substring(cursorEndPosition);

                                  e.target.selectionStart = cursorPosition + 1;
                                  e.target.selectionEnd = cursorPosition + 1;
                                }
                              }}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    <Fab
                                      color="primary"
                                      size="small"
                                      onClick={() => arrayHelpers.remove(index)}
                                      disabled={values.code.length < 2}
                                    >
                                      <HorizontalRuleIcon />
                                    </Fab>
                                    {index === values.code.length - 1 && (
                                      <Fab
                                        size="small"
                                        color="primary"
                                        sx={{ marginLeft: 1 }}
                                        onClick={() => {
                                          arrayHelpers.push("");
                                        }}
                                        disabled={
                                          values.code.findIndex(
                                            (val) => val === ""
                                          ) !== -1
                                        }
                                      >
                                        <AddIcon />
                                      </Fab>
                                    )}
                                  </>
                                ),
                              }}
                            />
                          </>
                        ))}
                    </>
                  )}
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
                    <MenuItem value="c">C</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
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
                  disabled={!isValid}
                >
                  {isEdit ? "Update" : "Create"}
                </Button>
              </>
            );
          }}
        </Formik>
        {showError && (
          <Alert severity="error" sx={{ marginTop: 3 }} variant="filled">
            Something have occurred. Try again later!
          </Alert>
        )}
      </Box>
    </PageContainer>
  );
};

export default CreateOrEditQuestion;
