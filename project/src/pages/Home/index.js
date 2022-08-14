import React, { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import useQuestions from "../../hooks/useQuestions";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Home = () => {
  const { user } = useContext(AuthGoogleContext);
  const userLoggedIn = JSON.parse(user);
  const theme = useTheme();

  const { questions } = useQuestions();
  const navigate = useNavigate();

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
        marginX: 2,
      }}
    >
      <Typography color={theme.palette.primary.main} variant="h4">
        Welcome, {userLoggedIn.displayName}!
      </Typography>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{question.data.title}</Typography>
                      <IconButton
                        onClick={() => navigate(`/question/${question.id}`)}
                      >
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <Typography>Tests</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
