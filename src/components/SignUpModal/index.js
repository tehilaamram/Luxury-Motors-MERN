import React from 'react';
// import md5 from 'md5';
import './style.css';
import axios from "axios";
import TextInput from '../TextInput';
import Button from '../Button';
import FlashMessage from '../FlashMessage';
const crypto = require('crypto');

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            error: false,
            errorSubject: '',
            errorMessage: '',
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onFullNameChange = this.onFullNameChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }
    onFullNameChange(event) {
        this.setState({ fullName: event.target.value });
    }

    signUp() {
        if (this.state.email === '' ||
            this.state.password === '' ||
            this.state.confirmPassword === '' ||
            this.state.fullName === '' ||
            this.state.confirmPassword !== this.state.password
        ) {
            alert('Make sure you filled all field and your passwords are same')
        } else {
            var mykey = crypto.createCipher('aes-128-cbc', 'luxury');
            var encryptedPassword = mykey.update(this.state.password, 'utf8', 'hex')
            encryptedPassword += mykey.final('hex');
            axios.post(`${process.env.REACT_APP_SERVER_URL}/signUp`, {
                email: this.state.email,
                password: encryptedPassword,
                fullName: this.state.fullName,
            })
                .then((res) => {
                    console.log(res, ' res');
                    if (res.status === 200) {
                        // alert(this.state.fullName + ': you sighed up successfully');
                        this.closeModal();
                    } else {
                        alert(res.data.error.errmsg);
                    }
                }).catch((err) => {
                    console.log(err.response);
                    if (err.response === undefined) {
                        this.setState({
                            error: true,
                            errorMessage: 'Unable to connect the server, please try later.'
                        });
                        document.getElementById('SignUpModalErrorFlash').style.display = "block";
                    } else {
                        if (err.response.status === 409) {
                            this.setState({
                                error: true,
                                errorMessage: 'email already exists'
                            });
                            document.getElementById('SignUpModalErrorFlash').style.display = "block";
                        }
                    }
                });
        }
    }

    closeModal() {
        document.getElementById('signUpModal').style.display = 'none';
    }
    render() {
        return (
            <div id='signUpModal' className="SignUpModal">
                {this.state.error && <FlashMessage id={'SignUpModalErrorFlash'} css={"Error"} subject={'Error!'} message={this.state.errorMessage} />}
                <div id='loginRegisterModalContent' className="modal-content">
                    <div className="sighup-form-title">
                        <span className='sighupTitle'>
                            Sign Up
					</span>
                    </div>
                    <div className='modal-real-content'>
                        <TextInput id={"fullName"} text={"Full Name"} type={"text"} onChange={this.onFullNameChange} value={this.state.fullName} />
                        <TextInput id={"email"} text={"Email"} type={"email"} onChange={this.onEmailChange} value={this.state.email} />
                        <TextInput id={"password"} text={"Password"} type={"password"} onChange={this.onPasswordChange} value={this.state.password} />
                        <TextInput id={"confirmPassword"} text={"Confirm Password"} type={"password"} onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword} />
                        <Button css={"PrimaryButton"} title={"Sign Up"} onClick={this.signUp} />
                        <Button css={"RoundCloseButton"} title={""} onClick={this.closeModal} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpModal;