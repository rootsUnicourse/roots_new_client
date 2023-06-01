// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useState} from 'react';
import Button from "@mui/material/Button";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core'

import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#F1F1F1",
        color: "#3B3A3B",
        borderRadius: "25px",
        padding: "10px 20px",
        textTransform: "none",
        margin: theme.spacing(1),
        "&:hover": {
        color: "#3B3A3B",
        backgroundColor: "#53AD57",
        },
    },
    selectedButton: {
        backgroundColor: "#F1F1F1",
        color: "#3B3A3B",
        "&:hover, &:focus, &:active": {
            color: "#3B3A3B",
            backgroundColor: "#53AD57",
        },
    },
}));


function Companys() {

    const companys = useSelector((state) => state.companys);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [selectedCategory, setSelectedCategory] = useState(null);
    const classes = useStyles();
    
    const mockData = companys.map((company) => ({
        ...company,
        views: Math.floor(Math.random() * 1000),
        profit: Math.floor(Math.random() * 10000),
        lastViewed: new Date().getTime() - Math.floor(Math.random() * 1000000),
    }));

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getSortedCompanies = () => {
        let sortedCompanies = [...mockData];
        if (selectedCategory) {
            switch (selectedCategory) {
                case "mostViewed":
                    sortedCompanies.sort((a, b) => b.views - a.views);
                    break;
                case "mostProfitable":
                    sortedCompanies.sort((a, b) => b.profit - a.profit);
                    break;
                case "lastViewed":
                    sortedCompanies.sort((a, b) => b.lastViewed - a.lastViewed);
                    break;
                default:
                    break;
            }
        }
        return sortedCompanies;
    };
    
    
    return (
        <MKBox component="section">
            <Container>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Button onClick={() => handleCategoryChange("mostViewed")} className={`${classes.button} ${selectedCategory === "mostViewed" ? classes.selectedButton : ""}`}>
                            Most Viewed
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => handleCategoryChange("mostProfitable")} className={`${classes.button} ${selectedCategory === "mostProfitable" ? classes.selectedButton : ""}`}>
                            Most Profitable
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => handleCategoryChange("lastViewed")} className={`${classes.button} ${selectedCategory === "lastViewed" ? classes.selectedButton : ""}`}>
                            Last Viewed
                        </Button>
                    </Grid>
                </Grid>
                {!companys.length ? <CircularProgress/> : 
                            (
                                <Grid container item spacing={3} alignItems="center" >
                                    {getSortedCompanies().map((company) => (
                                        <Grid key={company._id} item xs={4} sm={4} md={4} lg={3}>
                                            <RotatingCard>
                                                    <RotatingCardFront
                                                        image={company.image}
                                                        icon="touch_app"
                                                        title={company.title}
                                                        customColor="#FFFFFF"
                                                        discount = {company.discount}
                                                        color="secondary"
                                                    />
                                                    <RotatingCardBack
                                                        image={company.image}
                                                        title={company.discount}
                                                        description={company.description}
                                                        customColor="#FFFFFF"
                                                        color="secondary"
                                                        action={{
                                                        type: "external",
                                                        route: "/",
                                                        label: user ? "Go To Store" : "Sign in first",
                                                        }}
                                                        url={user ? company.siteUrl : "/pages/authentication/sign-in"}
                                                    />
                                            </RotatingCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
            </Container>
        </MKBox>
    );
}

export default Companys;