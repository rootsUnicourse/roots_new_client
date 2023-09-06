import { Typography, Card, CardContent, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cart from "../../assets/images/buy-removebg-preview.png"
import friends from '../../assets/images/invite-removebg-preview.png'
import money from '../../assets/images/earn-removebg-preview.png'
import MKButton from 'components/MKButton';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#03CF9D',
        minHeight: '100vh',
    },
    header: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(10),
        fontSize: 50
    },
    card: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // This gives the floating effect
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(2),
        },
    },
    icon: {
        
    },
    button: {
        '&:hover': {
          transform: 'scale(1.1)', // Increase the size of the button by 10% on hover
        },
    },
    gridContainer: {
        padding: theme.spacing(0, 2), // Add horizontal padding
        margin: 0, // Ensure there's no margin
        width: '100%', // Ensure it takes the full width
    },
    }));

const HowItWorksNew = () => {
const classes = useStyles();

    const steps = [
        {
        icon: <img src={cart} alt="Step 1" className={classes.icon} width={100} height={100}/>,
        title: 'Step 1',
        description: 'Buy through our website',
        },
        {
        icon: <img src={friends} alt="Step 2" className={classes.icon} width={100} height={100}/>,
        title: 'Step 2',
        description: 'Invite friends to buy too',
        },
        {
        icon: <img src={money} alt="Step 3" className={classes.icon} width={100} height={100}/>,
        title: 'Step 3',
        description: "Earn money from everyone's purchases",
        },
    ];

    return (
        <div className={classes.root}>
            <Box py={4}>
            <Typography variant="h4" className={classes.header}>
                How Does it Work
            </Typography>
            <Grid container spacing={4} justify="center" className={classes.gridContainer}>
                {steps.map((step, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className={classes.card}>
                    <div className={classes.icon}>{step.icon}</div>
                    <CardContent>
                        <Typography variant="h4" align="center">{step.title}</Typography>
                        <Typography>{step.description}</Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
                <MKButton className={classes.button} component="a" href="/" style={{ fontSize: '20px'}}> Get Started! </MKButton>
            </Grid>
            </Box>
        </div>
    );
    };

export default HowItWorksNew;