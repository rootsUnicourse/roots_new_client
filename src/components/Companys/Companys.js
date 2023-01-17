// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

// @mui icons
import SearchIcon from "@mui/icons-material/Search";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import { useSelector } from 'react-redux';
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
import {CircularProgress} from '@material-ui/core'

import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

function Companys() {

    const companys = useSelector((state) => state.companys)

    return (
        <MKBox component="section">
            <Container>
                {!companys.length ? <CircularProgress/> : 
                            (
                                <Grid container item spacing={3} alignItems="center" >
                                    {companys.map((company) => (
                                        <Grid key={company._id} item xs={12} md={6} lg={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                                                    label: "Go To Store",
                                                    }}
                                                    url={company.siteUrl}
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