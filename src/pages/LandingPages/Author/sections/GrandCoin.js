import React from 'react';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';





const GrandCoin = ({ className,avatarSrc,style}) => {
    
    return (
        <MKBox>
            <MKAvatar alt="Profile Picture" src={avatarSrc} className={className} style={style}/>
        </MKBox>
    );
};

export default GrandCoin;
