import React from 'react';
import './style.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className={"FooterContainer"}>
                <div className="FooterColumn">
                    <h2 className="FooterTitle">Luxury Motors</h2>
                    <h3 className="FooterTitle">Tel: +972 58 414-1011</h3>
                    <h3 className="FooterTitle">Email: buy.a.luxury.vehicle@gmail.com</h3>
                    <h3 className="FooterTitle">Address: Aluf David St 187, Ramat Gan, Israel</h3>
                </div>
                <div className="FooterColumn">
                    <iframe className="GoogleMapLocation" title="googlesupermap"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.5775943188073!2d34.813271714783795!3d32.05362308119642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b03b2b76c81%3A0x933975d17f893606!2z157Xm9eV158g15zXldeh15jXmdeS!5e0!3m2!1sen!2sil!4v1590062417700!5m2!1sen!2sil" frameBorder="0" style={{ border: "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
                <div className={"CopyRight"}>
                    CopyRight © 2020 Tehila Amram and Lital Maudah All rights reserved.
               </div>
            </footer>
        );
    }
}

export default Footer;
