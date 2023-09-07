import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import * as api from '../../../api/index'
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [message, setMessage] = React.useState("");
const [user] = useState(JSON.parse(localStorage.getItem('profile')));
const [recaptchaValue, setRecaptchaValue] = useState(null);

// If the user is logged in, set the initial email value to the user's email
useEffect(() => {
    if(user){
        setEmail(user?.result.email);
        setName(user?.result.name);
    }
}, [user]);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
        alert("Please verify you are not a robot.");
        return;
    }
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
                <MKTypography variant="h4" fontWeight="medium" sx={{color: "#1C1F4B"}} mt={1}>
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
                <ReCAPTCHA
                sitekey="6LeGpwgoAAAAAPK8GiZ7AHRFOB5HEeHm49sv-G0r
                " // Replace with your Site Key
                onChange={value => setRecaptchaValue(value)}
                />
                <Button type="submit" variant="contained" disabled={!recaptchaValue} style={{backgroundColor: "#02D2A0" , marginBottom: "100px"}}>
                    Send!
                </Button>
            </Grid>
        </Grid>
    </form>
);
};

export default ContactForm;
