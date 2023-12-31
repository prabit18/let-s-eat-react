import {React, Component,useEffect, useState}from 'react';
import RestaurantDetail from '../../../components/RestaurantDetail';
import Restaurant from '../../../components/RestaurantListing/1restaurant';
import { UserAction } from '../../../redux/actions/user.action';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import RestaurantDetailLoader from '../../../components/Loader/Restaurant-detail-loader';
import { Restaurants } from '../../../redux/reducer/restaurantList.reducer';
import Metadata from '../../../components/Metadata';
const restaurantdetailpage= (props) =>{
  const router = useRouter()
  const { slug } = router.query
  console.log("query",slug);
  const type=slug;
    useEffect(() => {

        props.getMenulist(type);
        props.getRestaurant(type);
         },[router.query]);
     const {Menulist,Restaurant} = props 
     console.log("Restaurant is",Restaurant)
     const metacontent={title: `Order Food From ${Restaurant.name} | Let's Eat`,description:Restaurant.description}
    return(
    <>
             <Metadata metacontent={metacontent}/>
             {Object.keys(Menulist).length > 0 ?<RestaurantDetail restaurant={Restaurant}/>:<RestaurantDetailLoader/>}
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
 