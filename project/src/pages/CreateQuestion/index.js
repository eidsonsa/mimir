import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Button, Box, Typography } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import logo from "../../assets/logo.png";

const CreateQuestion = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Create</Typography>
    </Box>
  );
};

export default CreateQuestion;
