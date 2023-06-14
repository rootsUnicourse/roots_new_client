import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './css.css';
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import routes from "routes";
// import { useDispatch } from 'react-redux';
import { Box, useTheme, useMediaQuery } from '@material-ui/core';
import { ArrowForwardIos as ArrowIcon } from '@material-ui/icons';
import MKTypography from 'components/MKTypography';
import cart from "../../assets/images/buy.png"
import friends from '../../assets/images/invite.png'
import money from '../../assets/images/earn.png'

const HowItWorks = () => {
  // const navigate = useNavigate();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const label = user ? "Log Out" : "Sign In";
  // const route = user ? "/" : "/pages/authentication/sign-in";
  // const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // const logout = () => {
  //   dispatch({ type: 'LOGOUT' })
  //   navigate('/')
  //   setUser(null)
  // }

  const HowItWorksBox = ({ imgSrc, text }) => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} m={2} borderRadius={8}>
      <img src={imgSrc} alt="" style={{ width: '100px', height: '100px' }}/>
      <MKTypography variant="body1" style={{ color: "#1C1F4B"}}>{text}</MKTypography>
    </Box>
  );
  
  return (
    <>
      {/* <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: route,
            label: label,
            color: "info",
          }}
          handleLogout = {logout}
          user = {user}
        /> */}
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{marginLeft: "80px"}}>
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" justifyContent="center" p={2}>
          <HowItWorksBox imgSrc={cart} text="Step 1: Buy through our website" />
          <ArrowIcon />
          <HowItWorksBox imgSrc={friends} text="Step 2: Invite friends to buy too" />
          <ArrowIcon />
          <HowItWorksBox imgSrc={money} text="Step 3: Earn money from everyone's purchases" />
        </Box>
      </Box>
    </>
  );
};

export default HowItWorks;
