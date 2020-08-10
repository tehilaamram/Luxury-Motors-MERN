import React from 'react';
import autoBind from 'react-autobind';
import { withRouter } from "react-router-dom";
// import _ from "lodash";
import { addTransmission, deleteTransmission, addMaker, deleteMaker, addYear, deleteYear, addDoors, deleteDoors, addSeats, deleteSeats} from '../../redux/catalogFilter/actions';
import { connect } from 'react-redux';


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
        // if (this.state.list.includes(event)) {
        //     _.remove(this.state.list, function (n) {
        //         return n === event;
        //     });
        if (this.props.catalogFilter[this.props.filter].includes(event))
        {
            switch(this.props.filter) {
                case "transmission":
                    this.props.onDeleteTransmission(event);
                    break;
                case "maker":
                    this.props.onDeleteMaker(event);
                    break;
                case "year":
                    this.props.onDeleteYear(event);
                    break;
                case "doors":
                    this.props.onDeleteDoors(event);
                    break;
                case "seats":
                    this.props.onDeleteSeats(event);
                    break;
                default:
                    return;
            }
        }
            
            // console.log(this.state.list, ' after delte');
            // this.setState({
            //     list: this.state.list,
            // })
         else {
            switch(this.props.filter) {
                case "transmission":
                    this.props.onAddTransmission(event);
                    break;
                case "maker":
                    this.props.onAddMaker(event);
                    break;
                case "year":
                    this.props.onAddYear(event);
                    break;
                case "doors":
                    this.props.onAddDoors(event);
                    break;
                case "seats":
                    this.props.onAddSeats(event);
                    break;
                default:
                    return;
            }           
            //  this.setState({
            //     list: [...this.state.list, event],
            // })
        }

    }
    renderItems() {
        // console.log(this.props.onFilterClick, ' filter')
        return (
            this.props.list.map((option, index) => {
                // console.log(option)
                return (
                    <Button
                        key={option}
                        css={ this.props.catalogFilter[this.props.filter].length > 0 && this.props.catalogFilter[this.props.filter].includes(option) ? "SelectedFilterButton" : "FilterButton"}
                        title={option}
                        // onClick={this.changeState.bind(this, option)}
                        onClick={this.props.onFilterClick.bind(this, option) && this.changeState.bind(this, option) }
                    />);
            })
        );
    }
    render() {
        // console.log(this.state.list, ' render');
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

const mapStateToProps = (state) => ({
    // cart: state.cart,
    catalogFilter: state.catalogFilter,
});

const mapDispatchToProps = {
    // onAdd: add,
    onAddTransmission: addTransmission,
    onDeleteTransmission: deleteTransmission,
    onAddMaker: addMaker,
    onDeleteMaker: deleteMaker,
    onAddYear: addYear,
    onDeleteYear: deleteYear,
    onAddDoors: addDoors,
    onDeleteDoors: deleteDoors,
    onAddSeats: addSeats,
    onDeleteSeats: deleteSeats,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter));

// export default withRouter(Filter);
