import React from 'react';
import './style.css';
import Card from '../../components/VehicleCard';
import CurrentIng from '../../images/home_page_vehicle.jpg';
class Catalog extends React.Component {
    render() {
        console.log()
        return (
            <div className={"CatalogContainer"}>
            <Card imgUrl={CurrentIng}/>
            </div>
          );
    }
}

export default Catalog;
