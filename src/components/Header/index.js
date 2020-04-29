import React from 'react';
import './style.css';
import logo from '../../images/luxury_motors3.jpg';
import Navigation from '../Navigation';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isMouseIn: false};

        // This binding is necessary to make `this` work in the callback
        this.handleMouseIn = this.handleMouseIn.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    handleMouseIn() {
        this.setState({isMouseIn: true});
    }
    handleMouseOut() {
        this.setState({isMouseIn: false});
    }
    render() {
        return (
            <header className={"header"}>
                <img src={logo} className={"appLogo"} alt="logo"
                     onMouseEnter={this.handleMouseIn}/>
                {this.state.isMouseIn && <Navigation sighOut={this.props.sighOut} user={this.props.user} onMouseLeave={this.handleMouseOut} />}
            </header>
        );
    }
}

export default Header;
