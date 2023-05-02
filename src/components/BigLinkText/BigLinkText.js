import {React, useState} from 'react';
import {Typography, TextField, Box, Grid,} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import MKButton from 'components/MKButton';

const useStyles = makeStyles(() => ({
    bigLink: {
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#675D50',
        textDecoration: 'none',
    },
    filed: {
        backgroundColor: '#F3DEBA',
        borderRadius: '4px',
    },
    button: {
        color: '#675D50',
        backgroundColor: '#ABC4AA',
        '&:hover': {
            backgroundColor: '#ABC4AA',
        },
        '&:focus': {
            backgroundColor: '#ABC4AA',
            boxShadow: 'none', 
        },
        '&:active': {
            backgroundColor: '#ABC4AA',
        },
        '&:visited': {
            backgroundColor: '#ABC4AA',
        },
    }
}));


const BigLink = () => {

    const classes = useStyles();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const email = user.result.email;
    const encodedEmail = window.btoa(email);
    const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`;
    const [link] = useState(url);

    const handleCopy = () => {
            navigator.clipboard.writeText(link).then(
            () => {
                console.log('Link copied to clipboard!');
            },
            (err) => {
                console.error('Failed to copy link: ', err);
            }
            );
    };


    return (
        <>
            <Box>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Typography className={classes.bigLink}>
                            Grow your Roots!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Link"
                            value={link}
                            InputProps={{
                                readOnly: true,
                            }}
                            className={classes.filed}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MKButton
                            className={classes.button}
                            variant="contained"
                            startIcon={<FileCopyOutlinedIcon />}
                            onClick={handleCopy}
                        >
                            Copy Link And Sent To a Friend
                        </MKButton>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default BigLink;
