import React from 'react';
import './style.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className={"FooterContainer"}>
               <div className={"CopyRight"}>
               CopyRight © 2020 Tehila Amram
               </div>
            </footer>
        );
    }
}

export default Footer;
