import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import './Messages.css';

class Messages extends React.Component {
  render() {
    return (
      <ScrollToBottom className="messages">
        {this.props.messages.map((message, i) => <div key={i}><Message message={message} name={this.props.name} /></div>)}
      </ScrollToBottom>
    );
  }
}

export default Messages;