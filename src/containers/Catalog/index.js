import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import './style.css';
import { add } from '../../redux/Cart/actions';
import { connect } from 'react-redux';
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
    }


    addToCart(event) {
        console.log(event, ' event');
        this.setState(function (state, props) {
            console.log(state, ' state');
            if (event === undefined) {
                return { new_vehicle_value: '' };
            }
            state.vehicleCart[state.next_id] = { id: state.next_id, vehicle: event._id };
            this.props.onAdd();
            console.log(state.vehicleCart, ' vehicle cart');
            return {
                new_vehicle_value: '',
                vehicleCart: state.vehicleCart,
                count_total: state.count_total + 1,
                next_id: state.next_id + 1
            };
        }, this.setStateCallback);
    }
    renderVehicle() {
        return (
            this.state.vehicleList.map((option, index) => {
                return (
                    <Card
                        vehicle={option}
                        key={index}
                        addToCart={this.addToCart.bind(this, option)}
                    />);
            })
        )
    }

    renderFilter() {
        return (
            <div>
            < Filter subject={"Transmission"} list={['Automatic', 'Manual']} />
            < Filter subject={"Maker"} list={['Ferrari', 'Porsche']} />
            < Filter subject={"Year"} list={['2020', '2019', '2018', '2017', '2016']} />
            < Filter subject={"Doors"} list={['2', '4']} />
            < Filter subject={"Seats"} list={['2', '3', '4', '5', '6']} />
            </div>
        );
    }

    render() {
        return (
            <div className={"CatalogContainer"}>
                <div className="CatalogFilterDiv">
                {this.renderFilter()}
                </div>
                <div className="CatalogCardsDiv">
                    {this.renderVehicle()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    onAdd: add,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
