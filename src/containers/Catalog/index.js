import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import { add } from '../../redux/Cart/actions';
import { connect } from 'react-redux';
import Card from '../../components/VehicleCard';
import Filter from '../../components/Filter';
import AjaxService from '../../services/AjaxService';
import './style.css';

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
                new_vehicle_value: '',
                transmissionFilter: [],
            };
        } else {
            this.state = {
                vehicleCart: [],
                vehicleList: [],
                count_total: 0,
                next_id: 0,
                new_vehicle_value: '',
                transmissionFilter: [],
            };
        }
        autoBind(this);
    }
    componentDidMount() {
        AjaxService.get('/vehicle/getAll').then((res) => {
            const temp = [];
            res.data.forEach((item) => {
                if (item.status && item.quantity !== 0)
                    temp.push(item);
            });
            this.setState({
                vehicleList: temp,
            });
        }).catch((err) => {
        });
    }
    setStateCallback() {
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        this.cookies.set('vehicles', this.state.vehicleCart, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    }


    addToCart(event) {
        this.setState(function (state, props) {
            if (event === undefined) {
                return { new_vehicle_value: '' };
            }
            else {
                const isInCart = this.state.vehicleCart.filter(element => element.vehicle === event._id)
                if (isInCart.length > 0) {
                    return;
                }
            }
            state.vehicleCart[state.next_id] = { id: state.next_id, vehicle: event._id };
            this.props.onAdd();
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
        );
    }
    renderFilter() {
        return (
            <div>
                < Filter subject={"Transmission"} list={['Automatic', 'Manual']} filter={"transmission"} />
                < Filter subject={"Maker"} list={['Ferrari', 'Porsche']} filter={"maker"} />
                < Filter subject={"Year"} list={['2020', '2019', '2018', '2017', '2016']} filter={"year"} />
                < Filter subject={"Doors"} list={['2', '4']} filter={"doors"} />
                < Filter subject={"Seats"} list={['2', '3', '4', '5', '6']} filter={"seats"} />
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
                    {this.state.vehicleList.map((option, index) => {
                        return (
                            <Card
                                vehicle={option}
                                key={index}
                                addToCart={this.addToCart.bind(this, option)}
                                visible={this.state.transmissionFilter.length > 0 && this.state.transmissionFilter.includes(option.transmission)}
                            />);
                    })}
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
