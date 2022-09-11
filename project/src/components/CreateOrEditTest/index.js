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
  Fab,
} from "@mui/material";
import { FieldArray, Formik } from "formik";
import useQuestions from "../../hooks/useQuestions";
import { useNavigate } from "react-router";
import PageContainer from "../../components/PageContainer";
import { getId } from "../../utils/idUtils";
import useTests from "../../hooks/useTests";
import useGetTest from "../../hooks/useGetTest";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

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
        demographicQuestions: test.demographicQuestions,
        questions: test.questions,
        showExpectedAnswer: test.showExpectedAnswer,
      }
    : {
        title: "",
        instructionsPage: initialInstructionsPage,
        demographicQuestions: [""],
        questions: [],
        showExpectedAnswer: false,
      };

  const onSubmitTest = (values) => {
    const questionsIds = values.questions.map(getId);
    const newValues = {
      ...values,
      demographicQuestions:
        values.demographicQuestions[0] === ""
          ? []
          : values.demographicQuestions,
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

              <FieldArray
                name="demographicQuestions"
                render={(arrayHelpers) => (
                  <>
                    {values.demographicQuestions &&
                      values.demographicQuestions.map((val, index) => (
                        <TextField
                          label="Demographic Question"
                          variant="outlined"
                          sx={{ marginY: 1 }}
                          fullWidth
                          value={val}
                          name={`demographicQuestions.${index}`}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <>
                                <Fab
                                  color="primary"
                                  size="small"
                                  onClick={() => arrayHelpers.remove(index)}
                                  disabled={
                                    values.demographicQuestions.length === 1
                                  }
                                >
                                  <HorizontalRuleIcon />
                                </Fab>
                                {index ===
                                  values.demographicQuestions.length - 1 && (
                                  <Fab
                                    size="small"
                                    color="primary"
                                    sx={{ marginLeft: 1 }}
                                    onClick={() => {
                                      arrayHelpers.push("");
                                    }}
                                    disabled={
                                      values.demographicQuestions.findIndex(
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
                      ))}
                    {values.demographicQuestions.length === 0 && (
                      <Button
                        onClick={() => {
                          arrayHelpers.push("");
                        }}
                        variant="contained"
                        sx={{ marginY: 1 }}
                      >
                        add Demographic question
                      </Button>
                    )}
                  </>
                )}
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
