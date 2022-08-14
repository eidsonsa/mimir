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
import { useNavigate } from "react-router";

const CreateQuestion = () => {
  const theme = useTheme();
  const { addQuestion } = useQuestions();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    code: "",
    statement: "",
    expectedAnswer: "",
    isPrivate: false,
    syntaxHighlighting: "",
  };

  const onCreateQuestion = (values) => {
    try {
      addQuestion(values);
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={theme.palette.primary.main} variant="h4">
        Create Question
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingX: 2,
          flexDirection: "column",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={onCreateQuestion}>
          {({ handleChange, handleSubmit, setFieldValue }) => (
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
                label="Code"
                variant="outlined"
                multiline
                minRows={10}
                maxRows={10}
                fullWidth
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

                    // if you modify the value programmatically, the cursor is moved
                    // to the end of the value, we need to reset it to the correct
                    // position again
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
                name="statement"
                onChange={handleChange}
              />
              <TextField
                label="Expected Answer"
                variant="outlined"
                fullWidth
                sx={{ marginY: 1 }}
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
                >
                  <MenuItem value="auto">Auto</MenuItem>
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
                  />
                }
                label="Is Private"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ marginTop: 3 }}
              >
                Submit
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateQuestion;
