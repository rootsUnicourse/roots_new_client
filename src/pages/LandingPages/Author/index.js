
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
import bgImage from "assets/images/rootz.png";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import footerRoutes from "footer.routes";
import HoveringButton from '../../../components/hoverInvite/Invite'
// import ProfileButton from '../../../components/editProfileButton/ProfileButton';

function Author() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const label = user ? "Log Out" : "Sign In";
  const route = user ? "/" : "/pages/authentication/sign-in";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = user.result.email;
  const encodedEmail = window.btoa(email);
  const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`
  // const url = `http://localhost:3000/pages/authentication/sign-in?email=${encodedEmail}`

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }

  return (

      <MKBox bgColor="white">
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
        <MKBox
          minHeight="75vh"
          width="100%"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: -10,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          {/* <ProfileButton/> */}
          <Profile user={user}/>
          <DefaultFooter content={footerRoutes}/>
        </Card>
          <HoveringButton url={url}/>
          <MKBox
          minHeight="50vh"
          width="100%"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            '@media (max-width: 600px)': {
              minHeight: '30vh', // mobile minHeight
              backgroundImage: 'none', 
            }
          }}
          
        />
      </MKBox>
  );
}

export default Author;
