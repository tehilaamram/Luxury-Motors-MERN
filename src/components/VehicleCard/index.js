import React from 'react';
import _ from 'lodash';

import './style.css';


import Button from '../Button';
import IconText from '../IconText';
import capaciryImg from '../../images/capacity.png';
import doorsImg from '../../images/doors.png';
import transmissionImg from '../../images/transmission.png';
import ferrari from '../../images/make/logo-scuderia-ferrari.svg';
import yearImg from '../../images/year.png';
class VehicleCard extends React.Component {
    

    render() {
        return (
            <div className={"VehicleCard"}>
                <div className="VehicleCardHeader">
                    <img src={this.props.imgUrl} alt="Vehicle" className={"VehicleCardImage"} />
                </div>
                <div className="VehicleCardBody">
                    <div className="ModelText">Model </div>
                    <IconText text={"Make"} imgUrl={ferrari} />
                    <IconText text={"Year"} imgUrl={yearImg} />
                    <IconText text={"Capacity"} imgUrl={capaciryImg} />
                    <IconText text={"Doors"} imgUrl={doorsImg} />
                    <IconText text={"Transmission"} imgUrl={transmissionImg} />
                </div>
                <hr className="VerticalHr" />
                <div className="VehicleCardFooter">
                    <Button title={"View Details"} id={"addToCartButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { console.log('here') }} />
                    <Button title={"Buy Now"} id={"buyNowButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { console.log('here') }} />
                    <Button title={"Add to Cart"} id={"addToCartButton"} css={"PrimaryButton VehicleCardButton"} onClick={() => { console.log('here') }} />
                </div>
            </div>
        );
    }
}

export default VehicleCard;





