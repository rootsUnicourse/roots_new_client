import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Container } from '@material-ui/core'
// import CompCard from '../compCard/CompCard'
// import useStyles from './styles'
import MKBox from "components/MKBox";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";



const CompCards = () => {
    
    const companys = useSelector((state) => state.companys)
    
        return (
            <MKBox component="section" py={3} my={6}>
                <Container>
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

export default CompCards;