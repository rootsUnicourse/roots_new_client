import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css.css';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useDispatch } from 'react-redux';
import { Box, useTheme, useMediaQuery } from '@material-ui/core';
import { ArrowForwardIos as ArrowIcon } from '@material-ui/icons';
import MKTypography from 'components/MKTypography';
import cart from "../../assets/images/buy-removebg-preview.png"
import friends from '../../assets/images/invite-removebg-preview.png'
import money from '../../assets/images/earn-removebg-preview.png'
import MKButton from 'components/MKButton';
import { makeStyles } from "@material-ui/core/styles";
import test from '../../assets/images/test_auto_x2.jpg'

const useStyles = makeStyles(() => ({
  button: {
    '&:hover': {
      transform: 'scale(1.1)', // Increase the size of the button by 10% on hover
    },
  }
}));


const HowItWorks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const label = user ? "Log Out" : "Sign In";
  const route = user ? "/" : "/pages/authentication/sign-in";
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }

  const HowItWorksBox = ({ imgSrc, text }) => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} m={2} borderRadius={8}>
      <img src={imgSrc} alt="" style={{ width: '100px', height: '100px' }}/>
      <MKTypography variant="body1" style={{ color: "#03D09E" , fontWeight: 'bold' }}>{text}</MKTypography>
    </Box>
  );
  
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
      <Box display="flex" style={{backgroundImage: `url(${test})`, backgroundSize: "cover", backgroundPosition: "top",}} flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" justifyContent="center" p={2}>
          <HowItWorksBox imgSrc={cart} text="Step 1: Buy through our website" />
          <ArrowIcon />
          <HowItWorksBox imgSrc={friends} text="Step 2: Invite friends to buy too" />
          <ArrowIcon />
          <HowItWorksBox imgSrc={money} text="Step 3: Earn money from everyone's purchases" />
        </Box>
        <MKButton className={classes.button} component="a" href="/" style={{width: '30%', backgroundColor: "#03D09E"}}> Lets Go !</MKButton>
      </Box>
    </>
  );
};

export default HowItWorks;
