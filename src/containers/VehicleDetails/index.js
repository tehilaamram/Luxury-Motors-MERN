import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import AjaxService from '../../services/AjaxService';
import Button from '../../components/Button';
import ImageGallery from '../../components/ImageGallery';
import Table from '../../components/Table';
class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {
        model: '',
        make: '',
        year: 2020,
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
  render() {
    console.log(this.state, ' state');
    return (
      <div className={"VehicleDetailsContainer"}>
      <div className="DetailsVehicleDetailsContainer">
         <Table vehicle={this.state.vehicle}/>
        </div>
      <div className="VehicleDetailsImagesContainer">
        <ImageGallery imageList={this.state.imageList}/>
        </div>
        <div className="VehicleDetailsButtons">
          <div className="SaveBottonAddVehicle">
            <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} />
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleDetails;