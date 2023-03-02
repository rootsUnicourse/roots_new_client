import React, { useState, useEffect } from "react";
import {
    Avatar,
    Button,
    TextField,
    Card,
    CardContent,
    CardHeader,
    makeStyles,
} from "@material-ui/core";
import roots from '../../assets/images/roots.webp'
import * as api from '../../api/index'
import FileBase64 from 'react-file-base64';
import avatar from "assets/theme/components/avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: "auto",
        marginTop: theme.spacing(5),
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    avatar: {
        width: 100,
        height: 100,
        margin: "auto",
        cursor: "pointer",
    },
    background: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        objectFit: "cover",
    },
}));

const EditProfile = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [name, setName] = useState(user.result.name);
    const [email, setEmail] = useState(user.result.email);
    const [image, setImage] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(
        user.result.imageUrl
    );
    const [imageUrl, setImageUrl] = useState(false)
    const [bgImageUrl, setBgImageUrl] = useState(roots);

    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAvatarChange = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatarUrl(reader.result);
            setImageUrl(event.target.files[0])
        }
        };
    reader.readAsDataURL(event.target.files[0]);
    };

    const handleOnSubmit = async () => {
        const formData = {
            id: user.result._id,
            newEmail: email,
            imageUrl: image,
            name: name
        }
        await api.updateUser(formData);
    }


    return (
    <>
        <img src={bgImageUrl} alt="Background" className={classes.background} />
        <Card className={classes.root}>
            <CardHeader title="Edit Profile" />
            <Avatar
            className={classes.avatar}
            src={avatarUrl}
            >
            </Avatar>
            <CardContent>
            <FileBase64
                multiple={false}
                buttonText="Select a file"
                onDone={({ base64 }) => setImage(base64)}
            />
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
            />
            {/* <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
            /> */}
            <br />
            <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleOnSubmit}
            >
                Save
            </Button>
            </CardContent>
        </Card>
        </>
    );
};

export default EditProfile;
