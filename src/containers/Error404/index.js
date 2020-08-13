import React from "react";
import autoBind from 'react-autobind';
import Button from '../../components/Button';
import './style.css';

class Error404 extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    goToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="error-404-main">
                <div className="error-404-title">
                    <span>Oops!</span>
                </div>
                <div className="error-404-body">
                    <span>404 Error - Page not found</span>
                    <span>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</span>
                    <div className="error-404-button">
                        <Button title={"GO TO HOMEPAGE"} css={"PrimaryButton"} width={"w150px"} onClick={this.goToHome} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Error404