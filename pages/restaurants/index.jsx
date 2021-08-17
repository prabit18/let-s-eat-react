import {React, useEffect, useState} from 'react';
import RestaurantListingPage from '../../components/RestaurantListing';
import {Provider} from "react-redux";
import store from "../../redux/store";
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";
import RestaurantListLoader from '../../components/Loader/RestaurantListLoader';
import MenuList from '../../components/RestaurantDetail/MenuList';
import Metadata from '../../components/Metadata';
import { useRouter } from 'next/router';
const RestaurantListing = (props) => {
	const router=useRouter();
	console.log("url should be ",router.query.Curated_type);
	const[loading,setloading]=useState(true);
	useEffect(() => {
   props.getRestaurants(router.query.Curated_type).then((Response)=>{setloading(false)});
  },[router.query.Curated_type]);

  const metacontent={title:"Order Food Online from Best Restaurants Around You | Let's Eat",description:"Order food online from restaurants and get it delivered."}
const {Restaurants} = props
	return (
		<>
		   <Metadata metacontent={metacontent}/>
			<div className="page-banner">
				{(!loading && Object.keys(Restaurants).length > 0)?<RestaurantListingPage/>:<RestaurantListLoader/>}
			</div>
			
		</>
	)
}
const mapStateToProps = (state) => {
  const {
    Restaurants
  } = state
  return {Restaurants}
}
const actionCreator = {
  getRestaurants: UserAction.getRestaurants
}

export default connect(mapStateToProps, actionCreator)(RestaurantListing);
