import React from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


// Material Kit 2 React components
import MKBox from "components/MKBox";

import {CardMedia} from '@material-ui/core';
// import Tona from './noga.mp4';

function Video() {

    const styles = {
        media: {
            borderRadius: 11,
            backgroundColor: 'white',
        }
    };

    return (
        <MKBox component="section" py={12}>
        <Container>
            <Grid container item xs={12} lg={12} py={1} mx="auto">
                <CardMedia style={styles.media} component="video" controls />
            </Grid>
        </Container>
        </MKBox>
    );
}

export default Video;