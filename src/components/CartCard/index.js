import React from 'react';
// import _ from 'lodash';
import { withRouter} from "react-router-dom";
import autoBind from 'react-autobind';


import './style.css';


import Button from '../Button';
import IconText from '../IconText';
import capaciryImg from '../../images/capacity.png';
import doorsImg from '../../images/doors.png';
import transmissionImg from '../../images/transmission.png';
// import ferrari from '../../images/make/logo-scuderia-ferrari.svg';
import yearImg from '../../images/year.png';
class CartCard extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    viewDetails() {
        this.props.history.push(`/vehicle/${this.props.vehicle._id}`);
    }
    render() {
        console.log(this.props);
        // import logo from `/src/images/make/${vehicle.make}.png`
        const { vehicle } = this.props;
        var img = require(`../../images/make/${vehicle.make}.png`);
        return (
            <div className={"VehicleCard"}>
                <div className="VehicleCardHeader">
                    <img src={`data:image/jpeg;base64,${vehicle.mainImg.image}`} alt="Vehicle" className={"VehicleCardImage"} />
                </div>
                <div className="VehicleCardBody">
                    <div className="ModelText">{vehicle.model} </div>
                    <IconText text={vehicle.make} imgUrl={img} />
                    <IconText text={vehicle.year} imgUrl={yearImg} />
                    <IconText text={vehicle.seats} imgUrl={capaciryImg} />
                    <IconText text={vehicle.doors} imgUrl={doorsImg} />
                    <IconText text={vehicle.transmission} imgUrl={transmissionImg} />
                </div>
                <hr className="VerticalHr" />
                <div className="VehicleCardFooter">
                    <Button title={"View Details"} id={"viewDetailsButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { this.viewDetails() }} />
                    <Button title={"Buy Now"} id={"buyNowButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { console.log('here') }} />
                    <Button title={"Add to Cart"} id={"addToCartButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => this.props.addToCart(this.props.index)} />
                </div>
            </div>
        );
    }
}

export default withRouter(CartCard);





