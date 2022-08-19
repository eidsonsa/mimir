import { Box } from "@mui/system";

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        marginX: 2,
        marginY: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
