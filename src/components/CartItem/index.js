import React from 'react';
// import _ from 'lodash';
import { withRouter} from "react-router-dom";
import autoBind from 'react-autobind';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";

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
    }
    viewDetails() {
        this.props.history.push(`/vehicle/${this.props.vehicle._id}`);
    }
    render() {
        // import logo from `/src/images/make/${vehicle.make}.png`
        const { vehicle, classes} = this.props;
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
                {/* <hr className="VerticalHr" /> */}
                <div className="VehicleCardFooter">
                <IconButton aria-label="delete" color="primary">
  <CloseIcon />
</IconButton>
                </div>
            </div>
        );
    }
}
export default withRouter(withStyles(useStyles)(CartItem));





