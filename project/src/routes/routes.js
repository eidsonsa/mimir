import { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateQuestion from "../pages/CreateQuestion";
import Question from "../pages/Question";
import { AuthGoogleContext } from "../contexts/authGoogle";
import CreateTest from "../pages/CreateTest";
import Test from "../pages/Test";
import TestSubmission from "../pages/TestSubmission";
import EditQuestion from "../pages/Question/EditQuestion";

export const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthGoogleContext);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/create-question" element={<CreateQuestion />} />
              <Route path="/question/:questionId" element={<Question />} />
              <Route
                path="/question/:questionId/edit"
                element={<EditQuestion />}
              />
              <Route path="/create-test" element={<CreateTest />} />
              <Route path="/test/:testId" element={<Test />} />
            </Route>
          ) : (
            <Route path="/">
              <Route path="/" element={<Login />} />
              <Route path="/answer/:testId" element={<TestSubmission />} />
            </Route>
          )}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
