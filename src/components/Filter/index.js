import React from 'react';
import autoBind from 'react-autobind';
import { withRouter } from "react-router-dom";
import { addTransmission, deleteTransmission, addMaker, deleteMaker, addYear, deleteYear, addDoors, deleteDoors, addSeats, deleteSeats } from '../../redux/catalogFilter/actions';
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
        if (this.props.catalogFilter[this.props.filter].includes(event)) {
            switch (this.props.filter) {
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
        else {
            switch (this.props.filter) {
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
        }

    }
    renderItems() {
        return (
            this.props.list.map((option, index) => {
                return (
                    <Button
                        key={option}
                        css={this.props.catalogFilter[this.props.filter].length > 0 && this.props.catalogFilter[this.props.filter].includes(option) ? "SelectedFilterButton" : "FilterButton"}
                        title={option}
                        onClick={this.changeState.bind(this, option)}
                    />);
            })
        );
    }
    render() {
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
    catalogFilter: state.catalogFilter,
});

const mapDispatchToProps = {
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