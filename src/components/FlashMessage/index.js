import React from 'react';
import './style.css';

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.changeVisibility = this.changeVisibility.bind(this);
        // this.changeVisibility();
      }

      changeVisibility() {
          if (document.getElementById(this.props.id).style.display !== "none") {
            document.getElementById(this.props.id).style.display = "none";
          } else {
            document.getElementById(this.props.id).style.display = "block";
          }
      }
    render() {
        return (
            <div style={{display: 'block'}} id={this.props.id} className={"Alert " + this.props.css}>
             <button onClick={() => {this.changeVisibility()}} className="close" data-dismiss="alert" aria-label="close" title="close">×</button>
                <strong>{this.props.subject}</strong> {this.props.message}
            </div>
        );
    }
}

export default FlashMessage;
