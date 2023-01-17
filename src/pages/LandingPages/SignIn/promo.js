import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        textAlign: 'center',
        borderRadius: '20px',
        position: 'relative',
        marginTop: '20px',
        '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 'inherit',
        zIndex: -1
        },
    '&:hover': {
        transform: 'scale(1.05)'
    }
},
}));

export default function SignupPromo() {
    const classes = useStyles();

    return (
        <Box  boxShadow={3}>
        <div className={classes.root}>
        <Typography variant="h5">
            Sign in to earn money from yours and your friends shopping!
        </Typography>
        </div>
        </Box>
    );
}
