import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ReactComponent as EditProfile } from '../../assets/svg/settings-sharp.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        
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
                <Button className={classes.button} >
                    <EditProfile/>
                </Button>
            </Link>
        </div>
    );
};

export default ProfileButton;
