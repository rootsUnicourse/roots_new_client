import React from 'react';
import MKBox from 'components/MKBox';
import MKAvatar from 'components/MKAvatar';
import UserDetailsPopup from 'components/UserDetailsPopup/UserDetailsPopup';




const GrandCoin = ({ className,avatarSrc,avaterName,style}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <MKBox>
            <UserDetailsPopup
                open={open}
                handleClose={handleClose}
                avatarSrc={avatarSrc}
                avaterName={avaterName}
                moneyEarned={"200$"}
                lastActivity="2023-05-04" // Replace with actual data
                registeredFrom="2023-04-01" // Replace with actual data
            />
            <div onClick={handleClickOpen}>
                <MKAvatar alt="Profile Picture" src={avatarSrc} className={className} style={style}/>
            </div>
        </MKBox>
    );
};

export default GrandCoin;
