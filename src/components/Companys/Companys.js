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


function Companys() {

    const companys = useSelector((state) => state.companys)

    return (
        <MKBox component="section" py={12}>
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
                                    <Grid key={company._id} item xs={12} sm={4} lg={4}>
                                        <BackgroundBlogCard image={company.image} title={company.title} description="Rather than worrying about switching offices every couple years, you stay in the same place." />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
        </Container>
        </MKBox>
    );
}

export default Companys;