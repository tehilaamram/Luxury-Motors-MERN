import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import AjaxService from '../../services/AjaxService';
import Button from '../../components/Button';
import ImageGallery from '../../components/ImageGallery';
import Table from '../../components/Table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {
        model: '',
        make: '',
        year: 2020,
        selectedTab: 0,
      },
      imageList: [],
    }
    autoBind(this);
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    AjaxService.get(`/vehicle/getVehicle/${params.id}`).then((res) => {
      console.log(res.data.vehicle);
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
      });

    }).catch((err) => {

    });
  }
  tabChanges(event, selectedTab) {
    event.preventDefault();
    this.setState({ selectedTab });
    console.log(selectedTab, ' event');

}
  renderOverview() {
    return (
      <Table vehicle={this.state.vehicle} />
    );
  }
  renderTab(index) {
    switch (index) {
        case 0:
            return this.renderOverview();
        case 1:
            return this.renderCustomersReview();
        default:
            return;
    }
}
  render() {
    const { selectedTab } = this.state;
    console.log(this.state, ' state');
    return (
      <div className={"VehicleDetailsContainer"}>
        
        <div className="VehicleDetailsImagesContainer">
          <ImageGallery imageList={this.state.imageList} />
        </div>
        <div className="DetailsVehicleDetailsContainer">
          <Table vehicle={this.state.vehicle} />
        </div>
        <div className="VehicleDetailsButtons">
          {/* <div className="SaveBottonAddVehicle"> */}
          <div className={"ManageRoomsContainer"}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.tabChanges}
                aria-label="disabled tabs example"
                variant="fullWidth"
            >
                <Tab label="OverView" />
                <Tab label="Customers Reviews" />
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