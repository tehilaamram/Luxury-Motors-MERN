import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import TextInput from '../../components/TextInput';
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: false,
            errorSubject: '',
            errorMessage: '',
        };
        autoBind(this);
    }
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }
    render() {
        console.log()
        return (
            <div className={"ResetPasswordContainer"}>
            <TextInput id={"password"} text={"Password"} type={"password"} onChange={this.onEmailChange} value={this.state.email} />
            <TextInput id={"confirmPassword"} text={"Confirm Password"} type={"password"} onChange={this.onEmailChange} value={this.state.email} />
            </div>
        );
    }
}

export default ResetPassword;
