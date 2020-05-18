import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import './style.css';
import Card from '../../components/VehicleCard';
import Filter from '../../components/Filter';
import AjaxService from '../../services/AjaxService';

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let oldVehicleCart = this.cookies.get('vehicles');
        if (oldVehicleCart) {
            this.state = {
                vehicleList: [],
                count_total: 0,
                vehicleCart: oldVehicleCart,
                next_id: 0,
                new_vehicle_value: ''
            };
        } else {
            this.state = {
                vehicleCart: [],
                vehicleList: [],
                count_total: 0,
                next_id: 0,
                new_vehicle_value: ''
            };
        }
        autoBind(this);
    }
    componentDidMount() {
        AjaxService.get('/vehicle/getAll').then((res) => {
            console.log(res, ' res get all vehicles');
            this.setState({
                vehicleList: res.data,
            });
        }).catch((err) => {
            console.log('err get all vehicles', err);
        });
    }
    setStateCallback() {
        console.log(this.state.vehicleCart, ' vehicle cart update cookie');
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        console.log('in cookie');
        this.cookies.set('vehicles', this.state.vehicleCart, { path: '/', expires: date });
        // this.nameInput.focus();
    }


    addToCart(event) {
        console.log(event, ' event');
        this.setState(function(state, props){
             console.log(state, ' state');
            // todoList items should not be empty
            if (event === undefined) {
                return {new_vehicle_value: ''};
            }
            state.vehicleCart[state.next_id] = {id: state.next_id, vehicle: event._id};
            console.log(state.vehicleCart, ' vehicle cart');
            return {
                new_vehicle_value: '',
                vehicleCart: state.vehicleCart,
                count_total: state.count_total + 1,
                // count_incomplete: state.count_incomplete + 1,
                next_id: state.next_id + 1
            };
        }, this.setStateCallback);
    }
    renderVehicle() {
        return (
            this.state.vehicleList.map((option, index)=>{
                // console.log(option);
                return(
                    <Card
                    vehicle={option}
                    key={index}
                    addToCart={this.addToCart.bind(this, option)}
                    />);
            })
        )
    }

    render() {
        return (
            <div className={"CatalogContainer"}>
            <div className="CatalogFilterDiv">
            <Filter />
            </div>
            <div className="CatalogCardsDiv">
            {this.renderVehicle()}
            </div>
            </div>
          );
    }
}

export default Catalog;
