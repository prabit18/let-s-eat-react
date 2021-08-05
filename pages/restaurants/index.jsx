import {React, useEffect} from 'react';
import RestaurantListingPage from '../../components/RestaurantListing';
import {Provider} from "react-redux";
import store from "../../redux/store";
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";
import RestaurantListLoader from '../../components/Loader/RestaurantListLoader';
import MenuList from '../../components/RestaurantDetail/MenuList';


const RestaurantListing = (props) => {
	useEffect(() => {
   props.getRestaurants();
  },[]);
const {Restaurants} = props
	return (
		<>
			<div className="page-banner">
				{Object.keys(Restaurants).length > 0 && Object.keys(MenuList).length>0 ? <RestaurantListingPage/>:<RestaurantListLoader/>}
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
