import React from 'react';
import autoBind from 'react-autobind';
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';


import './style.css';
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
        this.props.onSignOut();
    }
    render() {
        var {user} = this.props;
        return (
            <div className="NavigationContainer" onMouseLeave={!this.state.lockedPanel? this.props.onMouseLeave : () => {}}>
                <div className='upperPartOfNavigation'>
                    <br/>
                    <Link className="navLink" to={'/'}>Home</Link>
                    <br/>
                    <Link className="navLink" to={'/about'}>About</Link>
                    <br/>
                    <Link className="navLink" to={'/catalog'}>Catalog</Link>
                    <br/>
                    <br/>
                    { user.role !== ROLE.GUEST && <Link to={'/add-car'} className={"navLink"}>Add vehicle</Link>}
                    <br/>
                    </div>
                <div style={{display:'flex', flexDirection: 'column'}}>
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
