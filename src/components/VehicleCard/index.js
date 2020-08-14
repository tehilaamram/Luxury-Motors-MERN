import React from 'react';
import { withRouter } from "react-router-dom";
import autoBind from 'react-autobind';
import { connect } from 'react-redux';


import './style.css';


import Button from '../Button';
import IconText from '../IconText';
import capaciryImg from '../../images/capacity.png';
import doorsImg from '../../images/doors.png';
import transmissionImg from '../../images/transmission.png';
import yearImg from '../../images/year.png';
class VehicleCard extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    viewDetails() {
        this.props.history.push(`/vehicle/${this.props.vehicle._id}`);
    }
    isDisplay() {
        const { vehicle } = this.props;
        return (
            ((this.props.catalogFilter.transmission.length > 0 && this.props.catalogFilter.transmission.includes(vehicle.transmission)) ||
                (this.props.catalogFilter.transmission.length === 0)) &&
            ((this.props.catalogFilter.maker.length > 0 && this.props.catalogFilter.maker.includes(vehicle.maker)) ||
                (this.props.catalogFilter.maker.length === 0)) &&
            ((this.props.catalogFilter.year.length > 0 && this.props.catalogFilter.year.includes(vehicle.year.toString())) ||
                (this.props.catalogFilter.year.length === 0)) &&
            ((this.props.catalogFilter.doors.length > 0 && this.props.catalogFilter.doors.includes(vehicle.doors.toString())) ||
                (this.props.catalogFilter.doors.length === 0)) &&
            ((this.props.catalogFilter.seats.length > 0 && this.props.catalogFilter.seats.includes(vehicle.seats.toString())) ||
                (this.props.catalogFilter.seats.length === 0))
        )
    }
    buy() {
        var currentVehicle = this.props.vehicle._id;
        var list = '{ "' + currentVehicle.toString() + '":' + '[' + 8 + ']}';
        this.props.history.push({ pathname: '/buy', state: { vehicles: [this.props.vehicle], list: JSON.parse(list), fromCart: false } });
    }
    render() {
        const { vehicle } = this.props;
        var img = require(`../../images/make/${vehicle.maker}.png`);
        return (
            <div className={"VehicleCard"} style={{ display: this.isDisplay() ? 'flex' : 'none' }}>
                <div className="VehicleCardHeader">
                    <img src={`data:image/jpeg;base64,${vehicle.mainImg.image}`} alt="Vehicle" className={"VehicleCardImage"} />
                </div>
                <div className="VehicleCardBody">
                    <div className="ModelText">{vehicle.model} </div>
                    <IconText text={vehicle.maker} imgUrl={img} />
                    <IconText text={vehicle.year} imgUrl={yearImg} />
                    <IconText text={vehicle.seats} imgUrl={capaciryImg} />
                    <IconText text={vehicle.doors} imgUrl={doorsImg} />
                    <IconText text={vehicle.transmission} imgUrl={transmissionImg} />
                </div>
                <hr className="VerticalHr" />
                <div className="VehicleCardFooter">
                    <Button title={"View Details"} id={"viewDetailsButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { this.viewDetails() }} />
                    <Button title={"Buy Now"} id={"buyNowButton"} css={"PrimaryButton VehicleCardButton"} onClick={this.buy} />
                    <Button title={"Add to Cart"} id={"addToCartButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { this.props.addToCart(vehicle.id) }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    catalogFilter: state.catalogFilter,
});


export default connect(mapStateToProps, {})(withRouter(VehicleCard));
