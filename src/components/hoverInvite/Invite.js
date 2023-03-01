import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'fixed',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1,
    backgroundColor: '#F8C6DD',
    color: 'white',
    borderRadius: '50%',
    width: theme.spacing(8),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#F5B5D5',
      
    },
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

const HoveringButton = ({ url }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    handleClose();
  };

  const handleWhatsAppLink = () => {
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
    handleClose();
  };

  return (
    <>
      <Button
        className={classes.button}
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 64"><ellipse cx="15.5" cy="55" opacity=".3" rx="7.5" ry="4"/><path fill="#825012" d="M14 28v27c0 .6.7 1 1.5 1s1.5-.4 1.5-1V28h-3z"/><circle cx="8.5" cy="23.5" r="6.5" fill="#539B00"/><circle cx="13" cy="15" r="9" fill="#539B00"/><path fill="#825012" d="M16 43.4c2.6 0 3-.9 3-3.4v-8h1v10c0 1.7-1.3 3-3 3h-1v-1.6zM16 42.8c-1.7 0-3-.4-3-2.1V31h-1v10c0 1.7 1.3 3 3 3h1v-1.2zM14 21.8c-1.7 0-3-.4-3-2.1V17h-1v3c0 1.7 1.3 3 3 3h1v-1.2z"/><circle cx="20.5" cy="30.5" r="7.5" fill="#539B00"/><circle cx="25" cy="27" r="6" fill="#539B00"/><path fill="#825012" d="M20 29.8c1.7 0 3-.4 3-2.1V25h1v3c0 1.7-1.3 3-3 3h-1v-1.2zM13 14.4h1V24h-1z"/><circle cx="22" cy="17" r="8" fill="#539B00"/><circle cx="17" cy="8" r="8" fill="#539B00"/><path fill="#FFF" d="M17.5 16c2.2 0 4.1 1.3 4.9 3.1.3-.1.7-.1 1.1-.1 1.8 0 3.4.9 4.4 2.2-.4-1.8-2-3.2-3.9-3.2h-.1c-.5-2.3-2.5-4-4.9-4-2 0-3.7 1.2-4.5 2.9.8-.6 1.9-.9 3-.9z" opacity=".2"/><circle cx="8" cy="15.4" r="3.6" fill="#539B00"/><path fill="#FFF" d="M8 15.5c0-2.5 1.7-4.6 4-5.3.2-2.9 2.6-5.2 5.5-5.2 1.7 0 3.3.8 4.3 2.1C21.2 4.7 19 3 16.5 3c-2.9 0-5.3 2.2-5.5 5.1-2.3.5-4 2.5-4 4.9 0 1.1.4 2.2 1 3v-.5z" opacity=".2"/><circle cx="13.3" cy="30.8" r="9.3" fill="#539B00"/><circle cx="25.3" cy="24.8" r="3.3" fill="#539B00"/><path d="M31 27c0-.4 0-.8-.1-1.2-.6 3.8-3.9 6.7-7.9 6.7h-.4c.7.3 1.6.5 2.4.5.7 0 1.3-.1 1.9-.3-1.4 1.4-3.3 2.3-5.4 2.3-1 0-2-.2-2.9-.6C17 36 14.7 37 12.3 37c-3.5 0-6.6-2-8.1-4.8.7 4.4 4.5 7.8 9.1 7.8 2.2 0 4.3-.8 5.9-2.1.4.1.8.1 1.3.1 3.5 0 6.5-2.4 7.3-5.7 1.9-1 3.2-3 3.2-5.3z" opacity=".3"/><path fill="#FFF" d="M10.5 26c.8 0 1.5.1 2.2.4.9-1.4 2.5-2.4 4.3-2.4 1 0 1.9.3 2.7.8-.7-1.7-2.3-2.8-4.2-2.8-1.6 0-3 .8-3.8 2H11c-2.9 0-5.4 2.1-5.9 4.9 1.2-1.8 3.2-2.9 5.4-2.9z" opacity=".2"/><path d="M6 26.5c-1.9-.8-3.4-2.4-3.9-4.5 0 .5-.1 1-.1 1.5 0 2.4 1.3 4.4 3.2 5.6.1-.9.4-1.8.8-2.6z" opacity=".3"/></svg>
      </Button>
      {/* <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopyLink}>
        <svg style={{ marginRight: '3px' }} width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ae6f50" d="M18.8 2.14A4.34 4.34 0 0 0 16 1a4.34 4.34 0 0 0-2.8 1.14A1.91 1.91 0 0 0 13 3v26a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a1.91 1.91 0 0 0-.2-.86Z"/><path fill="#c27c59" d="M18.8 2.14a4.79 4.79 0 0 0-2-1 5.79 5.79 0 0 1 .58.43 1.88 1.88 0 0 1 .2.86v26a2 2 0 0 1-2 2h-2A2 2 0 0 0 15 31h2a2 2 0 0 0 2-2V3a1.91 1.91 0 0 0-.2-.86Z"/><path fill="#54b88b" d="M24.29 14.91C24 11.32 22 4.75 18.8 2.14A4.34 4.34 0 0 0 16 1a4.34 4.34 0 0 0-2.8 1.14C10 4.75 8 11.32 7.71 14.91a6 6 0 0 0-2.71 5 4 4 0 0 0 4 4h14a4 4 0 0 0 4-4 6 6 0 0 0-2.71-5Z"/><path fill="#67dba1" d="M16 23.92zm8.29-9.01C24 11.32 22 4.75 18.8 2.14A4.34 4.34 0 0 0 16 1a3.83 3.83 0 0 0-1.71.43 5.65 5.65 0 0 1 1.09.71c3.19 2.61 5.25 9.18 5.5 12.77a6 6 0 0 1 2.7 5 4 4 0 0 1-4 4H23a4 4 0 0 0 4-4 6 6 0 0 0-2.71-5z"/></svg>
          <span>copy link and send it to your friends!</span>
        </MenuItem>
        <MenuItem onClick={handleWhatsAppLink}>
          <WhatsAppIcon style={{ marginRight: '5px' }}/>
          <span>Grow on WhatsApp</span>
        </MenuItem>
      </Menu> */}
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
    </>
  );
};

export default HoveringButton;
