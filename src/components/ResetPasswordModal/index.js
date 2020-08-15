import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
// import ReCAPTCHA from "react-google-recaptcha";


import './style.css';
import AjaxService from '../../services/AjaxService';
import TextInput from '../TextInput';
import Button from '../Button';
import FlashMessage from '../FlashMessage';
import { signUp } from '../../redux/user/actions';


class ResetPasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false,
            errorSubject: '',
            errorMessage: '',
        };
        autoBind(this);
    }
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    resetPassword() {
        // console.log(this.props.user);
        if (this.state.email === '') {
            alert('Make sure you filled all field and your passwords are same');
        } else {
            AjaxService.post('/resetPassword', {
                email: this.state.email,
            }).then((res) => {
                    // if (res.status === 200) {
                        // console.log(res, ' session', res);
                        this.props.onSignUp(res.data.user.id, this.state.email, this.state.fullName);
                        this.closeModal();
                    // } else {
                    //     alert(res.data.error.errmsg);
                    // }
                }).catch((err) => {
                    if (err.response === undefined) {
                        this.setState({
                            error: true,
                            errorMessage: 'Unable to connect the server, please try later.'
                        });
                    } else {
                        if (err.response.status === 409) {
                            this.setState({
                                error: true,
                                errorMessage: 'email already exists'
                            });
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: err,
                            });
                        }
                    }
                    document.getElementById('ResetPasswordModalErrorFlash').style.display = "block";
                });
        }
    }

    closeModal() {
        document.getElementById('resetPasswordModal').style.display = 'none';
    }
     onChange(value) {
        console.log("Captcha value:", value);
      }
    render() {
        return (
            <div id='resetPasswordModal' className="ResetPasswordModal">
                {this.state.error && <FlashMessage id={'ResetPasswordModalErrorFlash'} css={"Error"} subject={'Error!'} message={this.state.errorMessage} />}
                <div id='resetPasswordModalContent' className="ResetPasswordModalContent">
                    <div className="ResetPasswordDivTitle">
                        <span className='ResetPasswordTitle'>
                            Reset Password
					</span>
                    </div>
                    <div className='ResetPasswordModalRealContent'>
                        <TextInput id={"email"} text={"Email"} type={"email"} onChange={this.onEmailChange} value={this.state.email} />
                        <Button css={"PrimaryButton SignUpButton"} title={"Send"} onClick={this.resetPassword} width={"w100percent"}/>
                        
                        <div className="CloseResetPasswordModalDiv">
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
    onSignUp: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);
