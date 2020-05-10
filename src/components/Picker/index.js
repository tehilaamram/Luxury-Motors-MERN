import React from 'react';
import './style.css';

class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        // if(event.target.value === '0' ) {
            // this.props.valueChanged('Choose option');

        // }else{
            this.props.valueChanged(this.props.list[event.target.value]);
        // }
        this.setState({value: event.target.value});
    }
    renderList() {
        return (
            this.props.list.map((option, index)=>{
                return(<option key={index} value={index}>{option}</option>);
            })
        )
    }
    render() {
        return (
            <div className="PickerRow">
                <div className="PickerLabelContainer">
                    <label className={"PickerLabel"} htmlFor={this.props.id}>{this.props.text}</label>
                </div>
                <div className="PickerListContainer">
                    <select id={this.props.id} value={this.state.value} onChange={this.handleChange}>
                    {/**this.renderList()*/}
                                        {this.renderList()}
                    </select>
                </div>
            </div>
        );
    }
}

export default Picker;