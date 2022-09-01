import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const InstructionsPage = (instructionsPage) => {
  return (
    <Box marginTop={8} maxWidth="80%" textAlign="center">
      <Typography variant="h5">{instructionsPage.instructionsPage}</Typography>
    </Box>
  );
};

export default InstructionsPage;
