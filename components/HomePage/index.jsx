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
import { dataService } from "../../services";

const HomePage = (props) => {
  const [loading, setloading] = useState(false);
  
    useEffect(() => {
      setloading(true);
        props.getCuratedlist().then((response) => setloading(false));
  },[]);

const {Curatedlist} = props
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
  // debugger
  const {
    Curatedlist
  } = state
  return {Curatedlist}
}
const actionCreator = {
  getCuratedlist: UserAction.getCuratedlist,
};

export default connect(mapStateToProps, actionCreator)(HomePage);
