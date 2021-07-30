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
import Layout from "../components/Layout";
import {Provider} from "react-redux";
import store from "../redux/store";
import {BrowserRouter, Route, Router, useHistory} from 'react-router-dom';
import {history}   from 'history';
import LoadingSpinner from '../components/Loader'
import Favicon from 'react-favicon'

function MyApp({ Component, pageProps }) {
   const [loader, setloader] = useState(true)
   setTimeout(() => {
       setloader(false)
   }, 2000);
  return (
      <Provider store={store}>
         <Favicon url='/images/favicon.ico'/>
          <Layout>
              
              {!loader?<Component {...pageProps} />:<LoadingSpinner/>}
              
          </Layout>
         
      </Provider>
  )
}

export default MyApp
