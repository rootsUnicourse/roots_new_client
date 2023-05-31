import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import { getInviteLimit, updateInviteLimit } from '../../api/index'; // Import the API calls
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "10px", 
        backgroundColor: "#F8F9FA",
        borderRadius: "10px", 
        padding: "10px",  
        transform: "translateY(-50%)",
        '@media (max-width:600px)': {
            position: "static",
            transform: "none",
        }
    }
});

function InviteButton({ user }) {
    console.log(user);
    const classes = useStyles();
    const [counter, setCounter] = useState(0); // Initialize with 0
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [showNoInvitationsAlert, setShowNoInvitationsAlert] = useState(false);

    // Fetch the initial counter value from the server
    useEffect(() => {
        getInviteLimit(user.result.email)
            .then(({ data: { inviteLimit } }) => setCounter(inviteLimit))
            .catch(err => console.error(err));
    }, [user]);

    const handleClick = () => {
        if (counter === 0) {
            setShowNoInvitationsAlert(true);
            return;
        }

        const email = user ? user.result.email : null;
        const encodedEmail = window.btoa(email);
        const url = `https://www.rootz.website/pages/authentication/sign-in?email=${encodedEmail}`;

        navigator.clipboard.writeText(url)
            .then(() => {
                setShowCopyAlert(true);

                // Update the invite limit on the server
                updateInviteLimit(user.result.email, counter - 1)
                    .then(({ data: { inviteLimit } }) => setCounter(inviteLimit))
                    .catch(err => console.error(err));
            })
            .catch(() => {
                console.error('Failed to copy invitation link.');
            });
    };

    useEffect(() => {
        if (showCopyAlert) {
            const timer = setTimeout(() => {
                setShowCopyAlert(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [showCopyAlert]);

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="div">Expand your roots</Typography>
            <Typography variant="body1" component="p">Remaining invitations: {counter}</Typography>
            <Button variant="contained" color="primary" onClick={handleClick}>Invite</Button>
            {showCopyAlert && <Alert severity="success">Copied to clipboard!</Alert>}
            {showNoInvitationsAlert && <Alert severity="warning">Sorry, you are out of invitations. Please retry next month.</Alert>}
        </div>
    );
}

export default InviteButton;
