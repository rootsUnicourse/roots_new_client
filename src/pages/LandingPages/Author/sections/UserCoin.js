import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';

const useStyles = makeStyles({
  avatar: {
    width: 100,
    height: 100,
    margin: '0 auto'
  },
  moneyEarned: {
    textAlign: 'center',
    marginTop: 10
  }
});

const UserCoin = ({ avatarSrc,avaterName, moneyEarned }) => {
  const classes = useStyles();

  return (
    <MKBox>
      <MKAvatar alt="Profile Picture" src={avatarSrc} className={classes.avatar}/>
      <Typography className={classes.moneyEarned} variant="h6">
        {avaterName}
      </Typography>
      <Typography className={classes.moneyEarned} variant="h6">
        Money Earned: {moneyEarned}
      </Typography>
    </MKBox>
  );
};

export default UserCoin;
