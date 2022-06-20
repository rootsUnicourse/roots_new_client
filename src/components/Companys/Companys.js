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
            {/* <Grid container item xs={12} lg={4} py={1} mx="auto">
            <MKInput
                variant="standard"
                placeholder="Search"
                fullWidth
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
                }}
            />
            </Grid> */}
            {!companys.length ? <CircularProgress/> : 
                        (
                            <Grid container item spacing={3} alignItems="center" >
                                {companys.map((company) => (
                                    <Grid key={company._id} item xs={12} sm={6} lg={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <RotatingCard>
                                            <RotatingCardFront
                                                image={company.image}
                                                icon="touch_app"
                                                title={company.title}
                                            />
                                            <RotatingCardBack
                                                image={company.image}
                                                title={company.discount}
                                                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                                                action={{
                                                type: "internal",
                                                route: "/",
                                                label: "Go To Store",
                                                }}
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