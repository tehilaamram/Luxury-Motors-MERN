import React from 'react';
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';


import './style.css';
import Button from '../Button';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lockedPanel: false, panelState: 'minimize'};
        this.changePanelState = this.changePanelState.bind(this);
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
    changePanelState() {
        console.log("in state");
        if (this.state.lockedPanel) {
            this.setState({
                lockedPanel: false,
                panelState: 'minimize',
            });
        } else {
            this.setState({
                lockedPanel: true,
                panelState: 'pin-panel',
            });
        }
    }
    signOut(){

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
                    { user.role !== 'user' && <Link to={'/add-car'} className={"navLink"}>Add vehicle</Link>}
                    <br/>
                    </div>
                <div style={{display:'flex', flexDirection: 'column'}}>
                { user.email !== '' && <Button title={"Sign Out"} css={"navButton"} onClick={this.signOut}/>}
                <Button title={"pin Panel"} css={"navButton"} onClick={this.changePanelState}/>
                { user.email === '' && <Button title={"Sign In"} css={"navButton"} onClick={this.openSignInModal}/>}
                { user.email === '' && <Button title={"Sign Up"} css={"navButton"} onClick={this.openSignUpModal}/>}
                <br/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(withRouter(Navigation));
// export default withRouter(Navigation);