import React from 'react';

import DataGrid, {
  Column,
  // FormItem,
  Editing,
  Paging,
  Lookup
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import AjaxService from '../../services/AjaxService';
// import { employees, states } from './data.js';
import './style.css';
const roles= [{
    id: 0,
    r: 'user',
}, {
    id: 1,
    r: 'worker'
}, {
    id: 2,
    r: 'admin'
}];
class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
        }
    }
    componentDidMount() {
        this.getUsersList();
    }
    getUsersList() {
        AjaxService.get("/user/getAll").then((res) => {
            this.setState({
                usersList: res.data,
            });
          }).catch((err) => {
            console.log('chat rooms error', err);
          });
    }
    updateDatabase(e) {
        console.log(e, ' eee');
        AjaxService.post('/user/update', {
            user: e.data,
        }).then((res) => {
            // this.getRoomsToJoin();
            // this.props.history.push(`/vehicle/${res.data.id}`);
          }).catch((err) => {
            console.log(err, ' add vehicle save error');
          });
    }
  render() {
    return (
      <div id="data-grid-demo" className="ManageUserContainer">
        <DataGrid
          dataSource={this.state.usersList}
          keyExpr="_id"
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
          <Column dataField="fullName" caption="Full Name" width={70} />
          <Column allowEditing={false} dataField="username" caption="Email"/>
          {/* <Column dataField="LastName" /> */}
          {/* <Column dataField="Position" width={170} /> */}
          <Column dataField="role" caption="role" width={125}>
            <Lookup dataSource={roles} valueExpr="r" displayExpr="r" />
          </Column>
          {/* <Column dataField="BirthDate" dataType="date" /> */}
          {/* <Column dataField="Notes" visible={false}>
            <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{ height: 100 }} />
          </Column> */}
        </DataGrid>
      </div>
    );
  }
}

export default ManageUsers;