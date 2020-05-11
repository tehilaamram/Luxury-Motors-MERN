import React from 'react';
import './style.css';

class TextLabel extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="TextLabelRow">
                <div className="TextLabelContainer">
                    <label className={"TextLabel"} htmlFor={this.props.id}>{this.props.text}</label>
                </div>
                <div className="TextLabelTextContainer">
                    <label className={"TextLabel"} id={this.props.id} >  {this.props.value}</label>
                </div>
            </div>
        );
    }
}

export default TextLabel;