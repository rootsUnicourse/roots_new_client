import React, { Component } from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import useStyles from './styles'


const CompCard = ({ company }) => {

    const classes = useStyles();

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={company.image} title={company.title} onClick={()=>{console.log("hii")}}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{company.title}</Typography>
            </div>
            <div className={classes.details}>
                <Typography className={classes.title} gutterBottom variant="h5">{company.discount}</Typography>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>{}}></Button>
            </CardActions>
        </Card>
    );
};

export default CompCard;