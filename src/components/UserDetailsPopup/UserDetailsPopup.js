import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: theme.spacing(2),
    },
    title: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'center',
    },
        infoText: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
}));

const UserDetailsPopup = ({ email,open, handleClose, avatarSrc, avaterName, moneyEarned, lastActivity, createdAt }) => {

    const classes = useStyles();
    
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.title}>{avaterName}</DialogTitle>
        <DialogContent className={classes.content}>
            <img src={avatarSrc} className={classes.avatar} alt="Profile Picture" width={100} height={100}/>
            <Typography variant="subtitle1" className={classes.infoText}>
            Email: {email}
            </Typography>
            <Typography variant="subtitle1" className={classes.infoText}>
            Money earned from this user: {moneyEarned}$
            </Typography>
            <Typography variant="subtitle1" className={classes.infoText}>
            Last activity: {lastActivity}
            </Typography>
            <Typography variant="subtitle1" className={classes.infoText}>
            Registered from: {createdAt}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Close
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default UserDetailsPopup;
