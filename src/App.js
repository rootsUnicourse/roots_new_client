/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";

import { useDispatch } from 'react-redux';
import { getCompanys, getCompanyBySearch } from './actions/companys'
import { getUsers } from './actions/users'
import Form from "components/Form/Form";
import Profile from "pages/LandingPages/Author/index";
import ForgetMyPassword from "./pages/LandingPages/SignIn/forgetMyPass"
import ResetPassword from './pages/LandingPages/SignIn/resetPass'
import EditProfile from "components/editProfile/EditProfile";
import SignIn from './pages/LandingPages/SignIn/index'

export default function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    dispatch(getCompanys());
    dispatch(getUsers());
  }, [pathname, dispatch]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
        <Route path="/form" exact element={<Form/>}/>
        <Route path="/profile" exact element={<Profile/>}/>
        <Route path="/forgotpassword" exact element={<ForgetMyPassword/>}/>
        <Route path="/resetpassword/:token"  element={<ResetPassword/>}/>
        <Route path="/editProfile" exact element={<EditProfile/>}/>
        <Route path="/pages/authentication/sign-in" element={<SignIn/>} />
      </Routes>
    </ThemeProvider>
  );
}
