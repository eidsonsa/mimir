import React, { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import listQuestions from "../../hooks/questions";

const Home = () => {
  const { user, signOut } = useContext(AuthGoogleContext);
  const userLoggedIn = JSON.parse(user);
  const theme = useTheme();

  const { questions } = listQuestions();

  console.log(questions);
  if (!questions) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="img" src={logo} sx={{ height: 200 }} />
      <Typography color={theme.palette.primary.main} variant="h4">
        Welcome, {userLoggedIn.displayName}!
      </Typography>
      {questions.map((question) => (
        <Typography>{question.data.statement}</Typography>
      ))}
    </Box>
  );
};

export default Home;
