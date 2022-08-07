import { AuthGoogleProvider } from "./contexts/authGoogle";
import { AppRoutes } from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./services/theme";
import { CssBaseline } from "@mui/material";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthGoogleProvider>
        <AppRoutes />
      </AuthGoogleProvider>
    </ThemeProvider>
  );
};
