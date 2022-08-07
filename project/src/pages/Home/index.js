import React, { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import logo from "../../assets/logo.png";

export const Home = () => {
  const { user, signOut } = useContext(AuthGoogleContext);
  const userLoggedIn = JSON.parse(user);
  const theme = useTheme();

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
      <Button
        onClick={signOut}
        variant="contained"
        startIcon={<GoogleIcon />}
        size="large"
        sx={{ marginTop: 4 }}
      >
        Sign Out
      </Button>
    </Box>
  );
};
