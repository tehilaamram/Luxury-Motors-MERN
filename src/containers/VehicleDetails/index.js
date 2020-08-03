import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import AjaxService from '../../services/AjaxService';
import Button from '../../components/Button';
import ImageGallery from '../../components/ImageGallery';
import Table from '../../components/Table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ImageViewer from '../../components/ImageViewer';
import Rating from '@material-ui/lab/Rating';
import Comment from '../../components/Comment';
class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {
        model: '',
        maker: '',
        year: 2020,
        color: '',
        transmission: '',
        seats: '',
      },
      imageList: [],
      imgV: [],
      selectedTab: 1,
      quantityToOrder: 0,
      totalQuantity: 5,
    }
    autoBind(this);
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    AjaxService.get(`/vehicle/getVehicle/${params.id}`).then((res) => {
      var imgList = [];
      if (res.data.vehicle.mainImg !== undefined) {
        imgList.push({
          original: `data:image/jpeg;base64,${res.data.vehicle.mainImg.image}`,
          thumbnail: `data:image/jpeg;base64,${res.data.vehicle.mainImg.image}`,
          sizes: "(min-width: 900px) 100px",
        });
      }
      res.data.vehicle.additionalImg.forEach(element => {
        imgList.push({
          original: `data:image/jpeg;base64,${element.image}`,
          thumbnail: `data:image/jpeg;base64,${element.image}`,
          sizes: "(min-width: 900px) 100px",
        });
      });
      this.setState({
        vehicle: res.data.vehicle,
        imageList: imgList,
        imgV: [res.data.vehicle.mainImg, ...res.data.vehicle.additionalImg],
      });

    }).catch((err) => {

    });
  }
  tabChanges(event, selectedTab) {
    event.preventDefault();
    if (selectedTab === undefined) {
      this.setState({
        selectedTab: 0,
      });
    } else {
      this.setState({ selectedTab });
    }
  }
  renderOverview() {
    return (
      <Table vehicle={this.state.vehicle} />
    );
  }
  renderCustomersReview() {
    return (
      <div className="comments-container">
        <div className="vehicle-rate-details">
          <ul className="vehicle-rate-list">
            <li >
              <span className="vehicle-rate-title">5 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: "88.0%" }}></b>
              </span>
              <span className="vehicle-rate-number">88%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">4 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: "88.0%" }}></b>
              </span>
              <span className="vehicle-rate-number">88%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">3 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: "88.0%" }}></b>
              </span>
              <span className="vehicle-rate-number">88%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">2 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: "88.0%" }}></b>
              </span>
              <span className="vehicle-rate-number">88%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">1 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: "0.0%" }}></b>
              </span>
              <span className="vehicle-rate-number">88%</span>
            </li>
          </ul>
        </div>
        <div className="feedback-container">
          <Comment/>
          </div>
      </div>
    );
  }
  renderSpecifications() {
    const { vehicle } = this.state;
    return (
      <div className="specifications-container">
        <ul className="vehicle-specs-list">
          <li className="vehicle-specs-list-li">
            <span className="property-title">Maker: </span>
            <span className="property-specs"> {vehicle.maker} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Model: </span>
            <span className="property-specs">{vehicle.model} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Color: </span>
            <span className="property-specs">{vehicle.color} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Year: </span>
            <span className="property-specs">{vehicle.year} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Transmission: </span>
            <span className="property-specs">{vehicle.transmission} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Seats: </span>
            <span className="property-specs">{vehicle.seats} </span>
          </li>
          <li className="vehicle-specs-list-li">
            <span className="property-title">Doors: </span>
            <span className="property-specs">{vehicle.doors} </span>
          </li>
        </ul>
      </div>
    );
  }
  renderTab(index) {
    switch (index) {
      case 0:
        return this.renderOverview();
      case 1:
        return this.renderCustomersReview();
      case 2:
        return this.renderSpecifications();
      default:
        return this.renderOverview();
    }
  }
  quantityPlus(event) {
    if (this.state.quantityToOrder < this.state.totalQuantity) {
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
    const { selectedTab, vehicle } = this.state;
    return (
      <div className={"VehicleDetailsContainer"}>
        <div className="vehicle-main">
          <div className="vehicle-main-wrap">
            <div className="VehicleDetailsImagesContainer">
              <ImageViewer images={this.state.imgV} />
            </div>
            <div className="DetailsVehicleDetailsContainer">
              <div className="vehicle-title">
                <h1> {vehicle.maker} {vehicle.model} {vehicle.year}</h1>
              </div>
              <div className="vehicle-details-review">
                <Rating id="rating" name="read-only" value={3} readOnly />
                <span className="rating-avg">3.5</span>
                <span className="review-details">80 Reviews</span>
                <span className="review-details">80 orders</span>
              </div>
              <div className="split-line-thin" />
              <div className="vehicle-price">
                <span className="current-vehicle-price"> 180$ </span>
              </div>
              <div className="split-line-thin" />
              <div className="vehicle-quantity">
                <div className="vehicle-quantity-title">
                  Quantity:
                  </div>
                <span className="plus-minus-quantity">
                  <Button css={"rounded-plus"} title={"-"} id={"minus"} onClick={this.quantityMinus} />
                  <span className="quantity-to-order">{this.state.quantityToOrder}</span>
                  <Button css={"rounded-plus"} title={"+"} id={"plus"} onClick={this.quantityPlus} />
                </span>
                <div className="vehicle-quantity-info">
                  <span className="quantity-available">{this.state.totalQuantity} avaiable</span>
                </div>
              </div>
              <div className="vehicle-actions">
                <Button css={"PrimaryButton"} width={"w150px"} title={"Buy Now"} onClick={this.save} />
                <Button css={"PrimaryButton"} title={"Add to Cart"} width={"w150px"} onClick={this.save} />

              </div>
            </div>
          </div>
        </div>
        <div className="VehicleDetailsButtons">
          <div className={"vehicle-tabs-container"}>
            <Tabs
              value={selectedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.tabChanges}
              aria-label="disabled tabs example"
            // variant="fullWidth"
            >
              <Tab label="OverView" />
              <Tab label="Customers Reviews" />
              <Tab label="Specifications" />
            </Tabs>
            <div className="TabContentDiv">
              {this.renderTab(selectedTab)}
            </div>
          </div>
          {/* <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} /> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default VehicleDetails;