import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
// import UserCoin from 'pages/LandingPages/Author/sections/UserCoin';
import GrandCoin from 'pages/LandingPages/Author/sections/GrandCoin';
import theme from 'assets/theme';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '2px solid black',
    // marginLeft: '-47px',
  },
  avatar: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    border: '1px solid transparent',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
        }
  },
}));

function CircleAvatars({ users, parantEmail }) {
  const classes = useStyles();
  console.log(users);
  const childCount = users.filter((user) => user.parantId === parantEmail).length;

  const childElements = users
    .filter((user) => user.parantId === parantEmail)
    .map((user, index) => {
      const angle = (2 * Math.PI * index) / childCount;
      
      
      const radius = 30;

      const top = 50 - radius * Math.sin(angle);
      const left = 50 + radius * Math.cos(angle);

      return (
        <GrandCoin
          key={index}
          className={classes.avatar}
          avatarSrc={user.imageUrl}
          avatarName={user.name}
          style={{
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    });

    return (
      childCount !== 0 ? (
        <div className={classes.root}>
          {childElements}
        </div>
      ) : null
    );
    
}

export default CircleAvatars;
