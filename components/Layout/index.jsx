import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = ({children}) => {
    return (
        <> 
            <div className="page-banner">
                <Navbar/>
                <div className="main-section">
                    {children}
                </div>
                <Footer/> 
            </div>
           
        </>
    );
};

export default Layout;
