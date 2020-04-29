import React from 'react';
import './style.css';

class Button extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <button className={this.props.css} onClick={this.props.onClick} id={this.props.title}>{this.props.title}</button>
        );
    }
}

export default Button;