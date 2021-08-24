import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { UserAction } from '../../redux/actions/user.action';
import RestaurantsList from './restaurantslist';
import { useRouter } from 'next/router';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
const RestaurantListingPage = (props) => {
    console.log('cusines are ',props.Cusinieslist)
    const[filtertype,setFiltertype]=useState({});
    const router=useRouter();
    console.log(router.query.Curated_type);  
    //props.getRestaurants(router.query.curated_type);
  const  handleFilter = (type,value) =>{
    filtertype[type]=value;  
      setFiltertype(filtertype);
      props.getRestaurants(filtertype)
    //   setFiltertype(type);
  }
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const clickhandler=()=>{
      setOpen(true);
}
return (
	<>
        <section classNameName="restaurant-list">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="listing-box">
                                <div className="filter-section">
                                    <div className="resto-count">
                                        <h2>{props.restaurants.pagination.total_records} Restaurants</h2>
                                    </div>
                                    <div className="filter-box custom-scroll">
                                        <ul>
                                            <li value="rating" className={filtertype==='ratings'?"active":""} ><a href="javascript:void(0);"onClick={()=> handleFilter('ratings','desc')}>Rating</a></li>
                                            <li value="deliverytime"className={filtertype==='delivery_time'?"active":""}><a href="javascript:void(0);" onClick={()=> handleFilter('delivery_time','asc')}>Delivery Time</a></li>
                                            <li value="pureVeg"className={filtertype==='pure_veg'?"active":""}><a href="javascript:void(0);"onClick={()=> handleFilter('pure_veg','true')}> Recommended</a></li>
                                            <li value="offers"className={filtertype==='offers'?"active":""}><a href="javascript:void(0);" onClick={()=> handleFilter('offers','')}>Close by</a></li>
                                            <li className="filter"><a href="javascript:void(0);" data-toggle="modal" data-target="#filterModal" onClick={() => setState({ isPaneOpen: true })}>Filters
                                                    <span><img alt="filter-icon" src="../../images/filter.svg"/></span>
                                                </a></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <RestaurantsList handleFilter={handleFilter}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
<SlidingPane className="some-custom-class custom-popup" overlayClassName="some-custom-overlay-class" isOpen={state.isPaneOpen} width="500px" onRequestClose={() => {setState({ isPaneOpen: false });}}>
    
<div className="filter-popup">
        <div className="modal right fade show">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" id="RegModalLabel">
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close" id="closeModal1"> 
                            <img src="../../images/close.svg" alt="close-icon" onClick={() => setState({ isPaneOpen: false })}/>
                        </button>
                        <h2>Filter</h2>
                    </div>
                    <div className="modal-body common-body">
                    <div className="filter-container">
                        <form>
                        <div className="filter-sec delivery-section">
                                <h4>Delivery Type</h4>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option1" />
                                        <label className="form-check-label" for="exampleRadios5">
                                            Home Delivery
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option1" />
                                        <label className="form-check-label" for="exampleRadios6">
                                            Store Pick Up
                                        </label>
                                    </div>
                                  </div>
                            </div>
                            <div className="filter-sec cuisines-section">
                                <h4>Cuisines</h4>
                                {
                               props.Cusinieslist && props.Cusinieslist.map((item)=>(
                                <div className="cuisines-wrap">
                                    <ul>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id={item.id}/>
                                            <label className="form-check-label" htmlFor={item.id}>
                                                {item.name}
                                            </label>
                                        </li>
                                        </ul>
                                    <ul>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id={item.id}/>
                                            <label className="form-check-label" for={item.id}>
                                                {item.name}
                                            </label>
                                        </li>
                                        </ul>
                                </div>
                                ))}
                                </div>
                        </form>
                            </div>
                            </div>    
                                
                    <div className="modal-footer">
                        <div className="filter-action">
                            <a href="#">Clear All</a>
                            <button type="button">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </SlidingPane>
 
	</>	
	
);  
};

const mapStateToProps = (state) => {
    const {Restaurants, errors} = state
   return {restaurants: Restaurants, errors}
}
const actionCreator = {
    getRestaurants: UserAction.getRestaurants
}
export default connect(mapStateToProps, actionCreator)(RestaurantListingPage);
