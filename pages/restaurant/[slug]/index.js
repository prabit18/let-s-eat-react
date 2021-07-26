import {React, Component,useEffect, useState}from 'react';
import RestaurantDetail from '../../../components/RestaurantDetail';
import Restaurant from '../../../components/RestaurantListing/1restaurant';
import { UserAction } from '../../../redux/actions/user.action';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
const restaurantdetailpage= (props) =>{
  const router = useRouter()
  const { slug } = router.query
  console.log("query",router.query);
  const type=slug;
    useEffect(() => {

        props.getMenulist(type);
        props.getRestaurant(type);
         },[router.query]);
     const {Menulist,Restaurant} = props
    return(
    <>
             
             {Object.keys(Menulist).length > 0 &&<RestaurantDetail restaurant={Restaurant}/>}
    </>)
}

 const mapStateToProps = (state) => {
   const {
     Menulist,Restaurant
   } = state
   return {Menulist,Restaurant}
 }
 const actionCreator = {
   getMenulist: UserAction.getMenulist,
   getRestaurant:UserAction.getRestaurant
 }
 
 export default connect(mapStateToProps, actionCreator)(restaurantdetailpage);
 