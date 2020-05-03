import React from 'react';
import './style.css';
import {Link} from "react-router-dom";
// import MenuItem from "@material-ui/core/MenuItem";
import Button from '../Button';
import {withRouter} from 'react-router-dom'

// import history from '../../history';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lockedPanel: false, panelState: 'minimize'};
        this.changePanelState = this.changePanelState.bind(this);
        // this.navigateTo = this.navigateTo.bind(this);
      }
    
    openLoginModal() {
        if (document.getElementById('loginRegisterModal').style.display === 'flex') {
            document.getElementById('loginRegisterModal').style.display = 'none';
        } else {
            document.getElementById('loginRegisterModal').style.display = 'flex';
            const email = document.getElementById('Email');

            if(email) {
                email.addEventListener("input", function (event) {
                    if (email.validity.typeMismatch) {
                        email.setCustomValidity("I am expecting an e-mail address!");
                    } else {
                        email.setCustomValidity("");
                    }
                });
            }
        }
    }
    openSighupModal() {
        if (document.getElementById('signUpModal').style.display === 'flex') {
            document.getElementById('signUpModal').style.display = 'none';
        } else {
            document.getElementById('signUpModal').style.display = 'flex';
            const email = document.getElementById('Email');

            if(email) {
                email.addEventListener("input", function (event) {
                    if (email.validity.typeMismatch) {
                        email.setCustomValidity("I am expecting an e-mail address!");
                    } else {
                        email.setCustomValidity("");
                    }
                });
            }
        }
    }
    openAddUserModal() {
        if (document.getElementById('addUserRegisterModal').style.display === 'flex') {
            document.getElementById('addUserRegisterModal').style.display = 'none';
        } else {
            document.getElementById('addUserRegisterModal').style.display = 'flex';
            const email = document.getElementById('Email');

            if(email) {
                email.addEventListener("input", function (event) {
                    if (email.validity.typeMismatch) {
                        email.setCustomValidity("I am expecting an e-mail address!");
                    } else {
                        email.setCustomValidity("");
                    }
                });
            }
        }
    }
    openCartModal() {
        if (document.getElementById('CartModal').style.display === 'flex') {
            document.getElementById('CartModal').style.display = 'none';
        } else {
            document.getElementById('CartModal').style.display = 'flex';
        }
    }
    openOrdersModal() {
        if (document.getElementById('OrdersModal').style.display === 'flex') {
            document.getElementById('OrdersModal').style.display = 'none';
        } else {
            document.getElementById('OrdersModal').style.display = 'flex';
        }
    }
    openWishListModal() {
        if (document.getElementById('WishListModal').style.display === 'flex') {
            document.getElementById('WishListModal').style.display = 'none';
        } else {
            document.getElementById('WishListModal').style.display = 'flex';
        }
    }
    // navigateTo(pageName) {
    //     history.push(pageName);
    // }
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
    render() {
        console.log(this.props.user.length);
        return (
            <div className="NavigationContainer" onMouseLeave={!this.state.lockedPanel? this.props.onMouseLeave : () => {}}>
                <view className='upperPartOfNavigation'>
                    <br/>
                    <Link className="navLink" to={'/'}>Home</Link>
                    <br/>
                    <br/>
                    <Link className="navLink" to={'/about'}>About</Link>
                    <br/>
                    <br/>
                    {/**<Link to={'/vehicle-catalog'} props={{addToCart: this.addToCart}} className={"navLink"}>Catalog</Link>*/}
                    <Link className="navLink" to={'/catalog'}>Catalog</Link>
                    <br/>
                    <br/>
                    <Link to={'/add-car'} className={"navLink"}>Add vehicle</Link>
                    <br/>
                    <br/>
                    <Link to={'/update-order'} className={"navLink"}>Update order</Link>
                    <br/>
                    <br/>
                    <view onClick={this.openAddUserModal} className={"navLink"}>Add user</view>
                    </view>
                <view style={{display:'flex', flexDirection: 'column'}}>
                <Button title={"pin Panel"} css={"navButton"} onClick={this.changePanelState}/>
                    {this.props.user.length === 0&&<view onClick={this.openLoginModal} style={{paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Sign In</view>}
                    {this.props.user.length === 0&&<view onClick={this.openSighupModal} style={{cursor: 'pointer',paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Sign Up</view>}
                    {this.props.user.length !== 0&&<view onClick={this.openWishListModal} style={{paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Wish list</view>}
                    {this.props.user.length !== 0&&<view onClick={this.openCartModal} style={{paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Cart</view>}
                    {this.props.user.length !== 0&&<view onClick={this.openOrdersModal} style={{paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Orders</view>}
                    {this.props.user.length !== 0&&<hr style={{width: '173px'}}/>}
                    {this.props.user.length !== 0&&<view onClick={this.props.sighOut} style={{ paddingLeft: 13, color: 'white', fontSize: 20, paddingBottom:20}}>Sigh out</view>}
                </view>

            </div>
        );
    }
}

export default withRouter(Navigation);