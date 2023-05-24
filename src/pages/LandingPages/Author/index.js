/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Author page sections
import Profile from "pages/LandingPages/Author/sections/Profile";
import DefaultFooter from "../../../examples/Footers/DefaultFooter/index";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/roots.webp";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import footerRoutes from "footer.routes";
import HoveringButton from '../../../components/hoverInvite/Invite'
import ProfileButton from '../../../components/editProfileButton/ProfileButton';

function Author() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const label = user ? "Log Out" : "Sign In";
  const route = user ? "/" : "/pages/authentication/sign-in";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = user.result.email;
  const encodedEmail = window.btoa(email);
  //https://www.rootz.website/pages/authentication/sign-in
  // const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`
  const url = `http://localhost:3000/pages/authentication/sign-in?email=${encodedEmail}`

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: route,
          label: label,
          color: "info",
        }}
        handleLogout = {logout}
        user = {user}
      />
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.2),
                rgba(gradients.dark.state, 0.2)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
        <ProfileButton/>
          <Profile user={user}/>
          {/* <Posts /> */}
        </Card>
        {/* <Contact /> */}
        <HoveringButton url={url}/>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Author;
