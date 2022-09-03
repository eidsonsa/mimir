import React, { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Typography, useTheme } from "@mui/material";
import useQuestions from "../../hooks/useQuestions";
import HomeTable from "../../components/HomeTable";
import useTests from "../../hooks/useTests";
import PageContainer from "../../components/PageContainer";
import SpaceBetweenBox from "../../components/SpaceBetweenBox";

const Home = () => {
  const { user } = useContext(AuthGoogleContext);
  const userLoggedIn = JSON.parse(user);
  const theme = useTheme();

  const { questions } = useQuestions();
  const { tests } = useTests();

  if (!questions || !tests) {
    return <Typography>Loading</Typography>;
  }

  return (
    <PageContainer>
      <Typography color={theme.palette.primary.main} variant="h4">
        Welcome, {userLoggedIn.displayName}!
      </Typography>
      <SpaceBetweenBox>
        <HomeTable
          rows={questions}
          link="/question"
          title="Questions"
          buttonLink="/create-question"
        />
        <HomeTable
          rows={tests}
          link="/test"
          title="Tests"
          buttonLink="/create-test"
        />
      </SpaceBetweenBox>
    </PageContainer>
  );
};

export default Home;
