import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import bgImage from "assets/images/rootz5.png";
import MKBox from 'components/MKBox';
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
    
  },
  form: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: '#03CF9D'
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://roots-server.fly.dev/forgotpassword', { email })
    .then(() => {
      setEmailSent(true); // Set the emailSent state to true when the email is sent
      console.log("yayy");
      })
      .catch(
        setErrorMessage("The provided email is incorrect.")
      );
  };

  const onCaptchaChange = (value) => {
    if (value) { // if we have a value, captcha was successful
      setIsCaptchaVerified(true);
    } else { // if no value, it's either expired or failed
      setIsCaptchaVerified(false);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:5002/forgotpassword', { email })
  //     .then(response => {
  //       console.log("yayy")
  //     })
  //     .catch(error => {
  //       // Handle error
  //     });
  // };


  return (
    <MKBox className={classes.container} sx={{
      backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
        `${linearGradient(
          rgba(gradients.dark.main, 0.6),
          rgba(gradients.dark.state, 0.1)
        )}, url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className={classes.form}>
        <Typography variant="h4" component="h1" className={classes.title}>
          {emailSent ? "An email will be sent to you in the next few minutes" : "Not everybody has a good memory..."}
        </Typography>
        {!emailSent && ( // Conditionally render based on the emailSent state
          <>
            <TextField
              id="email"
              label="Email"
              type="email"
              margin="normal"
              required
              fullWidth
              onChange={e => setEmail(e.target.value)}
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <ReCAPTCHA
              sitekey="6LeGpwgoAAAAAPK8GiZ7AHRFOB5HEeHm49sv-G0r" // Replace with your site key
              onChange={onCaptchaChange}
            />
            <Button variant="contained" disabled={!isCaptchaVerified} style={{ backgroundColor: isCaptchaVerified ? "#1C1F4D" : "#B0B0B0", color: "#FFFFFF"}} fullWidth onClick={handleSubmit}>
              Reset Password
            </Button>
          </>
        )}
        { emailSent && <Link to="/pages/authentication/sign-in">Back to Sign In</Link> }
      </div>
    </MKBox>
  );
};

export default ForgotPasswordForm;
