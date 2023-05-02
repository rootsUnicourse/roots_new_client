import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ReactComponent as EditProfile } from '../../assets/svg/profile.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        
        position: 'fixed',
        right: theme.spacing(2),
        top: theme.spacing(2),
        zIndex: 1,
        backgroundColor: '#ABC4AA',
        color: 'white',
        borderRadius: '50%',
        width: theme.spacing(10),
        height: theme.spacing(10),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: '#ABC4AA',
        },
},
    popover: {
    padding: theme.spacing(2),
},
}));

const ProfileButton = () => {
    const classes = useStyles();


    return (
        <>
        <Link to='/editProfile'>
            <Button className={classes.button} >
                <EditProfile/>
            </Button>
        </Link>
        </>
    );
};

export default ProfileButton;
