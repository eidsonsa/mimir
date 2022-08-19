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
  Chip,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import useTests from "../../hooks/useTests";
import useQuestions from "../../hooks/useQuestions";
import PageContainer from "../../components/PageContainer";

const CreateTest = () => {
  const theme = useTheme();
  const { addTest } = useTests();
  const { questions: questionsData } = useQuestions();
  const navigate = useNavigate();

  if (!questionsData) {
    return <Typography>Loading...</Typography>;
  }

  const questions = questionsData.map((question) => question.id);

  const initialValues = {
    title: "",
    instructionsPage: "",
    demographicQuestions: [],
    questions: [],
    showExpectedAnswer: false,
  };

  const onCreateTest = (values) => {
    try {
      const demographicArrayQuestions = values.demographicQuestions.split("\n");
      const newValues = {
        ...values,
        demographicQuestions: demographicArrayQuestions,
      };
      addTest(newValues);
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        Create Test
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingX: 2,
          flexDirection: "column",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={onCreateTest}>
          {({ handleChange, handleSubmit, setFieldValue, values }) => (
            <>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                sx={{ marginY: 1 }}
                name="title"
                onChange={handleChange}
              />
              <TextField
                label="Instructions page"
                variant="outlined"
                multiline
                minRows={10}
                maxRows={10}
                fullWidth
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
                  />
                }
                label="Show Expected Answer"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ marginTop: 3 }}
              >
                Create
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </PageContainer>
  );
};

export default CreateTest;
