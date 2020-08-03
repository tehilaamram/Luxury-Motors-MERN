import React from 'react';
import './style.css';

class Button extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <button disabled={this.props.disabled} className={this.props.css +' ' + this.props.width} onClick={this.props.onClick} id={this.props.id}>{this.props.title}</button>
        );
    }
}
// Button.defaultProps = {
//     color: 'blue'
//   };
export default Button;