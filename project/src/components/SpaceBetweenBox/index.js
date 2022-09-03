import { Box } from "@mui/system";

const SpaceBetweenBox = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      {children}
    </Box>
  );
};

export default SpaceBetweenBox;
