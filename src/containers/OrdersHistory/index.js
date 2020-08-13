import React from 'react';
import autoBind from 'react-autobind';
import DataGrid, { Column, Scrolling ,Summary, TotalItem } from 'devextreme-react/data-grid';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import paymentImg from '../../images/payment.png';
import AjaxService from '../../services/AjaxService';

import './style.css';

class OrdersHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            orders: [],
        }
        autoBind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        AjaxService.get('/order/getUserOrders').then((res) => {

        }).catch((err) => {
            this.props.history.push('/404');
        });
    }
     cellRender(data) {
         console.log(data,  'data')
        return <img alt="vehicle" className="buy-vehicle-image" src={`data:image/jpeg;base64,${data.data.mainImg.image}`} />;
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
        return (
            <DataGrid id="gridContainer"
            dataSource={order}
            showBorders={true}
            columnAutoWidth={true}
            columnMinWidth={100}
            columnResizingMode={'nextColumn'}
          >
            <Column dataField="mainImg"
            caption=""
              allowSorting={false}
              cellRender={this.cellRender}
            />
            <Column dataField="maker"
              caption="Maker"
            />
            <Column dataField="model" caption="Model"/>
            <Column dataField="year" caption="Year"/>
            <Column dataField="quantity1" calculateCellValue={this.quantityCellValue} caption="Quantity" />
            <Column dataField="price" calculateCellValue={this.priceCellValue} caption="Price" format="currency" />
            <Summary>
            <TotalItem
              column="price"
              summaryType="sum"
              valueFormat="currency" />
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
export default OrdersHistory;
