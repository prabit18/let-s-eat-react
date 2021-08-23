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
        <section className="restaurant-list">
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
<SlidingPane className="some-custom-class"
        overlayClassName="some-custom-overlay-class" isOpen={state.isPaneOpen}  width="500px" onRequestClose={() => {setState({ isPaneOpen: false });}}>
    <div className="filter-popup show display-popup">
        <div className="modal right fade show display-popup" id="filterModal" tabIndex="-1" role="dialog" aria-labelledby="RegModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header" id="RegModalLabel">
                    <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close" id="closeModal1"> 
                        <img src="images/close.svg" alt="close-icon" onClick={()=>{setState({ isPaneOpen: false });}} />
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
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option1" checked/>
                                        <label className="form-check-label" for="exampleRadios5">
                                            Home Delivery
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option1" checked/>
                                        <label className="form-check-label" for="exampleRadios6">
                                            Store Pick Up
                                        </label>
                                    </div>
                                  </div>
                            </div>
                            <div className="filter-sec cuisines-section">
                                <h4>Cuisines</h4>
                            { props.Cusinieslist.map((item)=>(
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            {item.name}
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            {item.name}
                                        </label>
                                    </div>
                                </div>))}
                                {/* <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck2">
                                            American
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck3"/>
                                        <label className="form-check-label" for="defaultCheck3">
                                            Juices
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Arabian
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck4"/>
                                        <label className="form-check-label" for="defaultCheck4">
                                            Korean
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck5"/>
                                        <label className="form-check-label" for="defaultCheck5">
                                            Australian
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Mediterranean
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck6"/>
                                        <label className="form-check-label" for="defaultCheck6">
                                            British
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Mexican
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck7"/>
                                        <label className="form-check-label" for="defaultCheck7">
                                            Chinese
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Middle Eastern
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck8"/>
                                        <label className="form-check-label" for="defaultCheck8">
                                            Continental
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck9"/>
                                        <label className="form-check-label" for="defaultCheck9">
                                            Offers
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck10"/>
                                        <label className="form-check-label" for="defaultCheck10">
                                            Desserts
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck11"/>
                                        <label className="form-check-label" for="defaultCheck11">
                                            Pizzas
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck12"/>
                                        <label className="form-check-label" for="defaultCheck12">
                                            European
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck13"/>
                                        <label className="form-check-label" for="defaultCheck13">
                                            Portuguese
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck14"/>
                                        <label className="form-check-label" for="defaultCheck14">
                                            French
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck15"/>
                                        <label className="form-check-label" for="defaultCheck15">
                                            Salads
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Grill
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck16"/>
                                        <label className="form-check-label" for="defaultCheck16">
                                            Seafood
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck17"/>
                                        <label className="form-check-label" for="defaultCheck17">
                                            Ice Cream
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck18"/>
                                        <label className="form-check-label" for="defaultCheck18">
                                            Snacks
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck19"/>
                                        <label className="form-check-label" for="defaultCheck19">
                                            Indian
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck20"/>
                                        <label className="form-check-label" for="defaultCheck20">
                                            Sweets
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck21"/>
                                        <label className="form-check-label" for="defaultCheck21">
                                            Grill
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck22"/>
                                        <label className="form-check-label" for="defaultCheck22">
                                            Seafood
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck23"/>
                                        <label className="form-check-label" for="defaultCheck24">
                                            Ice Cream
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Snacks
                                        </label>
                                    </div>
                                </div> */}
                                {/* <div className="form-row">
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck25"/>
                                        <label className="form-check-label" for="defaultCheck25">
                                            Indian
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck26"/>
                                        <label className="form-check-label" for="defaultCheck26">
                                            Sweets
                                        </label>
                                    </div>
                                </div> */}
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
