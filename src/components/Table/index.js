import React from 'react';
import './style.css';

class Table extends React.Component {
    render() {
        const {vehicle} = this.props;
        return (
            <table>
            <tbody>
              <tr>
                <td>Model</td>
                <td>{vehicle.model}</td>
              </tr>
              <tr>
                <td>Maker</td>
                <td>{vehicle.maker}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{vehicle.year}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td><div style={{display: 'flex'}}><div style={{backgroundColor: vehicle.color, borderRadius: "50%", height: '30px', width: '30px'}}/> <div className="TableColorText">{vehicle.color}</div> </div></td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>{vehicle.transmission}</td>
              </tr>
              <tr>
                <td>Seats</td>
                <td>{vehicle.seats}</td>
              </tr>
              <tr>
                <td>Doors</td>
                <td>{vehicle.doors}</td>
              </tr>
            </tbody>
          </table>
        );
    }
}

export default Table;