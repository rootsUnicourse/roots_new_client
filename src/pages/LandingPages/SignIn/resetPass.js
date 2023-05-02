import { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function ResetPasswordForm() {
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        // try {
        // const response = await axios.post('https://roots-server.onrender.com/forgotpassword/reset-password', {
        //     password,
        //     token: window.location.pathname.split('/')[2], // get the token from the query string
        // });
        // setSuccess(true);
        // } catch (error) {
        // setError(error.response.data);
        // }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (password !== confirmPassword) {
    //     setError('Passwords do not match');
    //     return;
    //     }

    //     try {
    //     const response = await axios.post('http://localhost:5002/forgotpassword/reset-password', {
    //         password,
    //         token: window.location.pathname.split('/')[2], // get the token from the query string
    //     });
    //     setSuccess(true);
    //     } catch (error) {
    //     setError(error.response.data);
    //     }
    // };

    if (success) {
        return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
            <Grid item>
            <Typography variant="h5">Password reset successful.</Typography>
            </Grid>
        </Grid>
        );
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
        <Grid item>
            <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Enter New Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                label="New Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                label="Confirm New Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                Reset Password
                </Button>
            </form>
            </Paper>
        </Grid>
        </Grid>
    );
}

export default ResetPasswordForm;
