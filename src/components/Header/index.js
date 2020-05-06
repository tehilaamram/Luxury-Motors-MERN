import React from 'react';
import autoBind from 'react-autobind';

import './style.css';
import logo from '../../images/luxury_motors3.jpg';
import Navigation from '../Navigation';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isMouseIn: false};
        autoBind(this);
    }
    handleMouseIn() {
        this.setState({isMouseIn: true});
    }
    handleMouseOut() {
        this.setState({isMouseIn: false});
    }
    render() {
        return (
            <header className={"AppHeader"}>
                <img src={logo} className={"AppLogo"} alt="logo"
                     onMouseEnter={this.handleMouseIn}/>
                {this.state.isMouseIn && <Navigation onMouseLeave={this.handleMouseOut} />}
            </header>
        );
    }
}

export default Header;
