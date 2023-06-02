import React, { useState } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import * as api from '../../api/index'; // replace with the path to your API module

function MyAvatarComponent() {

    const [config, setConfig] = useState(genConfig());
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const generateNewAvatar = () => {
        setConfig(genConfig());
    };

    const saveAvatar = async () => {
        try {
        const avatarElement = document.getElementById('avatar');
        const avatarImage = await toPng(avatarElement);
        const formData = {
            id: user.result._id,
            imageUrl: avatarImage
        }
        const response = await api.updateUser(formData); // replace with your API function to save the image to the server
        if (response.status === 200) {
            console.log(response);
            const newUserData = {
                ...user,
                result: {
                    ...user.result,
                    imageUrl: response.data.imageUrl
                }
            };
            localStorage.setItem('profile', JSON.stringify(newUserData));
            navigate('/next-page'); // replace with the path to the next page
        }
        } catch (error) {
        console.error('Failed to save avatar image:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>My Avatar</h1>
            <Avatar id="avatar" style={{ width: '8rem', height: '8rem' }} {...config} />
            <button onClick={generateNewAvatar} style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '5px', border: 'none', color: 'white', backgroundColor: '#007BFF', cursor: 'pointer' }}>Generate New Avatar</button>
            <button onClick={saveAvatar} style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '5px', border: 'none', color: 'white', backgroundColor: '#28a745', cursor: 'pointer' }}>Let's Go!</button>
        </div>
    );
}

export default MyAvatarComponent;
