import React from 'react';
import autoBind from 'react-autobind';
import DataGrid, { Column, Scrolling ,Summary, TotalItem } from 'devextreme-react/data-grid';
import AjaxService from '../../services/AjaxService';

import './style.css';

const statuses= [{
    index: 0,
    value: 'on hold',
}, {
    index: 1,
    value: 'pending supplier'
}, {
    index: 2,
    value: 'confirmed'
}, {
    index: 3,
    value: 'on process'
}, {
    index: 4,
    value: 'done'
}];

class OrdersHistory extends React.Component {
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
        AjaxService.get('/order/getUserOrders').then((res) => {
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
        return <img alt="vehicle" className="buy-vehicle-image" src={`data:image/jpeg;base64,${data.data.vehicle.mainImg.image}`} />;
      }
    getStatusIndex(status){
        let statusIndex = 0;
        statuses.forEach((item)=>{
            if(status.toLowerCase() === item.value)
                statusIndex= item.index;
        });
        return statusIndex;
    }
      cellTrackingRender(data) {
          console.log('tracking-----');
          console.log(data.data.status);
          // const statusIndex=4;
          const statusIndex= this.getStatusIndex(data.data.status);
          return (
              <div style={{flexDirection: 'row', display: 'flex'}}>
              <div className="tracking-progress-bar">
                  <div className={"tracking-progress-bar__item tracking-progress-bar__item--active"}/>

                  <span className={statusIndex>0?"tracking-progress-bar__item__bar tracking-progress-bar__item__bar--active": "tracking-progress-bar__item__bar"}/>
                  <div className={statusIndex>0?"tracking-progress-bar__item tracking-progress-bar__item--active": 'tracking-progress-bar__item'}/>

                  <span className={statusIndex>1?"tracking-progress-bar__item__bar tracking-progress-bar__item__bar--active": "tracking-progress-bar__item__bar"}/>
                  <div className={statusIndex>1?"tracking-progress-bar__item tracking-progress-bar__item--active": 'tracking-progress-bar__item'}/>

                  <span className={statusIndex>2?"tracking-progress-bar__item__bar tracking-progress-bar__item__bar--active": "tracking-progress-bar__item__bar"}/>
                  <div className={statusIndex>2?"tracking-progress-bar__item tracking-progress-bar__item--active": 'tracking-progress-bar__item'}/>

                  <span className={statusIndex>3?"tracking-progress-bar__item__bar tracking-progress-bar__item__bar--active": "tracking-progress-bar__item__bar"}/>
                  <div className={statusIndex>3?"tracking-progress-bar__item tracking-progress-bar__item--active": 'tracking-progress-bar__item'}/>

              </div>
                  <div style={{flexDirection: 'column', display: 'flex', paddingLeft: '12px', justifyContent: 'space-between'}}>
                      <div className='tracker-text'>On hold</div>
                      <div className='tracker-text'>Pending supplier</div>
                      <div className='tracker-text'>Confirmed</div>
                      <div className='tracker-text'>On process</div>
                      <div className='tracker-text'>Done</div>
                  </div>
              </div>
          );
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
            <Column dataField="order.vehicles[0].status"
                    caption="Tracking"
                    cellRender={this.cellTrackingRender}
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
                displayFormat={`Order status: ${order.vehicles[0].status}`}
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
export default OrdersHistory;
