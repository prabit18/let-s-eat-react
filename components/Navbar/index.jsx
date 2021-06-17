import React from 'react';

const Navbar = () => {
    return (
        <>
            <header className="custom-header">
                <div className="container custom-container">
                    <nav className="navbar custom-navbar">
                        <a className="header-logo" href="home.html"><img src="images/le-logo.svg" alt="Logo"/></a>
                        <div className="header-actions">
                            <ul className="location-search">
                                <li className="select-li dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <div className="select-field">
                                        <em className="outer-icon">
                                            <img className="location-icon" src="images/location.svg" alt="location"/>
                                        </em>
                                        <label>
                                            <input value="" placeholder="Sugnall Street, Liverpool, UK"/>
                                        </label>
                                        <div className="select-menu dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="inner-content">
                                                <div className="current-location">
                                                    <em>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#0A83EA"
                                                             width="14" height="14" viewBox="0 0 20 20" role="img">
                                                            <title>current-location</title>
                                                            <path
                                                                d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"></path>
                                                        </svg>
                                                    </em>
                                                    <p>Use current location</p>
                                                </div>
                                                <p className="using-gps">Using GPS</p>
                                            </div>
                                            <div className="recent-location">Recent Locations</div>
                                            <div className="recent-location-inner">
                                                <div className="location-content">
                                                    <em>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#1C1C1C"
                                                             width="15" height="15" viewBox="0 0 20 20" role="img"
                                                             className="clock-icon">
                                                            <title>time</title>
                                                            <path
                                                                d="M14.76 9.040h-4.22l-2.58-4.28c-0.147-0.354-0.489-0.598-0.889-0.598-0.53 0-0.96 0.43-0.96 0.96 0 0.227 0.079 0.436 0.211 0.6l-0.001-0.002 2.86 4.76c0.172 0.278 0.474 0.46 0.82 0.46 0 0 0 0 0.001 0h4.76c0.467-0.070 0.822-0.469 0.822-0.95s-0.354-0.88-0.817-0.949l-0.005-0.001zM10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.523 0 10-4.477 10-10v0c0-5.523-4.477-10-10-10v0zM10 18.58c-4.739 0-8.58-3.841-8.58-8.58s3.841-8.58 8.58-8.58c4.739 0 8.58 3.841 8.58 8.58v0c0 4.739-3.841 8.58-8.58 8.58v0z"></path>
                                                        </svg>
                                                    </em>
                                                </div>
                                                <div className="location-name">Sugnall Street, Liverpool, UK</div>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                                <li className="search-li">
                                    <div className="search-container">
                                        <form className="search-form">
                                            <label>
                                                <input type="search"
                                                       placeholder="Search for restaurant, cuisine or your favourite dish"
                                                       className="form-field"/>
                                            </label>
                                            <div className="search"><span>Search</span><img src="images/search.svg"
                                                                                            alt="search"/></div>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                            <ul className="header-right">
                                <li>
                                    <a href="#">
                                        <img src="images/help.svg" alt="help"/>
                                            <span>Help</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div className="cart">
                                            <img src="images/cart.svg" alt="cart"/>
                                                <div className="cart-qty">
                                                    <span>2</span>
                                                </div>
                                        </div>
                                        <span>Cart</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/login.svg" alt="login"/>
                                            <span>Login</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="search-outer">
                <div className="search-inner">
                    <div className="select-outer" data-toggle="modal" data-target="#exampleModal1">
                        <div className="select-inner">
                            <div className="outer-icon">
                                <img className="location-icon" src="images/location.svg" alt="location"/>
                            </div>
                            <div className="select-placeholder">Sugnall Street, <span>Liverpool, UK</span></div>
                        </div>
                    </div>
                    <div className="search-icon-outer" data-toggle="modal" data-target="#exampleModal">
                        <img className="search-icon" src="images/search.svg" alt="search"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
