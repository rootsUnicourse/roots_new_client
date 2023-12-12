import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MKTypography from 'components/MKTypography';
//import MKButton from 'components/MKButton';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            height: '56px',
        },
    },
    button: {
        height: '54px',
        backgroundColor: "#03CF9D !important",
        '&:hover': {
            backgroundColor: "#03CF9D !important",
        },
        '&:focus': {
            backgroundColor: "#03CF9D !important",
        },
        '&:active': {
            backgroundColor: "#03CF9D !important",
        },
        '&.Mui-focusVisible': {
            backgroundColor: "#03CF9D !important",
        },
        '& .MuiTouchRipple-root': {
            color: '#03CF9D !important',
        },
    },
    message: {
        marginTop: theme.spacing(1),
    },
}));

const CopyLinkComponent = () => {
    const classes = useStyles();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const email = user ? user.result.email : null;
    const encodedEmail = window.btoa(email);
    const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`;

    const copyToClipboard = async () => {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Copied!');
            } catch (err) {
                toast.error('Failed to copy!');
            }
        } else {
            toast.warn('Browser does not support Clipboard API');
        }
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} align="center">
                <MKTypography variant="h6" style={{color: "#1C1F4D", fontWeight: "bold"}}>
                    Send to a friend to expand your Rootz!
                </MKTypography>
                <div className={classes.buttonField}>
                    <TextField
                        value={url}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <Button
                        variant="contained" 
                        onClick={copyToClipboard} 
                        className={classes.button}
                    >
                        Copy
                    </Button>
                </div>
            </Grid>
            <ToastContainer/>
        </Grid>
    );
};

export default CopyLinkComponent;
