import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {Cookies}  from 'react-cookie';
// import CircularProgress from '@material-ui/core/CircularProgress';

import './style.css';
import TextInput from '../TextInput';
import Button from '../Button';
import FlashMessage from '../FlashMessage';
import { signIn } from '../../redux/user/actions';
import AjaxService from '../../services/AjaxService';
// import Alert from '@material-ui/lab/Alert';

const crypto = require('crypto');

class SignInModal extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
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
            AjaxService.post('/signIn', {
                // user: {
                    username: this.state.email,
                    password: encryptedPassword,
                // }
            }).then((res) => {
                    if (res.status === 200) {
                        console.log(res, ' res sign in');
                        this.props.onSignIn(res.data.user.id, res.data.user.role, this.state.email, res.data.user.fullName);
                        this.closeModal();
                    } else {
                        alert(res.data.error.errmsg);
                    }
                }).catch((err) => {
                    console.log(err);
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
    openResetPasswordModal() {
        document.getElementById('signInModal').style.display = 'none';
        document.getElementById('resetPasswordModal').style.display = 'flex';
    }
    render() {
        return (
            <div id='signInModal' className="SignInModal">
                      {/* <CircularProgress /> */}
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
                        <Button disabled={false} css={"PrimaryButton SignUpButton"} title={"Sign In"} onClick={this.signIn} width={"w100percent"}/>
                        <div className="CloseSignUpModalDiv">
                        <Button  css={"LinkButton"} title={"Forgot Your Password?"} onClick={this.openResetPasswordModal} />
                        <Button  css={"RoundCloseButton"} title={"×"} onClick={this.closeModal} />
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
    onSignIn: signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
