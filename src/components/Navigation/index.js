import React from 'react';
import autoBind from 'react-autobind';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';


import './style.css';
import AjaxService from '../../services/AjaxService';
import Button from '../Button';
import { ROLE } from '../../helpers/consts';
import { signOut } from '../../redux/user/actions';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lockedPanel: false, panelState: 'minimize'};
        autoBind(this);
    }

    openSignInModal() {
        if (document.getElementById('signInModal').style.display === 'flex') {
            document.getElementById('signInModal').style.display = 'none';
        } else {
            document.getElementById('signInModal').style.display = 'flex';
        }
    }
    openSignUpModal() {
        if (document.getElementById('signUpModal').style.display === 'flex') {
            document.getElementById('signUpModal').style.display = 'none';
        } else {
            document.getElementById('signUpModal').style.display = 'flex';
        }
    }
    signOut(){
        AjaxService.get('/signOut', {data: {user: this.props.user.email}}).then((res) => {
        this.props.onSignOut();
        }).catch((err) => {
            console.log('error in sign out ', err);
        })
    }
    navigateTo(page) {
        this.props.onMouseLeave();
        this.props.history.push(page);
    }
    render() {
        var {user} = this.props;
        return (
            <div className="NavigationContainer" onMouseLeave={!this.state.lockedPanel? this.props.onMouseLeave : () => {}}>
                <div className='upperPartOfNavigation'>
                    <br/>
                    <Button title={"Home"} css={"navButton"} onClick={() => {this.navigateTo('/')}}/>
                    <br/>
                    <Button title={"About"} css={"navButton"} onClick={() => {this.navigateTo('/about')}}/>
                    <br/>
                    <Button title={"Catalog"} css={"navButton"} onClick={() => {this.navigateTo('/catalog')}}/>
                    <br/>
                    <Button title={"Add Vehicle"} css={"navButton"} onClick={() => {this.navigateTo('/add-vehicle')}}/>
                    <br/>
                    </div>
                <div style={{display:'flex', flexDirection: 'column'}}>
                <hr className="NavigationHr"/>
                { user.role !== ROLE.GUEST && <Button title={"Sign Out"} css={"navButton"} onClick={this.signOut}/>}
                { user.role === ROLE.GUEST && <Button title={"Sign In"} css={"navButton"} onClick={this.openSignInModal}/>}
                { user.role === ROLE.GUEST && <Button title={"Sign Up"} css={"navButton"} onClick={this.openSignUpModal}/>}
                <br/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = {
    onSignOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
