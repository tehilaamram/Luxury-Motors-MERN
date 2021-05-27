import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import _ from 'lodash';
import CartItem from '../../components/CartItem';
import AjaxService from '../../services/AjaxService';
import { connect } from 'react-redux';
import { sub } from '../../redux/Cart/actions';
import Button from '../../components/Button';
import { withRouter } from "react-router-dom";
import emptyCartImage from '../../images/empty_cart.png';
import './style.css';

class Cart extends React.Component {
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
        AjaxService.get('/vehicle/getVehiclesById/', {
            params:
            {
                vid: this.state.vehicleCart,
            }
        }).then((res) => {
            this.setState({
                vehicleList: res.data.list,
            });
        }).catch((err) => {
        });
    }
    setStateCallback() {
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        this.cookies.set('vehicles', this.state.vehicleCart, { path: '/', expires: date });
    }
    removeFromCart(key) {
        this.setState(function (state, props) {
            let newCart = _.remove(this.state.vehicleCart, function (n) {
                return n.vehicle !== key._id;
            });
            let newList = _.remove(this.state.vehicleList, function (n) {
                return n._id !== key._id;
            });
            this.props.onSub();
            return {
                vehicleCart: newCart,
                vehicleList: newList,
                count_total: state.count_total - 1,
            };
        }, this.setStateCallback);
    }
    buy() {
        let vehicleArray = _.groupBy(this.state.vehicleCart, (item) => {
            return item.vehicle;
        });
        this.props.history.push({ pathname: '/buy', state: { vehicles: this.state.vehicleList, list: vehicleArray, fromCart: true } });
    }
    render() {
        let vehicleArray = _.groupBy(this.state.vehicleCart, (item) => {
            return item.vehicle;
        });
        return (
            <div className={"CatalogContainer"}>
                {this.state.vehicleList.length === 0 ?
                    <div>
                        <img src={emptyCartImage} className="empty-cart-image" alt={"empty cart"} />
                    </div> : <div className="cart-items-to-buy-main">{(this.state.vehicleList).map((option, index) => {
                        return (
                            <CartItem
                                vehicle={option}
                                key={index}
                                index={index}
                                removeFromCart={this.removeFromCart.bind(this, option)}
                                quantityToOrder={vehicleArray[option._id].length}
                            />);
                    })}
                        <div className="cart-buy">
                            <Button title={"Buy"} css={"PrimaryButton"} width={"w150px"} onClick={this.buy} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    onSub: sub,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));