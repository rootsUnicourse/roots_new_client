// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useState} from 'react';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core'

import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

function Companys() {

    const companys = useSelector((state) => state.companys)
    const [user] = useState(JSON.parse(localStorage.getItem('profile')))

    return (
        <MKBox component="section">
            <Container>
                {!companys.length ? <CircularProgress/> : 
                            (
                                <Grid container item spacing={3} alignItems="center" >
                                    {companys.map((company) => (
                                        <Grid key={company._id} item xs={4} sm={4} md={4} lg={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <RotatingCard>
                                                <RotatingCardFront
                                                    image={company.image}
                                                    icon="touch_app"
                                                    title={company.title}
                                                />
                                                <RotatingCardBack
                                                    image={company.image}
                                                    title={company.discount}
                                                    description={company.description}
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