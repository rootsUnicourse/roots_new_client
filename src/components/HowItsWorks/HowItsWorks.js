import React, { useState } from 'react';
import {Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import './css.css';
import Arrow from '../../assets/svg/forward.svg'
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useDispatch } from 'react-redux';
import MKTypography from 'components/MKTypography';

const useStyles = makeStyles((theme) => ({
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  arrow: {
    margin: theme.spacing(2),
    width: '40px', 
    height: '40px', 
  },
  largerText: {
    fontSize: '1.5rem',
    color: '#16321E',
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  button: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(1, 3),
    fontSize: '1.2rem',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '40px',
    '&:hover': {
      backgroundColor: 'green',
    },
  },
  text: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    color: '#16321E',
  }
}));

const HowItWorks = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const label = user ? "Log Out" : "Sign In";
  const route = user ? "/" : "/pages/authentication/sign-in";
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }


  const steps = [
    'Order through the website <br /> and get money back',
    'Invite friends, <br /> and get money back for their purchases as well',
    'They invite friends, <br /> you get money back for their purchases <br /> and their friends\' purchases <br /> and their friends\' friends purchases!',
  ];

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
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center"
        style={{ minHeight: '100vh' , backgroundColor: '#F2F0E6' }} // assuming you want to fill the full viewport
      >
        <Grid item >
          <MKTypography className={classes.text} style={{ marginTop: '100px' }} variant="h3" align="center" gutterBottom >It's Easy as 1,2,3</MKTypography>
        </Grid>
        <Grid item>
          <MKTypography style={{ marginBottom: '100px' }} className={classes.text} variant="h5" align="center" gutterBottom >Roots can help you make money easily. Here's how:</MKTypography>
        </Grid>
        <Grid item container direction="row" justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className={classes.stepContainer} >
              <MKTypography  variant="body1" align="center" className={classes.largerText} dangerouslySetInnerHTML={{ __html: step }} />
              {index < steps.length - 1 && <img src={Arrow} alt="arrow" className={classes.arrow} />}
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => navigate('/')}>Let's get started!</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
