import React, {useState} from 'react';
import useStyles from './styles'
import { TextField, Button, Typography, Paper, Grid, CardMedia, Avatar } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createCompany } from '../../actions/companys'


const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [companyData, setCompanyData] = useState({image: "", title: "", discount: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCompany(companyData))
    }

    const clear = () => {
    }

    return (
        <Grid container>
            <Grid item lg={4}>
                <Paper className={classes.paper}>
                    <form autoComplete='off' noValidate className={classes.form, classes.root} onSubmit={handleSubmit}>
                        <Typography variant="h6">Creating a Company</Typography>
                        <TextField name="title" variant="outlined" label="Title" fullWidthvalue={companyData.title} onChange={(e) => setCompanyData({...companyData, title: e.target.value})}/>
                        <TextField name="discount" variant="outlined" label="discount" fullWidthvalue={companyData.discount} onChange={(e) => setCompanyData({...companyData, discount: e.target.value})}/>
                        <div className={classes.fileInput}>
                            <FileBase type="file" multiple={false} onDone={({base64}) => setCompanyData({...companyData, image: base64})}/>
                        </div>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Form;