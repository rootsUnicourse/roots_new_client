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
import React, { useEffect, useState } from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";


// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
// import Information from "pages/Presentation/sections/Information";
// import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
// import Pages from "pages/Presentation/sections/Pages";
// import Testimonials from "pages/Presentation/sections/Testimonials";
// import Download from "pages/Presentation/sections/Download";

// Presentation page components
// import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/rootz.png";
import bgImage2 from "assets/images/rootz.png";

import SearchBar from "components/SearchBar/SearchBar";
// import CompCards from "components/CompCards/CompCards";
import Companys from '../../components/Companys/Companys'

import { useDispatch } from 'react-redux';
import { getCompanyBySearch, getCompanys } from '../../actions/companys'
import { useNavigate } from 'react-router-dom'
// import Video from 'components/Video/Video';
// import companys from 'reducers/companys';
import HoveringButton from '../../components/hoverInvite/Invite'
import HowItWorks from 'components/HowItsWorks/HowItsWorks';

function Presentation() {

  const [search,setSearch] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user)
  const label = user ? "Log Out" : "Sign In"
  const route = user ? "/" : "/pages/authentication/sign-in"
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = user ? user.result.email : null;
  const encodedEmail = window.btoa(email);
  const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`
  // const url = `http://localhost:3000/pages/authentication/sign-in?email=${encodedEmail}`
  // useEffect(()=>{
  //   dispatch(getCompanys())
  // },[search==''])

  useEffect(()=>{
    if(search == ''){
      dispatch(getCompanys())
    }
    dispatch(getCompanyBySearch({ search }))
  },[search])

  // const searchCompany = () => {
  //   if(search.trim())
  //   {
  //       dispatch(getCompanyBySearch({ search }))
  //   }
  // }

  // const handleKeyPress = (e) => {
  //   if(e.keyCode == 13 || e.which == 13) {
  //       searchCompany()
  //   }
  // }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

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
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              style={{color:"#1D203F"}}
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Rootz{" "}
            </MKTypography>
            <MKTypography
              variant="h4"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={0}
              fontWeight="bold"
            >
              Buy the same products and get your money BACK !
            </MKTypography>
            <MKTypography
              variant="h4"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={0}
              fontWeight="bold"
            >
              Sign in to eran money from yours and your friends shopping!
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <MKBox>
          {user? <HoveringButton url={url}/> : null}
      </MKBox>
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
        <Counters/>
        <HowItWorks/>
        <SearchBar change = {handleChange}/>
        <Companys/>
        <hr style={{ marginTop: "100px" }}/>
        <MKBox mt={2}>
          <DefaultFooter content={footerRoutes} />
        </MKBox>
      </Card>
    <MKBox
      width="100%"
      sx={{
        position: 'relative',
        minHeight: '50vh', // desktop minHeight
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // adjust transparency as needed
        placeItems: "center",
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundImage: `url(${bgImage2})`, // desktop image
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          zIndex: -1, // ensure the image is behind your content
        },
        '@media (max-width: 600px)': {
          minHeight: '30vh', // mobile minHeight
          '&::before': {
            backgroundImage: 'none', // no image for mobile
          }
        }
      }}
    >
      {/* Your content here */}
    </MKBox>
    </>
  );
}

export default Presentation;
