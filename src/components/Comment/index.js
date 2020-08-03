import React from 'react';
// import _ from 'lodash';
import { withRouter } from "react-router-dom";
import autoBind from 'react-autobind';

import './style.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return (
            <div className="comment-main">
                <div className="writer-name-container">
                    <span className="writer-name-title">tehila amram</span>
                </div>
                <div className="comment-date-container">
        <span>{Date.UTC()}</span>
                    </div>
            </div>
        );
    }
}

export default withRouter(Comment);





