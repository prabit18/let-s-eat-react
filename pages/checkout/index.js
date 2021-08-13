import React from 'react';
import { connect } from 'react-redux';
import Checkout from '../../components/checkout';
import Metadata from '../../components/Metadata';
import { UserAction } from '../../redux/actions/user.action';
const Checkoutpage=(props)=>{
console.log("listcheckout",props.cartV1);
const metacontent={title:"Checkout | Let's Eat",description:"Letseat Checkout"}
    return (
              <>
              <Metadata metacontent={metacontent}/>
              <Checkout/>
              </>
           )
}
const mapStateToProps = (state) => {
    const {
      Menulist,Restaurant,cartV1
    } = state
    return {Menulist,Restaurant,cartV1}
  }
  const actionCreator = {
    getMenulist: UserAction.getMenulist,
    getRestaurant:UserAction.getRestaurant
  }
  
  export default connect(mapStateToProps, actionCreator)(Checkoutpage);