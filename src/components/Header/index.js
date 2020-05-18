import React from 'react';
import autoBind from 'react-autobind';

import './style.css';
import { TiThMenu } from 'react-icons/ti';
import logo from '../../images/luxury_motors3.jpg';
import Navigation from '../Navigation';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={ isOpen: false}
        // this.state = {isMouseIn: false};
        autoBind(this);
    }
    // handleMouseIn() {
    //     this.setState({isMouseIn: true});
    // }
    // handleMouseOut() {
    //     this.setState({isMouseIn: false});
    // }
    sidenav() {
        console.log('in sidenav')
        this.setState({isOpen: !this.state.isOpen});
    }
    render() {
        console.log(this.state.isOpen);
        return (
            <header className={"AppHeader"}>
                <img src={logo} className={"AppLogo"} alt="logo" />
                     {this.state.isOpen && <Navigation closenav={this.sidenav}/>}
                {/**this.state.isMouseIn && <Navigation onMouseLeave={this.handleMouseOut} />*/}
                <TiThMenu onClick={this.sidenav}  className='react-icons'/>
            </header>
        );
    }
}

export default Header;
