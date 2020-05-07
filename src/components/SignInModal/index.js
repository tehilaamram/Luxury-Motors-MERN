import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import autoBind from 'react-autobind';

import './style.css';
import TextInput from '../TextInput';
import Button from '../Button';
import FlashMessage from '../FlashMessage';
import { signUp } from '../../redux/user/actions';


const crypto = require('crypto');

class SignInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorSubject: '',
            errorMessage: '',
        };
        autoBind(this);
    }
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    signIn() {
        console.log(this.props.user);
        if (this.state.email === '' ||
            this.state.password === '') {
            alert('Make sure you filled all field');
        } else {
            var mykey = crypto.createCipher('aes-128-cbc', 'luxury');
            var encryptedPassword = mykey.update(this.state.password, 'utf8', 'hex')
            encryptedPassword += mykey.final('hex');
            axios.post(`${process.env.REACT_APP_SERVER_URL}/signIn`, {
                user: {
                    email: this.state.email,
                    password: encryptedPassword,
                }
            }).then((res) => {
                    if (res.status === 200) {
                        this.props.onSignIn(res.body.role, this.state.email, this.state.fullName);
                        this.closeModal();
                    } else {
                        alert(res.data.error.errmsg);
                    }
                }).catch((err) => {
                    if (err.response === undefined) {
                        this.setState({
                            error: true,
                            errorMessage: 'Unable to connect the server, please try later.'
                        });
                    } else {
                        if (err.response.status === 401) {
                            this.setState({
                                error: true,
                                errorMessage: 'email or password is incorrect'
                            });
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: err,
                            });
                        }
                    }
                    document.getElementById('SignInModalErrorFlash').style.display = "block";
                });
        }
    }

    closeModal() {
        document.getElementById('signInModal').style.display = 'none';
    }
    render() {
        return (
            <div id='signInModal' className="SignInModal">
                {this.state.error && <FlashMessage id={'SignInModalErrorFlash'} css={"Error"} subject={'Error!'} message={this.state.errorMessage} />}
                <div id='signInModalContent' className="SignInModalContent">
                    <div className="SignInDivTitle">
                        <span className='SignInTitle'>
                            Sign In
					</span>
                    </div>
                    <div className='SignInModalRealContent'>
                        <TextInput id={"email"} text={"Email"} type={"email"} onChange={this.onEmailChange} value={this.state.email} />
                        <TextInput id={"password"} text={"Password"} type={"password"} onChange={this.onPasswordChange} value={this.state.password} />
                        <Button css={"PrimaryButton SignUpButton"} title={"Sign In"} onClick={this.signUp} />
                        <div className="CloseSignUpModalDiv">
                        <Button css={"LinkButton"} title={"Forgot Your Password?"} onClick={this.signUp} />
                        <Button css={"RoundCloseButton"} title={"×"} onClick={this.closeModal} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = {
    onSignIn: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
