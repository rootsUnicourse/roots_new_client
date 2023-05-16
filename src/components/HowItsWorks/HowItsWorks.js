import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Lottie from 'lottie-react';
import flyingMoneyAnimation from '../../assets/lottie/money.json';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";


const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        backgroundColor: '#ABC4AA',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        zIndex: -1,

    },
    lottieBackground: {
        position: 'absolute',
        zIndex: -1,
        overflow: 'hidden',
    },
    title: {
        color: '#a9907e',
    },
    step: {
        color: '#f3deba',
        marginBottom: theme.spacing(1),
    },
}));

const createLottieStyles = (top, left, width, height) => ({
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}px`,
    height: `${height}px`,
});

const generateRandomPositions = (count) => {
    const positions = [];

    for (let i = 0; i < count; i++) {
        const top = Math.random() * 90;
        const left = Math.random() * 90;
        const size = Math.random() * 90;

        positions.push({ top, left, width: size, height: size });
    }

    return positions;
};

const HowItWorks = () => {
    const classes = useStyles();

    const lottiePositions = generateRandomPositions(10);

    return (
        <>
        <DefaultNavbar
            routes={routes}
            dark
            />
        <Box className={classes.container}>
        {lottiePositions.map((pos, index) => (
            <Lottie
            key={index}
            className={classes.lottieBackground}
            style={createLottieStyles(pos.top, pos.left, pos.width, pos.height)}
            animationData={flyingMoneyAnimation}
            loop
            play
            />
            ))}
        <Typography variant="h1" className={classes.title}>
            How It Works?
        </Typography>
        <Typography variant="h5" className={classes.step}>
            1. Order through the website and get money back.
        </Typography>
        <Typography variant="h5" className={classes.step}>
            2. Invite friends, and get money back for their purchases as well.
        </Typography>
        <Typography variant="h5" className={classes.step}>
            3. They invite friends, you get money back for their purchases and their friends' purchases and their friends' friends purchases.
        </Typography>
        <Typography variant="h5" className={classes.step}>
            4. In short, grow roots that like to shop, it pays off.
        </Typography>
        </Box>
        </>
    );
};

export default HowItWorks;
