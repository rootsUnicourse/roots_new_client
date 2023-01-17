import React from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import * as api from '../../../api/index'


const ContactForm = () => {
const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [message, setMessage] = React.useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    const mailData ={
        email: email,
        name: name,
        message: message
    }
    api.sendMail(mailData);
};

return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" mb={5}>
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                <MKTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
                    Contact us !
                </MKTypography>
                <TextField
                    label="Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Message*"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={4}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Send!
                </Button>
            </Grid>
        </Grid>
    </form>
);
};

export default ContactForm;