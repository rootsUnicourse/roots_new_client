import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';



const useStyles = makeStyles((theme) => ({
    avatar: {
        border: '1px solid transparent',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
        }
    }
}));

const GrandCoin = ({ className,avatarSrc,style}) => {
    const classes = useStyles();
    
    return (
        <MKBox>
            <MKAvatar alt="Profile Picture" src={avatarSrc} className={className} style={style}/>
        </MKBox>
    );
};

export default GrandCoin;
