import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
// import * as Scroll from 'react-scroll';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Message from './Message/Message';
import Button from '../Button';
import './Messages.css';

class Messages extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // scroll.scrollToBottom({containerId: "messages-list"});
  // }
  // scrollToTop() {
  //   scroll.scrollToTop();
  //   scroll.scrollToBottom();
  // }
  render() {
    console.log(this.props.messages, ' messages');
    return (
      <ScrollToBottom className="messages">
      {/* <div className="messages" id="messages-list"> */}
       {/*
         <Button title={"Load More"} css={"load-more"} width={"w100percent"} onClick={this.props.loadMore}/>
      */}
        {this.props.messages.map((message, i) => <div key={i}><Message message={message} name={this.props.name} /></div>)}
      </ScrollToBottom>
    );
  }
}

export default Messages;