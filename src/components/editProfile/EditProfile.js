import React, { useState } from "react";
import{
    TextField,
    Card,
    CardContent,

    makeStyles,
} from "@material-ui/core";
import roots from '../../assets/images/roots.webp'
import * as api from '../../api/index'
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";

const useStyles = makeStyles((theme) => ({
    editProfileContainer: {
        paddingTop: theme.spacing(35), //adjust this value
        zIndex: 0,
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
    const [image, setImage] = useState('');
    const [avatarUrl] = useState(
        user.result.imageUrl
    );
    const [bgImageUrl] = useState(roots);
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
        navigate(-1);
    }
    
    
    


    return (
        <div className={classes.editProfileContainer}>
            <>
            <img src={bgImageUrl} alt="Background" className={classes.background} />
            <Card className={classes.roott}>
                <MKAvatar
                className={classes.avatar}
                src={avatarUrl}
                >
                </MKAvatar>
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
                <br />
                <MKButton
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
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
