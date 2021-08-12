import {React,useEffect} from 'react'
import FavouriteList from '../../components/favouritelist'
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";
import RestaurantListLoader from '../../components/Loader/RestaurantListLoader';
import Emptypage from '../../components/Emptypage';
const Favourite=(props)=>{
  
    useEffect(()=>{
          props.FavouriteList()
    },[])

    let{Favourites}=props
    console.log("check",Favourites);
    return(
    <>
    {Favourites.length>0 ?<FavouriteList data={Favourites}/>:<Emptypage/>}
    </>
    )
}
const mapStateToProps = (state) => {
    const {
      Favourites
    } = state
    return {Favourites}
  }
  const actionCreator = {
    FavouriteList: UserAction.FavouriteList,
  }
  
  export default connect(mapStateToProps, actionCreator)(Favourite);