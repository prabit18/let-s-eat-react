import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import '../styles/globals.css';
import '../styles/css/common.css';
import '../styles/css/header.css';
import '../styles/css/home.css';
import '../styles/css/footer.css';
import '../styles/css/restaurant-list.css';
import '../styles/css/restaurant-detail-page.css';
import '../styles/css/checkout.css'
import '../styles/css/favourite-list.css'

import Layout from "../components/Layout";
import {Provider} from "react-redux";
import store from "../redux/store";
import {BrowserRouter, Route, Router, useHistory} from 'react-router-dom';
import {history}   from 'history';
import LoadingSpinner from '../components/Loader'
import Favicon from 'react-favicon'
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  
  return (
      <Provider store={store}>
          {/* <Head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAXIZmJQHd7s-e_W9EOOOmyM7ThQ2hMbo0&libraries=places`}></script>
      </Head> */}
         <Favicon url='/images/favicon.ico'/>
          <Layout>
              
              <Component {...pageProps} />
              
          </Layout>
         
      </Provider>
  )
}

export default MyApp
