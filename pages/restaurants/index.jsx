import {React, useEffect, useState} from 'react';
import RestaurantListingPage from '../../components/RestaurantListing';
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";
import RestaurantListLoader from '../../components/Loader/RestaurantListLoader';
import Metadata from '../../components/Metadata';
import { useRouter } from 'next/router';
import { Cusinieslist } from '../../redux/reducer/cuisinieslist.reducer';
const RestaurantListing = (props) => {
	const router=useRouter();
	const[loading,setloading]=useState(true);
	// let UrlPrams=router.pathname==='/restaurants'?"":router.query.Curated_type
	// console.log('url',router.pathname, UrlPrams);
	useEffect(() => {
		let UrlPrams=router.query!==undefined?router.query.Curated_type:null;
		console.log("urlprams",UrlPrams);
		let cuisine_prams=router.query!==undefined?router.query.Cuisine_type:null;
		var body={
			"filters":[{
			"key":"cuisine_types",
			"value":[cuisine_prams]
		}]}
		if(UrlPrams===undefined||cuisine_prams){
   props.getRestaurants().then((Response)=>{setloading(false)});
		}else if(UrlPrams){
			props.getRestaurants(UrlPrams).then((Response)=>{setloading(false)});
		}else if(cuisine_prams){
			props.getRestaurants(body).then((Response)=>{setloading(false)});
		}
   props.getCuisineslist();
  },[]);
  const metacontent={title:"Order Food Online from Best Restaurants Around You | Let's Eat",description:"Order food online from restaurants and get it delivered."}
const {Restaurants} = props
console.log('all cuisines list',props.Cusinieslist.data);
	return (
		<>
		   <Metadata metacontent={metacontent}/>
			<div className="page-banner">
				{(!loading && Object.keys(Restaurants).length > 0)?<RestaurantListingPage Cusinieslist={props.Cusinieslist.data}/>:<RestaurantListLoader/>}
			</div>
			
		</>
	)
}
const mapStateToProps = (state) => {
  const {
    Restaurants,Cusinieslist
  } = state
  return {Restaurants,Cusinieslist}
}
const actionCreator = {
  getRestaurants: UserAction.getRestaurants,
  getCuisineslist:UserAction.getCuisineslist
}

export default connect(mapStateToProps, actionCreator)(RestaurantListing);
