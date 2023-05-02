
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";




// Material Kit 2 React components
import MKBox from "components/MKBox";
import { useSelector } from 'react-redux';
import RotatingCardComp from "../compCard/index";


import CompCard from '../compCard/CompCard'

function CompanysMobile() {

    const companys = useSelector((state) => state.companys)

    return (
        <MKBox component="section">
        <Container>
            <Grid container item spacing={3} alignItems="center" >
                {companys.map((company) => (
                    <Grid key={company._id} item xs={4} sm={4} md={4} lg={4} >
                        <RotatingCardComp>
                            <CompCard url={company.siteUrl} image={company.image} title={company.title} icon="touch_app" description={company.discount} action={{ type: "external", route: "/", label: "Go To Store" }}/>
                        </RotatingCardComp>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </MKBox>
    );
}

export default CompanysMobile;