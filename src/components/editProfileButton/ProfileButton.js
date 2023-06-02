import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    popover: {
        padding: theme.spacing(2),
    },
}));

const ProfileButton = () => {
    const classes = useStyles();

    return (
        <div className={classes.buttonContainer}>
            <Link to='/editProfile'>
                <Button>
                    <ion-icon name="settings-sharp" size="large"></ion-icon>
                </Button>
            </Link>
        </div>
    );
};

export default ProfileButton;
