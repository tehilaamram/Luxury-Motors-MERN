import React from 'react';
import _ from 'lodash';
import autoBind from 'react-autobind';
import AjaxService from '../../services/AjaxService';
import Button from '../../components/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ImageViewer from '../../components/ImageViewer';
import Rating from '@material-ui/lab/Rating';
import Comment from '../../components/Comment';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from 'react-redux';
import { addMany } from '../../redux/Cart/actions';
import { Cookies } from 'react-cookie';
import { ROLE } from '../../helpers/consts';

import './style.css';
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
        comments: [],
        quantity: 0,
        _id: '',
        orders: [],
      },
      imageList: [],
      imgV: [],
      selectedTab: 0,
      quantityToOrder: 0,
      comment: '',
      postRate: 1,
    }
    this.cookies = new Cookies();
    autoBind(this);
  }
  componentDidMount() {
    console.log("role ", this.props.user.role)
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
      console.log(res.data.vehicle, ' vehicle details print ')
      res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
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
  postComment() {
    const commentToPost = document.getElementById("user-comment-post").value;
    // AjaxService.post('/comment/new')
    AjaxService.post('/comment/new', {
      vehicle: this.state.vehicle._id,
      text: commentToPost,
      rate: this.state.postRate,
      // comment: commentToPost,
  }).then((res) => {
    console.log(res, ' res');
          if (res.data.status === 200) {
              console.log('comment posted');
              document.getElementById("user-comment-post").value = "";
              res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
              this.setState({
                postRate: 1,
                vehicle: res.data.vehicle,
              });
          } else {
            console.log('comment post error check out')
              // alert(res.data.error.errmsg);
          }
      }).catch((err) => {
        console.log('error with post comment', err, err.response.status);
      });
    console.log(commentToPost);
  }

  rateChange(event, postRate) {
    this.setState({postRate});
  }
  onDislikeChange(event) {
    console.log(event, ' event')
    if(event.dislike.includes(this.props.user.id)) {
      AjaxService.post('/comment/removeDislike', {
        comment: event._id,
        vehicle: event.vehicle,
      }).then((res) => {
        if(res.data.status === 200) {
          res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
              this.setState({
                // postRate: 1,
                vehicle: res.data.vehicle,
              });
        }
      }).catch((err) => {
        console.log('remove dislike error ', err);
      });
    } else {
      console.log('in else')
      AjaxService.post('/comment/addDislike', {
        comment: event._id,
        vehicle: event.vehicle,
      }).then((res) => {
        if(res.data.status === 200) {
          res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
              this.setState({
                // postRate: 1,
                vehicle: res.data.vehicle,
              });
        }
      }).catch((err) => {
        console.log('add dislike error ', err);
      });
    }
  }
  onLikeChange(event) {
    console.log(event, ' event')
    if(event.like.includes(this.props.user.id)) {
      AjaxService.post('/comment/removeLike', {
        comment: event._id,
        vehicle: event.vehicle,
      }).then((res) => {
        if(res.data.status === 200) {
          res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
              this.setState({
                // postRate: 1,
                vehicle: res.data.vehicle,
              });
        }
      }).catch((err) => {
        console.log('remove like error ', err);
      });
    } else {
      console.log('in else')
      AjaxService.post('/comment/addLike', {
        comment: event._id,
        vehicle: event.vehicle,
      }).then((res) => {
        if(res.data.status === 200) {
          res.data.vehicle.comments = _.reverse(res.data.vehicle.comments);
              this.setState({
                // postRate: 1,
                vehicle: res.data.vehicle,
              });
        }
      }).catch((err) => {
        console.log('add like error ', err);
      });
    }
  }
  addToCart() {
    let date = new Date();
    date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
    // console.log('in cookie');
    var arrayToCookie = [];
    for(var i=0; i< this.state.quantityToOrder; i++) {
      arrayToCookie.push({
        id: i,
        vehicle: this.state.vehicle._id,
      });
    }
    this.cookies.set('vehicles', arrayToCookie, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    this.props.onAddMany(this.state.quantityToOrder);
  }
  buy() {
    var currentVehicle = this.state.vehicle._id;
    var list = '{ "' + currentVehicle.toString() + '":[';
    //  + '[' + 8 + ']}';
    for(var i=0; i< this.state.quantityToOrder; i++) {
      if (i === 0) {
        list += 8;
      } else {
        list += ',' + 8;
      }
    }
    // if (this.state.quantityToOrder > 0) {
      list += ']}'
    // } else 
    this.props.history.push({ pathname: '/buy', state: { vehicles: [this.state.vehicle], list: JSON.parse(list), fromCart: false } });
}
  renderCustomersReview() {
    var rateArray = _.groupBy(this.state.vehicle.comments, (item) => {
      return item.rate;
    });
    // console.log(_.groupBy(this.state.vehicle.comments, (item) => {
    //   return item.rate;
    // }));
    console.log(rateArray[4], ' array 4 length', rateArray[5])
    if (rateArray[4] !== undefined) {
      console.log(rateArray[4].length, ' 4 len')
    }
    return (
      <div className="comments-container">
        <div className="vehicle-rate-details">
          <ul className="vehicle-rate-list">
            <li >
              <span className="vehicle-rate-title">5 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: String(rateArray[5] === undefined ? 0 : Number(100 * rateArray[5].length/this.state.vehicle.comments.length).toPrecision(4)) + "%"}}></b>
              </span>
    <span className="vehicle-rate-number">{rateArray[5] === undefined ? 0 : Number(100 * rateArray[5].length/this.state.vehicle.comments.length).toPrecision(4)}%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">4 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: String(rateArray[4] === undefined ? 0 : Number(100 * rateArray[4].length/this.state.vehicle.comments.length).toPrecision(4)) + "%"}}></b>
              </span>
    <span className="vehicle-rate-number">{rateArray[4] === undefined ? 0 : Number(100 * rateArray[4].length/this.state.vehicle.comments.length).toPrecision(4)}%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">3 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: String(rateArray[3] === undefined ? 0 : Number(100 * rateArray[3].length/this.state.vehicle.comments.length).toPrecision(4)) + "%" }}></b>
              </span>
    <span className="vehicle-rate-number">{rateArray[3] === undefined ? 0 : Number(100 * rateArray[3].length/this.state.vehicle.comments.length).toPrecision(4)}%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">2 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: String(rateArray[2] === undefined ? 0 : Number(100 * rateArray[2].length/this.state.vehicle.comments.length).toPrecision(4)+ "%") }}></b>
              </span>
    <span className="vehicle-rate-number">{rateArray[2] === undefined ? 0 : Number(100 * rateArray[2].length/this.state.vehicle.comments.length).toPrecision(4)}%</span>
            </li>
            <li >
              <span className="vehicle-rate-title">1 Stars</span>
              <span className="vehicle-rate-graph">
                <b className="vehicle-graph-scroller" style={{ width: String(rateArray[1] === undefined ? 0 : Number(100 * rateArray[1].length/this.state.vehicle.comments.length).toPrecision(4)+"%") }}></b>
              </span>
    <span className="vehicle-rate-number">{rateArray[1] === undefined ? 0 : Number(100 * rateArray[1].length/this.state.vehicle.comments.length).toPrecision(4)}%</span>
            </li>
          </ul>
        </div>
        <div className="feedback-container">
          { (this.props.user.role !== ROLE.GUEST &&this.props.user.role !== null ) && <div className="vehicle-new-comment">
            <div className="vehicle-new-comment-header">
            <span className="comment-post-title">Add Comment </span>
            <div className="comment-post-rating">
            <Rating
            value={this.state.postRate}
          name="customized-empty"
          defaultValue={1}
          precision={1}
          onChange={this.rateChange}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
              </div>
              </div>
              <div>
            <textarea rows="4" className="comment-text-to-post" id="user-comment-post"></textarea>
            </div>
            <div className="comment-post-buttons">
            <Button title={"Post"} onClick={this.postComment} css={"PrimaryButton"} width={"w100px"}/>
              </div>
          </div>}
          <div className="vehicle-comments-list">
            {
              this.state.vehicle.comments.map((element, index) => {
                return (
                  <Comment key={index}
                  name={element.user.username}
                  date={element.date}
                  text={element.text}
                  like={element.like}
                  dislike={element.dislike}
                  rate={element.rate}
                  id={element._id}
                  dislikeChange={this.onDislikeChange.bind(this, element)}
                  likeChange={this.onLikeChange.bind(this, element)}
                  />
                )
              })
            }
          </div>
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
        return this.renderCustomersReview();
      case 1:
        return this.renderSpecifications();
      default:
        return this.renderOverview();
    }
  }
  quantityPlus(event) {
    if (this.state.quantityToOrder < this.state.vehicle.quantity) {
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
    var rateAvg = 0;
    this.state.vehicle.comments.forEach(comment => {
      rateAvg += comment.rate;
    });
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
                <Rating id="rating" name="read-only" value={vehicle.comments.length === 0 ? 0 : rateAvg/vehicle.comments.length} readOnly />
    <span className="rating-avg">{vehicle.comments.length === 0 ? 0 : Number(rateAvg/vehicle.comments.length).toPrecision(3)}</span>
                <span className="review-details">{vehicle.comments.length} Reviews</span>
                <span className="review-details">{vehicle.orders.length} orders</span>
              </div>
              <div className="split-line-thin" />
              <div className="vehicle-price">
    <span className="current-vehicle-price"> {Number(vehicle.price).toLocaleString()} $ </span>
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
                  <span className="quantity-available">{vehicle.quantity} avaiable</span>
                </div>
              </div>
              <div className="vehicle-actions">
                <Button css={"PrimaryButton"} width={"w150px"} title={"Buy Now"} onClick={this.buy} />
                <Button css={"PrimaryButton"} title={"Add to Cart"} width={"w150px"} onClick={this.addToCart} />

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
            >
              <Tab label="Customers Reviews" />
              <Tab label="Specifications" />
            </Tabs>
            <div className="TabContentDiv">
              {this.renderTab(selectedTab)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = {
  onAddMany: addMany,
  // onAdd: add,
  // onAddTransmission: addTransmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetails);
// export default VehicleDetails;