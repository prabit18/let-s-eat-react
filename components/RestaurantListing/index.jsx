import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { UserAction } from '../../redux/actions/user.action';
import RestaurantsList from './restaurantslist';
import { useRouter } from 'next/router';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { NavItem } from 'reactstrap';
const RestaurantListingPage = (props) => {
    const[filtertype,setFiltertype]=useState('');
    const router=useRouter();
    console.log(router.query.Curated_type);  
    const[val,setval]=useState(false);
    const[cuisinetype,setcuisinetype]=useState([]);
    const[odd,setOdd]=useState([]);
    const[even,setEven]=useState([]);
    const[pickupoption,setPickupoption]=useState('');
    const[filterBody,setFilterBody]=useState({});
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
      });
    var body={}
    const multiplefilter=()=>{
    
        if(pickupoption){
            body={
                "filters":[{
                    "key":"cuisine_types",
                    "value":cuisinetype
                    },
                    {
                   "key":pickupoption,
                   "value":[true]
                }]
              }
        }else if(cuisinetype){
        body={
          "filters":[{
              "key":"cuisine_types",
              "value":cuisinetype
          }]
        }
    }else {
        body={};
    }
       setFilterBody(body);
        props.getRestaurants(body)
        setState({ isPaneOpen: false })
    }
  const  handleFilter = (type,value) =>{
      let b=filterBody;
      setFiltertype(type)
      var sortobject={};
      sortobject["key"]=type;
      sortobject["value"]=value;
      b.sort_by=sortobject;
      console.log("new body",b);
     props.getRestaurants(b);
  }
  const clickhandler=()=>{
     
    if(even.length<=0||odd.length<=0){
    props.Cusinieslist.map((item,index)=>{
        if(index%2==0){
           even.push(item);
           setEven(even);
        }else{
         odd.push(item);
         setOdd(odd);
        }
    })
}
    setState({ isPaneOpen: true })
}
const [checked,setChecked]=useState({})
const selectvaluehandler=(type,e)=>{
    
    setval(e.target.checked)
    if(!cuisinetype.includes(type)){
    cuisinetype.push(type);
    checked[type]=val;
    setChecked(checked);
    }else{
        delete checked[type];
        setChecked(checked);
        const index = cuisinetype.indexOf(type);
        if (index > -1) {
            cuisinetype.splice(index, 1);
        }          
    }
    setcuisinetype(cuisinetype);
    console.log("cusinetype",cuisinetype);
}
const ClearAllhandler=()=>{
    while(cuisinetype.length>0){
        cuisinetype.pop();
    }
    for (var member in checked) delete checked[member]
    setcuisinetype(cuisinetype);
    setPickupoption('');
    console.log("updated cuisine",cuisinetype);
    props.getRestaurants();
}
const pickuphandler=(type)=>{
    
    if(pickupoption===type){
        setPickupoption('');
        delete checked[type];
        setChecked(checked);
    }else {
        setPickupoption(type);
        checked[type]=true;
      setChecked(checked);
    }
    
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
                                            <li className="filter"><a href="javascript:void(0);" data-toggle="modal" data-target="#filterModal" onClick={clickhandler}>Filters
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
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option1"  checked={pickupoption==='home_delivery'?true:false} onClick={()=>pickuphandler('home_delivery')} />
                                        <label className="form-check-label" for="exampleRadios5">
                                            Home Delivery
                                        </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option1" checked={pickupoption==='store_pickup'?true:false} onClick={()=>pickuphandler('store_pickup')}/>
                                        <label className="form-check-label" for="exampleRadios6">
                                            Store Pick Up
                                        </label>
                                    </div>
                                  </div>
                            </div>
                            <div className="filter-sec cuisines-section">
                                <h4>Cuisines</h4>
                                <div className="cuisines-wrap">

                                     <ul>
                                  {even.map((item)=>(
                                        <li>
                                            <input className="form-check-input" type="checkbox" checked={checked.hasOwnProperty(item.name)&&val} value={item.name} onChange={(e)=>selectvaluehandler(item.name,e)} id={item.id}/>
                                            <label className="form-check-label" htmlFor={item.id}>
                                                {item.name}
                                            </label>
                                        </li>
                                  ))}
                                        </ul>
                                        <ul>
                                     {odd.map((item)=>(
                                            <li>
                                                <input className="form-check-input" type="checkbox" checked={checked.hasOwnProperty(item.name)&&val}value={item.name} onChange={(e)=>selectvaluehandler(item.name,e)} id={item.id}/>
                                                <label className="form-check-label" for={item.id}>
                                                    {item.name}
                                                </label>
                                            </li>
                                     ))}
                                            </ul>
                                </div>
                                </div>
                        </form>
                        <div className="modal-footer">
                        <div className="filter-action">
                            <a href="javascript:void()" onClick={ClearAllhandler}>Clear All</a>
                            <button type="button" onClick={multiplefilter}>Apply</button>
                        </div>
                    </div>
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
