import React from 'react';
import autoBind from 'react-autobind';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';


import './style.css';
import Button from '../Button';
import { signOut } from '../../redux/user/actions';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
        // this.state = {lockedPanel: false, panelState: 'minimize'};
        autoBind(this);
    }
    changeState() {
        this.setState({selected: !this.state.selected});
    }
    render() {
        return (
            <div className="FilterContainer">
                 <div className="FilterName">
                 <span className="FilterNameText"> Transmission </span>
                 </div>
                 <div className="FilterSelection">
                 <Button css={this.state.selected ? "SelectedFilterButton" : "FilterButton"} title="Automatic" onClick={this.changeState}/>
                 <Button css={this.state.selected ? "SelectedFilterButton" : "FilterButton"} title="Manual" onClick={this.changeState}/>
                 </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = {
    onSignOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter));
