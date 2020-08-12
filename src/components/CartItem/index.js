import React from 'react';
// import _ from 'lodash';
import { withRouter } from "react-router-dom";
import autoBind from 'react-autobind';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import Button from '../../components/Button';

import './style.css';


// import Button from '../Button';
import IconText from '../IconText';
import capaciryImg from '../../images/capacity.png';
import doorsImg from '../../images/doors.png';
import transmissionImg from '../../images/transmission.png';
// import ferrari from '../../images/make/logo-scuderia-ferrari.svg';
import yearImg from '../../images/year.png';

const useStyles = ((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


class CartItem extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            quantityToOrder: this.props.quantityToOrder,
        };
        console.log(this.props, " this.props");
    }
    viewDetails() {
        this.props.history.push(`/vehicle/${this.props.vehicle._id}`);
    }
    quantityPlus(event) {
        if (this.state.quantityToOrder < this.props.vehicle.quantity) {
            this.setState({
                quantityToOrder: this.state.quantityToOrder + 1,
            });
        }
    }
    quantityMinus(event) {
        if (this.state.quantityToOrder > 0) {
            this.setState({
                quantityToOrder: this.state.quantityToOrder - 1,
            });
        }
    }
    render() {
        // import logo from `/src/images/make/${vehicle.make}.png`
        const { vehicle } = this.props;
        var img = require(`../../images/make/${vehicle.maker}.png`);
        return (
            <div className={"CartItem"}>
                <div className="VehicleCardHeader">
                    <img src={`data:image/jpeg;base64,${vehicle.mainImg.image}`} alt="Vehicle" className={"CartItemImage"} />
                </div>
                <div className="VehicleCardBody">
                    <div className="ModelText">{vehicle.model} </div>
                    <IconText text={vehicle.maker} imgUrl={img} />
                    <IconText text={vehicle.year} imgUrl={yearImg} />
                    <IconText text={vehicle.seats} imgUrl={capaciryImg} />
                    <IconText text={vehicle.doors} imgUrl={doorsImg} />
                    <IconText text={vehicle.transmission} imgUrl={transmissionImg} />
                </div>
                <div className="VehicleCardBody">
                    <div className="cart-quantity">
                        <div className="cart-quantity-title">
                            Quantity:
                  </div>
                        <span className="plus-minus-quantity">
                            <Button css={"rounded-plus"} title={"-"} id={"minus"} onClick={this.quantityMinus} />
                            <span className="quantity-to-order">{this.state.quantityToOrder}</span>
                            <Button css={"rounded-plus"} title={"+"} id={"plus"} onClick={this.quantityPlus} />
                        </span>
                        <div className="cart-quantity-info">
                            <span className="quantity-available">{vehicle.quantity} avaiable</span>
                        </div>
                    </div>
                    </div>
                    <div className="VehicleCardBody">
                    <div className="cart-price">
                        <div className="cart-price-title">
                            Price:
                  </div>
                        <span className="cart-vehicle-price">
                            <span className="cart-vehicle-total-price">{Number(vehicle.price * this.state.quantityToOrder).toLocaleString()} $</span>
                        </span>
                    </div>
                    {/* <div className="cart-vehicle-price">
                <span className="current-vehicle-price"> 180$ </span>
              </div> */}
                </div>
                <div className="VehicleCardFooter">
                    <IconButton aria-label="delete" color="primary" onClick={this.props.removeFromCart}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}
export default withRouter(withStyles(useStyles)(CartItem));





