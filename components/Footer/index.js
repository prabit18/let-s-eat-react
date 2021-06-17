import React from 'react';

const Footer = () => {
    return (
        <footer className="custom-footer">
            <div className="footer-one">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-3 col-sm-4 col-6">
                            <div className="footer-links">
                                <h3>COMPANY</h3>
                                <ul>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Team</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-6">
                            <div className="footer-links">
                                <h3>CONTACT</h3>
                                <ul>
                                    <li><a href="#">Help & Support</a></li>
                                    <li><a href="#">Partner with Us</a></li>
                                    <li><a href="#">We Deliver to</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-6">
                            <div className="footer-links legal">
                                <h3>LEGAL</h3>
                                <ul>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Cancellation & Refund</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Cookie Policy</a></li>
                                    <li><a href="#">Offer Terms</a></li>
                                    <li><a href="#">Phishing & Fraud</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 col-6 footer-up-down">
                            <div className="dwn-app">
                                <a href="#"><img src="images/appStore.svg" alt="AppStore"/></a>
                                <a href="#"><img src="images/googlePlay.svg" alt="GooglePlay"/></a>
                            </div>
                            <ul className="social-icons">
                                <li className="hvr-grow"><a href="#"><img src="images/fb.svg" alt="Facebook"/></a></li>
                                <li className="hvr-grow"><a href="#"><img src="images/insta.svg" alt="Instagram"/></a>
                                </li>
                                <li className="hvr-grow"><a href="#"><img src="images/twit.svg" alt="Twitter"/></a></li>
                                <li className="hvr-grow"><a href="#"><img src="images/pin.svg" alt="Pinterest"/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-two">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-9 col-5">
                            <div className="footer-logo">
                                <img src="images/le-logo.svg" alt="Logo"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-7">
                            <div className="copyright">
                                <p>© 2021 letseat.co.uk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
