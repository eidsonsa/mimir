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
  Chip,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import useQuestions from "../../hooks/useQuestions";
import { useNavigate } from "react-router";
import PageContainer from "../../components/PageContainer";
import { getId } from "../../utils/idUtils";
import useTests from "../../hooks/useTests";
import useGetTest from "../../hooks/useGetTest";

const CreateOrEditTest = ({ testId }) => {
  const theme = useTheme();
  const { addTest, updateTest } = useTests();
  const { test } = useGetTest(testId);
  const { questions: questionsData } = useQuestions();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const isEdit = !!testId;

  if (isEdit && !test) {
    return;
  }

  if (!questionsData) {
    return <Typography>Loading...</Typography>;
  }

  const questions = questionsData.map((question) => question.data.title);

  const initialInstructionsPage =
    "You will answer a few demographic questions and test your code comprehension.\n\nGood luck!";

  const initialValues = isEdit
    ? {
        title: test.title,
        instructionsPage: test.instructionsPage,
        demographicQuestions: test.demographicQuestions.join("\n"),
        questions: test.questions,
        showExpectedAnswer: test.showExpectedAnswer,
      }
    : {
        title: "",
        instructionsPage: initialInstructionsPage,
        demographicQuestions: [],
        questions: [],
        showExpectedAnswer: false,
      };

  const onSubmitTest = (values) => {
    const demographicArrayQuestions = values.demographicQuestions.split("\n");
    const questionsIds = values.questions.map(getId);
    const newValues = {
      ...values,
      demographicQuestions: demographicArrayQuestions,
      questions: questionsIds,
    };
    try {
      if (isEdit) {
        const valuesWithId = { ...newValues, id: testId };
        updateTest(valuesWithId);
      } else {
        addTest(newValues);
      }
      const id = isEdit ? testId : getId(values.title);
      navigate(`/test/${id}`);
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
    if (!values.instructionsPage) {
      errors.instructionsPage = "Required";
    }
    if (values.questions.length === 0) {
      errors.questions = "Required";
    }

    return errors;
  };

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        {isEdit ? "Edit " : "Create "} Test
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
          onSubmit={onSubmitTest}
          validate={validate}
          validateOnMount
        >
          {({ handleChange, handleSubmit, setFieldValue, values, isValid }) => (
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
                label="Instructions page"
                variant="outlined"
                multiline
                minRows={10}
                maxRows={10}
                fullWidth
                value={values.instructionsPage}
                sx={{ marginY: 1 }}
                name="instructionsPage"
                onChange={handleChange}
              />
              <TextField
                label="Demographic Questions"
                variant="outlined"
                multiline
                minRows={5}
                maxRows={5}
                fullWidth
                value={values.demographicQuestions}
                sx={{ marginY: 1 }}
                name="demographicQuestions"
                placeholder="Type 1 question on each line"
                onChange={handleChange}
              />
              <FormControl sx={{ marginY: 1 }}>
                <InputLabel>Questions</InputLabel>
                <Select
                  label="Questions"
                  onChange={(event) =>
                    setFieldValue("questions", event.target.value)
                  }
                  multiple
                  value={values.questions}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {questions.map((question) => (
                    <MenuItem value={question} key={question}>
                      {question}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(event) =>
                      setFieldValue("showExpectedAnswer", event.target.checked)
                    }
                    value={values.showExpectedAnswer}
                  />
                }
                label="Show Expected Answer"
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
          )}
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

export default CreateOrEditTest;
