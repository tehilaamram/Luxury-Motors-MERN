import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import AjaxService from '../../services/AjaxService';

const crypto = require('crypto');

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            error: false,
            errorSubject: '',
            errorMessage: '',
        };
        autoBind(this);
    }
    componentDidMount(){
        console.log(window.location);
        const { match: { params } } = this.props;
        AjaxService.get(`/resetPassword/${params.token}`).then((res) => {
            if (res.status === 419) {
                console.log('need to create expired token page');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }
    resetPassword() {
        if ( this.state.confirmPassword !== this.state.password) {
            console.log('take care of it later');
        } else {
            const { match: { params } } = this.props;
            var mykey = crypto.createCipher('aes-128-cbc', 'luxury');
            var encryptedPassword = mykey.update(this.state.password, 'utf8', 'hex')
            encryptedPassword += mykey.final('hex');
            AjaxService.post('/user/resetPassword', {
                newPassword: encryptedPassword,
                userToken: params.token,
            }).then((res) => {

            }).catch((err) => {

            });
        }
    }
    render() {
        console.log()
        return (
            <div className={"ResetPasswordContainer"}>
            <TextInput id={"password"} text={"Password"} type={"password"} onChange={this.onPasswordChange} value={this.state.password} />
            <TextInput id={"confirmPassword"} text={"Confirm Password"} type={"password"} onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword} />
            <Button css={"PrimaryButton SignUpButton"} title={"Reset"} onClick={this.resetPassword} />
            </div>
        );
    }
}

export default ResetPassword;