import React from 'react';
import './style.css';
import userImage from '../../assets/user.png';

class Avatar extends React.Component {
    openLoginModal() {
        if (document.getElementById('loginRegisterModal').style.display === 'block') {
            document.getElementById('loginRegisterModal').style.display = 'none';
        } else {
            document.getElementById('loginRegisterModal').style.display = 'block';
            const email = document.getElementById('Email');

            email.addEventListener("input", function (event) {
              if (email.validity.typeMismatch) {
                email.setCustomValidity("I am expecting an e-mail address!");
              } else {
                email.setCustomValidity("");
              }
            });
        }
    }
    render() {
        return (
            <img id='userAvatar' src={userImage} className='user-image' alt="logo" onClick={this.openLoginModal} />
        );
    }
}

export default Avatar;