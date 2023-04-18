import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

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
    backgroundColor: '#ABC4AA',
    margin: theme.spacing(1),
    width: 170,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    textAlign: 'center',
    color: '#675D50',
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

const UserCoin = ({ avatarSrc,avaterName, moneyEarned,kind }) => {
  const classes = useStyles();
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
      <MKAvatar alt="Profile Picture" src={avatarSrc} className={`${classKind} ${classes.avatar}`} />
      <Typography style={kind == 'grand' ? { fontSize: '15px' } : null} className={classes.moneyEarned} variant="h6">
        {avaterName}
      </Typography>
      
      {kind == 'dad' ? (
        <Grid container className={classes.cardGrid}>
          <Grid item>
            {moneyEarned ? 
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.responsiveTypography}>
                    Money Waiting: {moneyEarned}
                  </Typography>
                </CardContent>
              </Card> 
            : null}
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Money Waiting: {moneyEarned}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Money Approved: {moneyEarned}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.responsiveTypography}>
                  Cash Withdrawn: {moneyEarned}
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
