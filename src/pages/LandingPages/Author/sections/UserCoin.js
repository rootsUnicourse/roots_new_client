import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import UserDetailsPopup from 'components/UserDetailsPopup/UserDetailsPopup';

const useStyles = makeStyles((theme) => ({
  dad: {
    width: 100,
    height: 100,
    margin: '0 auto'
  },
  chil: {
    width: 75,
    height: 75,
    margin: '0 auto'
  },
  grand: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    
  },
  moneyEarned: {
    textAlign: 'center',
    marginTop: 10
  },
  avatar: {
    border: '0px solid transparent',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
    }
  },
  card: {
    backgroundColor: '#F1F1F1',
    margin: theme.spacing(1),
    width: 170,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    textAlign: 'center',
    color: '#334767',
  },
  cardGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responsiveTypography: {
    fontSize: '0.8rem',
    lineHeight: 1.2,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
}));

const UserCoin = ({ avatarSrc,avaterName, moneyEarned,kind,moneyWaiting,moneyApproved,cashWithdrawn,createdAt,lastActivity }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var classKind;
  if(kind == 'dad'){
    classKind = classes.dad;
  }
  else if (kind == 'chil'){
    classKind = classes.chil;
  }
  else{
    classKind = classes.grand;
  }
  return (
    <MKBox mb={10}>
      <div>
        <MKAvatar onClick={handleClickOpen} alt="Profile Picture" src={avatarSrc} className={`${classKind} ${classes.avatar}`} />
      </div>
      {kind !== 'dad' ? (
      <UserDetailsPopup
        open={open}
        handleClose={handleClose}
        avatarSrc={avatarSrc}
        avaterName={avaterName}
        moneyEarned={moneyEarned}
        lastActivity={lastActivity} // Replace with actual data
        createdAt={createdAt} // Replace with actual data
      />) : null}
      <Typography style={kind == 'grand' ? { fontSize: '15px' } : null} className={classes.moneyEarned} variant="h6">
        {avaterName}
      </Typography>
      
      {kind == 'dad' ? (
        <Grid container className={classes.cardGrid}>
          <Grid item>
            {moneyEarned >= 0? 
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.responsiveTypography}>
                    Money Earned: <br /> <br />  <span style={{ color: 'green' }}>{moneyEarned}</span>
                  </Typography>
                </CardContent>
              </Card> 
            : null}
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Money Waiting: <br /> <br />  <span style={{ color: 'green' }}>{moneyWaiting}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Money Approved: <br /> <br />  <span style={{ color: 'green' }}>{moneyApproved}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Cash Withdrawn: <br /> <br />  <span style={{ color: 'green' }}>{cashWithdrawn}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </MKBox>
  );
};

export default UserCoin;
