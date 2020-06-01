import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import AjaxService from '../../services/AjaxService';
import _ from 'lodash';
import './style.css';
import Stepper from '../../components/Stepper';
import ChatGroups from '../../components/ChatGroup';
// var defaultImg = require("../../images/defaultprofile.jpeg");

class ChatRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        autoBind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        AjaxService.get(`/user/getUser/${params.uid}`).then((res) => {
            this.setState({
                user: _.cloneDeep(res.data.user),
            });
        });
    }
    //     renderUploadPhoto() {
    //         return (
    // <div>
    // <input accept="image/*" id="icon-button-file" type="file" />
    //       <label htmlFor="icon-button-file">
    //         <IconButton color="primary" aria-label="upload picture" component="span">
    //           <AddAPhotoIcon />
    //         </IconButton>
    //       </label>
    //     </div>
    //         );
    //     }
    
    renderStepper() {
        return (
            <div className="StepperContainerDiv">
                <Stepper steps={['Upload photo', 'Personal details', 'Select groups']} />
            </div>
        );
    }
    render() {
        return (
            <div className={"ChatRoomsContainer"}>
                            {/* // <div > */}

                {/* {this.state.user !== undefined && this.state.user.mainImg === undefined && this.renderStepper()} */}
                <ChatGroups />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(ChatRooms);
