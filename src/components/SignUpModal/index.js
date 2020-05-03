import React from 'react';
import md5 from 'md5';
import './style.css';
import axios from "axios";
import TextInput from '../TextInput';
import Button from '../Button';

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
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
            axios.post(`${process.env.REACT_APP_SERVER_URL}/signUp`, {
                email: this.state.email,
                password: md5(this.state.password),
                fullName: this.state.fullName,
            })
                .then((res) => {
                    console.log(res, ' res');
                    if (res.data.success === true) {
                        alert(this.state.fullName + ': you sighed up successfully');
                        this.closeModal();
                    } else {
                        alert(res.data.error.errmsg);
                    }
                }).catch((err) => {
                    console.log(err, ' errorvidhv');
                    
                });
        }
    }

    closeModal() {
        document.getElementById('signUpModal').style.display = 'none';
    }
    render() {
        return (
            <div id='signUpModal' className="SignUpModal">
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