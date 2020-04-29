import React from 'react';
import './style.css';

class TextInput extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div class="form__group field">
                <input type={this.props.type} class="form__field" placeholder={this.props.name} name={this.props.name} id={this.props.name} required/>
                <label for={this.props.name} class="form__label">{this.props.name}</label>
            </div>
        );
    }
}

export default TextInput;