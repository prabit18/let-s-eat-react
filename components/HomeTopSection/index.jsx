import React,{useState,useEffect} from 'react';
import OffersSection from './OffersSection';
import CategorySection from './CategorySection';
import {connect} from 'react-redux';
import HomepageTopLoader from '../Loader/HomepageTopLoader';
import CategorySectionLoader from '../Loader/CategorySectionLoader';
import { useRouter } from 'next/router';
const HomeTopSection = (props) => {
    const history=useRouter()
    const {Cuisines,Curatedlist} = props 
    return (
        <div className={history.pathname.includes('/restaurants')?`page-banner`:'top-bg'}>
            <OffersSection/>

             <CategorySection/>
        </div>
    );
};
const mapStateToProps = (state) => {
    const {
    Cuisines,
    Curatedlist
  } = state
  return {Cuisines,Curatedlist}
}
export default connect(mapStateToProps)(HomeTopSection);
