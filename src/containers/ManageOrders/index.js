import React from 'react';

import DataGrid, {
    Column,
    Editing,
    Paging,
    Lookup,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import AjaxService from '../../services/AjaxService';
import './style.css';

const statuses = [{
    id: 0,
    r: 'On hold',
}, {
    id: 1,
    r: 'Pending supplier'
}, {
    id: 2,
    r: 'Confirmed'
}, {
    id: 3,
    r: 'On process'
}, {
    id: 4,
    r: 'Done'
}];
class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersList: [],
        }
    }
    componentDidMount() {
        this.getOrdersList();
    }
    getOrdersList() {
        AjaxService.get("/order/getAllOrders").then((res) => {
            this.setState({
                ordersList: res.data.list,
            });
        }).catch((err) => {
        });
    }
    updateDatabase(e) {
        const id = e.data.vehicles[0]._id;
        AjaxService.post('/order/update', {
            id: id, update: { status: e.data['vehicles[0]'].status },
        }).then((res) => {
            this.getOrdersList()
        }).catch((err) => {
        });
    }
    render() {
        return (
            <div id="data-grid-demo" className="ManageUserContainer">
                <DataGrid
                    dataSource={this.state.ordersList}
                    keyExpr="vehicles[0]._id"
                    showBorders={true}
                    columnAutoWidth={true}
                    columnMinWidth={100}
                    columnResizingMode={'widget'}
                    onRowUpdated={this.updateDatabase}
                >
                    <Paging enabled={false} />
                    <Editing
                        mode="form"
                        allowUpdating={true} />
                    <Column allowEditing={false} dataField="_id" caption="Order id" />
                    <Column allowEditing={false} dataField="date" caption="Order date"
                        dataType={'datetime'}
                    />
                    <Column allowEditing={false} dataField="user" caption="Client id" />
                    <Column allowEditing={false} dataField="vehicles[0].price" caption="Order price" />
                    <Column allowEditing={false} dataField="vehicles[0].vehicle.maker" caption="Manufacturer" />
                    <Column allowEditing={false} dataField="vehicles[0].vehicle.model" caption="Model" />
                    <Column allowEditing={true} dataField="vehicles[0].status" caption="status">
                        <Lookup dataSource={statuses} valueExpr="r" displayExpr="r" />
                    </Column>
                </DataGrid>
            </div>
        );
    }
}

export default ManageUsers;