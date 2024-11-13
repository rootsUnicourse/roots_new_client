import { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from "assets/images/rootz5.png";
import MKBox from 'components/MKBox';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#03CF9D'
    },
}));

function ResetPasswordForm() {
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        try {
        const response = await axios.post('https://roots-server.fly.dev/forgotpassword/reset-password', {
            password,
            token: window.location.pathname.split('/')[2], // get the token from the query string
        });
        if (response && response.status === 200) {
            setSuccess(true);
            navigate("/pages/authentication/sign-in"); 
        } else {
            setError('Failed to reset password. Please try again.');
        }
        } catch (error) {
        setError(error.response.data);
        }
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
                    <Button variant="contained" style={{ backgroundColor: "#1C1F4D", color: "#FFFFFF"}} type="submit" fullWidth>
                    Reset Password
                    </Button>
                </form>
                </Paper>
            </Grid>
            </Grid>
        </MKBox>
    );
}

export default ResetPasswordForm;
