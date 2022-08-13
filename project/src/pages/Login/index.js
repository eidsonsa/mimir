import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Button, Box } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import logo from "../../assets/logo.png";

const Login = () => {
  const { signInGoogle, isLoggedIn } = useContext(AuthGoogleContext);

  const loginGoogle = async () => {
    await signInGoogle();
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
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
      <Button
        onClick={loginGoogle}
        variant="contained"
        startIcon={<GoogleIcon />}
        size="large"
      >
        Sign In With Google
      </Button>
    </Box>
  );
};

export default Login;
