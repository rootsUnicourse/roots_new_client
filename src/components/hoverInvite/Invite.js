import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Popover from '@material-ui/core/Popover';
import Tree from '../../assets/images/tree.png'
import {ReactComponent as TreeSvg} from '../../assets/svg/tree.svg'
import { isMobile } from 'react-device-detect';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// import rootz from '../../assets/images/logo2-removebg.png'

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'fixed',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1,
    color: 'white',
    borderRadius: '50%',
    width: theme.spacing(8),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#04CA9A',
    },
  },
  popover: {
    padding: theme.spacing(2),
  },
  icon: {
    display: 'inline-block',
  },
  ionIcon: {
    transition: 'transform 0.3s ease-in-out',
  },
}));

const HoveringButton = ({ url }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    handleClose();
  };

  const handleWhatsAppLink = () => {
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
    handleClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsCopied(false);
  };

  return (
    <>
      <Button 
        className={classes.button} 
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isMobile ? (
          <>
            <img src={Tree} alt="Tree" />
            <ion-icon 
              name="add-circle-sharp" 
              className={classes.ionIcon} 
              style={{ color: 'black', transform: isHovered ? 'scale(2.2)' : 'scale(2)' }}
            ></ion-icon>
          </>
        ) : (
          <>
            <TreeSvg alt="Tree" />
            {/* <img src={rootz}  style={{ width: '70px', height: '70px' }}/> */}
            <ion-icon 
              name="add-sharp" 
              className={classes.ionIcon} 
              style={{ color: 'black', transform: isHovered ? 'scale(2)' : 'scale(2)' }}
            ></ion-icon>
          </>
        )}
      </Button>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.popover}>
          <MenuItem onClick={handleCopyLink}>
          <svg style={{ marginRight: '3px' }} width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ae6f50" d="M18.8 2.14A4.34 4.34 0 0 0 16 1a4.34 4.34 0 0 0-2.8 1.14A1.91 1.91 0 0 0 13 3v26a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a1.91 1.91 0 0 0-.2-.86Z"/><path fill="#c27c59" d="M18.8 2.14a4.79 4.79 0 0 0-2-1 5.79 5.79 0 0 1 .58.43 1.88 1.88 0 0 1 .2.86v26a2 2 0 0 1-2 2h-2A2 2 0 0 0 15 31h2a2 2 0 0 0 2-2V3a1.91 1.91 0 0 0-.2-.86Z"/><path fill="#54b88b" d="M24.29 14.91C24 11.32 22 4.75 18.8 2.14A4.34 4.34 0 0 0 16 1a4.34 4.34 0 0 0-2.8 1.14C10 4.75 8 11.32 7.71 14.91a6 6 0 0 0-2.71 5 4 4 0 0 0 4 4h14a4 4 0 0 0 4-4 6 6 0 0 0-2.71-5Z"/><path fill="#67dba1" d="M16 23.92zm8.29-9.01C24 11.32 22 4.75 18.8 2.14A4.34 4.34 0 0 0 16 1a3.83 3.83 0 0 0-1.71.43 5.65 5.65 0 0 1 1.09.71c3.19 2.61 5.25 9.18 5.5 12.77a6 6 0 0 1 2.7 5 4 4 0 0 1-4 4H23a4 4 0 0 0 4-4 6 6 0 0 0-2.71-5z"/></svg>
            <span>Copy link and send it to your friends!</span>
          </MenuItem>
          <MenuItem onClick={handleWhatsAppLink}>
            <WhatsAppIcon style={{ marginRight: '5px' }}/>
            <span>Grow on WhatsApp</span>
          </MenuItem>
        </div>
      </Popover>
      <Snackbar 
        open={isCopied} 
        autoHideDuration={1000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default HoveringButton;
