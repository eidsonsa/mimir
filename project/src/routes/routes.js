import { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateQuestion from "../pages/CreateQuestion";
import { Toolbar } from "@mui/material";
import { AuthGoogleContext } from "../contexts/authGoogle";

export const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthGoogleContext);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/create-question" element={<CreateQuestion />} />
            </Route>
          )}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
