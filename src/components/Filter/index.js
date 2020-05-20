import React from 'react';
import autoBind from 'react-autobind';
import { withRouter } from "react-router-dom";
import _ from "lodash";


import './style.css';
import Button from '../Button';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            list: [],
        }
        autoBind(this);
    }
    changeState(event) {
        console.log(event, ' filter event');
        // this.setState({selected: !this.state.selected});
        if (this.state.list.includes(event)) {
            // var index = _indexOf(this.state.list, event);
            var evens = _.remove(this.state.list, function (n) {
                return n === event;
            });
            console.log(this.state.list, ' after delte');
            this.setState({
                list: this.state.list,
            })
        } else {
            this.setState({
                list: [...this.state.list, event],
            })
        }

    }
    renderItems() {
        return (
            this.props.list.map((option, index) => {
                return (
                    <Button
                        key={option}
                        css={this.state.list.includes(option) ? "SelectedFilterButton" : "FilterButton"}
                        title={option}
                        onClick={this.changeState.bind(this, option)}
                    />);
            })
        )
    }
    render() {
        console.log(this.state.list, ' render');
        return (
            <div className="FilterContainer">
                <div className="FilterName">
                    <span className="FilterNameText"> {this.props.subject} </span>
                </div>
                <div className="FilterSelection">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}
export default withRouter(Filter);
