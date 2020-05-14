import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
// import _ from 'lodash';
import './style.css';
import Card from '../../components/CartCard';
import AjaxService from '../../services/AjaxService';

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let oldVehicleCart = this.cookies.get('vehicles');
        console.log(oldVehicleCart, ' cart');
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
        AjaxService.get('/vehicle/getVehiclesById/', {
            params: 
            {
                vid: this.state.vehicleCart,
        }}).then((res) => {
            console.log(res, ' res get all vehicles');
            this.setState({
                vehicleList: res.data.list,
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
    }
    removeFromCart(key) {
        console.log(key)
        // console.log(event, ' event');
        this.setState(function(state, props){
            // var newCart = _.remove(this.state.vehicleCart, function(n) {
            //     console.log(n.vehicle === event._id);
            //     console.log(event._id)
            //     return n.vehicle !== event._id;
            //   });
            delete state.vehicleCart[key];
            delete state.vehicleList[key];
            //   console.log(newCart, 'new Cart')
            return {
                vehicleCart: state.vehicleCart,
                vehicleList: state.vehicleList,
                count_total: state.count_total - 1,
                // count_incomplete: state.count_incomplete + (is_completed ? 0 : -1)
            };
        }, this.setStateCallback);
    }
    renderItems() {
        return (
            Object.values(this.state.vehicleCart).map((option, index)=>{
                // console.log(option);
                return(
                    <Card
                    vehicle={option}
                    key={index}
                    index={index}
                    addToCart={this.removeFromCart.bind(this, option)}
                    />);
            })
        )
    }

    render() {
        return (
            <div className={"CatalogContainer"}>
            {(this.state.vehicleList).map((option, index)=>{
                return(
                    <Card
                    vehicle={option}
                    key={index}
                    index={index}
                    addToCart={this.removeFromCart.bind(this)}
                    />);
            })}
            </div>
          );
    }
}

export default Catalog;
