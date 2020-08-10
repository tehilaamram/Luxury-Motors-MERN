import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import _ from 'lodash';
import './style.css';
import CartItem from '../../components/CartItem';
import AjaxService from '../../services/AjaxService';
import { connect } from 'react-redux';
import { sub } from '../../redux/Cart/actions';

import emptyCartImage from '../../images/empty_cart.png';

class Cart extends React.Component {
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
        console.log(this.state.vehicleList, ' vehicle cart update cookie');
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        console.log('in cookie');
        this.cookies.set('vehicles', this.state.vehicleCart, { path: '/', expires: date });
    }
    removeFromCart(key) {
        console.log(key, ' key')
        // console.log(event, ' event');
        this.setState(function(state, props){
            var newCart = _.remove(this.state.vehicleCart, function(n) {
                return n.vehicle !== key._id;
              });
              var newList = _.remove(this.state.vehicleList, function(n) {
                  console.log(n, ' n')
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
    render() {
        return (
            <div className={"CatalogContainer"}>
                {/* <div> */}
                {this.state.vehicleList.length === 0 ? 
                     <div>
                    <img src={emptyCartImage} className="empty-cart-image"/>
                    </div> : <div> </div>
                }
                {/* </div> */}
            {(this.state.vehicleList).map((option, index)=>{
                return(
                    <CartItem
                    vehicle={option}
                    key={index}
                    index={index}
                    removeFromCart={this.removeFromCart.bind(this, option)}
                    />);
            })}
            </div>
          );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    // catalogFilter: state.catalogFilter,
});

const mapDispatchToProps = {
    onSub: sub,
    // onAddTransmission: addTransmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// export default Cart;
