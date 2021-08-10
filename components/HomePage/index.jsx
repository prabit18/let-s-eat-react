import { React, useEffect, useState } from "react";
import HomeTopSection from "../HomeTopSection";
import FoodListing from "../FoodListing";
import { foodCategoryName } from "../constants";
import { UserAction } from "../../redux/actions/user.action";
import { connect } from "react-redux";
import CategorySectionLoader from "../Loader/CategorySectionLoader";
import BottomSectionLoader from "../Loader/BottomSectionLoader";
import HomePageLoader from "../Loader/HomePageLoader";
import Metadata from "../Metadata";

const HomePage = (props) => {
  const [loading, setloading] = useState(false);
    useEffect(() => {
      setloading(true);
      props.getRestaurants().then(() => {
        props.getCuratedlist().then(() => setloading(false));
      });
  },[]);

const {Curatedlist,Restaurants} = props
  return (
    <>
      <Metadata/>
      {!loading ? (
        <>
          <HomeTopSection />
          {Curatedlist.length > 0 &&
            Curatedlist.map((item) => <FoodListing data={item} key={item.id}/>)}
        </>
      ) : (
        <HomePageLoader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    Curatedlist,Restaurants
  } = state
  return {Curatedlist,Restaurants}
}
const actionCreator = {
  getCuratedlist: UserAction.getCuratedlist,
  getRestaurants: UserAction.getRestaurants,
};

export default connect(mapStateToProps, actionCreator)(HomePage);
