import React from 'react';
import './style.css';

class TextInput extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="TextInputRow">
                <div className="TextInputLabelContainer">
                    <label className={"TextInputLabel"} htmlFor={this.props.id}>{this.props.text}</label>
                </div>
                <div className="TextInputTextContainer">
                    <input type={this.props.type} id={this.props.id} onChange={this.props.onChange} value={this.props.value} min={this.props.min} max={this.props.max}/>
                </div>
            </div>
        );
    }
}

export default TextInput;