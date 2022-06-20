
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
import RotatingCardComp from "../compCard/index";
import Card from "@mui/material/Card";

import CompCard from '../compCard/CompCard'

function CompanysMobile() {

    const companys = useSelector((state) => state.companys)

    return (
        <MKBox component="section">
        <Container>
            {!companys.length ? <CircularProgress/> : 
                        (
                            <Grid container item spacing={3} alignItems="center" sx={{ display: { xs: 'block', sm: 'none' } }}>
                                {companys.map((company) => (
                                    <Grid key={company._id} item xs={12} sm={6} lg={4} >
                                        <RotatingCardComp>
                                            <CompCard image={company.image} title={company.title} icon="touch_app" description={company.discount} action={{ type: "internal", route: "/sections/page-sections/page-headers", label: "Go To Store" }}/>
                                        </RotatingCardComp>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
        </Container>
        </MKBox>
    );
}

export default CompanysMobile;