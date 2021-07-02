import {React, useEffect} from 'react';
import RestaurantListingPage from '../../components/RestaurantListing';
import {Provider} from "react-redux";
import store from "../../redux/store";
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";


const RestaurantListing = (props) => {
	useEffect(() => {
   props.getRestaurants();
  },[]);
const {Restaurants} = props
	return (
		<>
		
			<div className="page-banner">
				{Object.keys(Restaurants).length > 0 && <RestaurantListingPage/>}
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
