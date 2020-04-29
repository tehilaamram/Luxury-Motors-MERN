import React from 'react';
import './style.css';

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        if(event.target.value === '0' ) {
            this.props.valueChanged('Choose option');

        }else{
            this.props.valueChanged(this.props.list[event.target.value-1]);
        }
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    renderList() {
        return (
            this.props.list.map((option, index)=>{
                return(<option key={index} value={index+1}>{option}</option>);
            })
        )
    }
    render() {
        return (
                <select disabled={this.props.disabled} style={{width: '365px'}} value={this.state.value} onChange={this.handleChange}>
                    <option value='0'>Choose option</option>
                    {this.renderList()}
                </select>
        );
    }
}

export default SelectField;
