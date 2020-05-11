import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import TextLabel from '../../components/TextLabel';
import Button from '../../components/Button';
class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    const { vehicle } = this.props;
    return (
      <div className={"VehicleDetailsContainer"}>
        <div className="DetailsVehicleDetailsContainer">
          <TextLabel id={"model"} text={"Model"} value={vehicle.model} />
          <TextLabel id={"make"} text={"Make"} type={"text"} value={vehicle.make} />
        </div>
        <div className="VehicleDEtailsImagesContainer">
        </div>
        <div className="VehicleDetailsButton">
          <div className="SaveBottonAddVehicle">
            <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} />
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleDetails;