import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import './style.css';
import Card from '../../components/VehicleCard';
import CurrentIng from '../../images/home_page_vehicle.jpg';
import ThirdImage from '../../images/vehicle_3.png';


class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let oldVehicle = this.cookies.get('vehicles');
        if (oldVehicle) {
            this.state = oldVehicle;
        } else {
            this.state = {
                vehicleList: [],
                count_total: 0,
                // count_incomplete: 0,
                next_id: 0,
                new_vehicle_value: ''
            };
        }
        autoBind(this);
    }
    setStateCallback() {
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        this.cookies.set('vehicles', this.state, { path: '/', expires: date });
        // this.nameInput.focus();
    }


    addToCart(event) {
        console.log(this.props.imgUrl);
        this.setState(function(state, props){
            // todoList items should not be empty
            if (this.props.imgUrl.trim() === "") {
                return {new_vehicle_value: ''};
            }
            state.vehicleList[state.next_id] = {id: state.next_id, vehicle: this.props.imgUrl};
            return {
                new_vehicle_value: '',
                vehicleList: state.vehicleList,
                count_total: state.count_total + 1,
                // count_incomplete: state.count_incomplete + 1,
                next_id: state.next_id + 1
            };
        }, this.setStateCallback);
    }

    // removeFromCart() {
    //     this.setState(function(state, props){
    //         if (! state.todoList.hasOwnProperty(id)) {
    //             return {};
    //         }
    //         let is_completed = state.todoList[id].completed;
    //         delete state.todoList[id];
    //         return {
    //             todoList: state.todoList,
    //             count_total: state.count_total - 1,
    //             count_incomplete: state.count_incomplete + (is_completed ? 0 : -1)
    //         };
    //     }, this.setStateCallback);
    // }
    render() {
        console.log()
        return (
            <div className={"CatalogContainer"}>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={ThirdImage}/>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={CurrentIng}/>
            <Card imgUrl={CurrentIng}/>
            </div>
          );
    }
}

export default Catalog;
