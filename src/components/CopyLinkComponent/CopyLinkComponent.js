import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';

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
        backgroundColor: "#03CF9D",
        '&:hover': {
            backgroundColor: "#03CF9D",
        },
    },
}));

const CopyLinkComponent = () => {
    const classes = useStyles();
    const [copySuccess, setCopySuccess] = useState('');
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const email = user ? user.result.email : null;
    const encodedEmail = window.btoa(email);
    const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`;

    const copyToClipboard = async () => {
        if (navigator.clipboard) { // checking if clipboard API is supported
            try {
                await navigator.clipboard.writeText(url);
                setCopySuccess('Copied!');
            } catch (err) {
                setCopySuccess('Failed to copy!');
            }
        } else {
            setCopySuccess('Browser does not support Clipboard API');
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
                    <MKButton
                        variant="contained" 
                        onClick={copyToClipboard} 
                        className={classes.button}
                    >
                        Copy
                    </MKButton>
                </div>
                {copySuccess && <div>{copySuccess}</div>}
            </Grid>
        </Grid>
    );
};

export default CopyLinkComponent;
