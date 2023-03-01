import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5002/forgotpassword', { email })
      .then(response => {
        console.log("yayy")
      })
      .catch(error => {
        // Handle error
      });
  };


  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <Typography variant="h4" component="h1" className={classes.title}>
          Not everybody has a good memory...
        </Typography>
        <TextField
          id="email"
          label="Email"
          type="email"
          margin="normal"
          required
          fullWidth
          onChange={e => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Reset Password
        </Button>
        <Link to="/">Back to Sign In</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
