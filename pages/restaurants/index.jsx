import {React, useEffect, useState} from 'react';
import RestaurantListingPage from '../../components/RestaurantListing';
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";
import RestaurantListLoader from '../../components/Loader/RestaurantListLoader';
import Metadata from '../../components/Metadata';
import { useRouter } from 'next/router';
const RestaurantListing = (props) => {
	const router=useRouter();
	const[loading,setloading]=useState(true);
	// let UrlPrams=router.pathname==='/restaurants'?"":router.query.Curated_type
	// console.log('url',router.pathname, UrlPrams);	
	const[prams,setPrams]=useState('');
	useEffect(() => {
		let path=router.asPath;
		let finalpath=path.split("?")[1]===undefined?"":path.split("?")[1]
		console.log(finalpath)
		var body={}
		if(finalpath===''){
			 body={}
		}else{
			 body={
				"filters":[{
				"key":finalpath.split("=")[0],
				"value":[finalpath.split("=")[1].replace('+'," ")]
			}]}
		}
      props.getRestaurants(body).then((Response)=>{setloading(false)})
   props.getCuisineslist();
  },[]);
  const metacontent={title:"Order Food Online from Best Restaurants Around You | Let's Eat",description:"Order food online from restaurants and get it delivered."}
const {Restaurants} = props
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
