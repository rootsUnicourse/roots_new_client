import React, { useState } from "react";
import{
    TextField,
    Card,
    CardContent,

    makeStyles,
} from "@material-ui/core";
// import roots from '../../assets/images/roots.webp'
import * as api from '../../api/index'
// import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";

const useStyles = makeStyles(() => ({
    editProfileContainer: {
    },
    roott: {
        maxWidth: 500,
        margin: "auto",
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
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [name, setName] = useState(user.result.name);
    const [image, setImage] = useState(null);
    const [avatarUrl] = useState(
        user.result.imageUrl
    );
    
    const navigate = useNavigate();
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleOnSubmit = async () => {
        const formData = {
            id: user.result._id,
            imageUrl: image,
            name: name
        }
        await api.updateUser(formData);
        const newUserData = {
            ...user,
            result: {
                ...user.result,
                name: name ? name : user.result.name,
                imageUrl: image ? image : user.result.imageUrl
            }
        };
        localStorage.setItem('profile', JSON.stringify(newUserData));
        navigate(0);
    }
    
    const handleFileChange = (event) => {
        // Convert the file to base64 and set the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    


    return (
        <div className={classes.editProfileContainer}>
            <>
            
            <Card className={classes.roott}>
                <MKAvatar
                className={classes.avatar}
                src={image ? image : avatarUrl}
                >
                </MKAvatar>
                <CardContent>
                <MKButton variant="contained" style={{backgroundColor: "#03CF9D"}} component="label">
                    Select an image
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </MKButton>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={handleNameChange}
                />
                <br />
                <MKButton
                    className={classes.submitButton}
                    variant="contained"
                    style={{backgroundColor: "#03CF9D"}}
                    type="submit"
                    onClick={handleOnSubmit}
                >
                    Save
                </MKButton>
                </CardContent>
            </Card>
            </>
        </div>
    );
};

export default EditProfile;
