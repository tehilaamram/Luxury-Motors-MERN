import React from 'react';
import autoBind from 'react-autobind';
import DataGrid, { Column, Scrolling ,Summary, TotalItem } from 'devextreme-react/data-grid';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import paymentImg from '../../images/payment.png';
import AjaxService from '../../services/AjaxService';

import './style.css';

class AllOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            orders: [],
        }
        console.log('in order history')
        autoBind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        AjaxService.get('/order/getAll').then((res) => {
          console.log('user orders response')
          console.log(res)
          this.setState({
            orders: res.data.list
          })
        }).catch((err) => {
            this.props.history.push('/404');
        });
    }
     cellImageRender(data) {
         console.log(data,  'data')
        return <img alt="vehicle" className="buy-vehicle-image" src={`data:image/jpeg;base64,${data.data.vehicle.mainImg.image}`} />;
      }
      cellQuantityRender(data) {
        //   return
      }
      quantityCellValue(data) {
        //   console.log(data, ' quantity')
          return this.props.location.state.list[data._id].length;
      }
      priceCellValue(data) {
        // console.log(data, ' quantity')
        return Number(this.props.location.state.list[data._id].length * data.price);
        // .toLocaleString();
    }
      renderOrders(order) {
        console.log(order, ' order in table')
        return (
            <DataGrid
            key={order._id}
             id="gridContainer"
            dataSource={order.vehicles}
            showBorders={true}
            columnAutoWidth={true}
            columnMinWidth={100}
            columnResizingMode={'nextColumn'}
            showRowLines={true}
            rowAlternationEnabled={true}
          >
            <Column dataField="vehicle.mainImg"
            caption=""
            cellRender={this.cellImageRender}
            />
            <Column dataField="vehicle.maker"
            caption="Maker"
            />
            <Column dataField="vehicle.model"
            caption="Model"
            />
            <Column dataField="vehicle.year"
            caption="Year"
            />
            <Column dataField="vehicle.color"
            caption="Color"
            />
            <Column dataField="quantity"
            caption="Quantity"
            />
            <Column dataField="price"
            caption="Price"
            format="currency"
            />
            <Summary>
            <TotalItem
              column="price"
              summaryType="sum"
              valueFormat="currency"
              displayFormat={'Sum: {0}'}

               />
               <TotalItem
               valueFormat="currency"
               displayFormat={`Date: ${new Date(order.date).toLocaleString()}`}
               showInColumn="price" />
               <TotalItem
                valueFormat="currency"
                displayFormat={`Order Number: ${order._id}`}
                showInColumn="price" />
                <TotalItem
                valueFormat="currency"
                displayFormat={`Name: ${order.user.fullName}`}
                showInColumn="price" />
                <TotalItem
                valueFormat="currency"
                displayFormat={`Email: ${order.user.username}`}
                showInColumn="price" />
          </Summary>
            <Scrolling columnRenderingMode="virtual" />
          </DataGrid>
        );
      }
    render() {
        return (
            <div className="orders-history-main">
            {this.state.orders.map((element, index) => {
                return this.renderOrders(element);
            })}
            </div>
          );
    }
}
export default AllOrders;
