import { event } from "jquery";
import { React, useEffect, useState } from "react";
import { Router, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserAction } from "../../redux/actions/user.action";
import InfiniteScroll from "react-infinite-scroll-component";
import RestaurantDetail from "../RestaurantDetail";
import Restaurant from "./1restaurant";
import LoadingSpinner from "../Loader";
import { dataService } from "../../services/data.service";
import RestaurantListLoader from "../Loader/RestaurantListLoader";

const RestaurantsList = (props) => {
  const [restaurantList, setRestaurantList] = useState({ list: [] });
  const { list } = restaurantList;
  const [loading, setloading] = useState(false);
  const [totalPage, setTotalpage] = useState();
  const [totalrecords, settotalrecords] = useState();
  const [currentPage, setcurrentPage] = useState(2);
  const { restaurants } = props;
  const { data } = restaurants;
  const [spinner, setspinner] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleFilter = (type) => {
    dataService.getRestaurantsInfinite(type).then((resp) => {
      console.log("data value", resp);
    });
  };

  useEffect(() => {
    setloading(true);
    setRestaurantList({ list: [] });
    dataService.getRestaurantsInfinite(1);
    setTotalpage(parseInt(restaurants.pagination.number_of_pages));
    setRestaurantList({
      ...restaurantList,
      list: restaurantList.list.concat(props.restaurants.data),
    });

    settotalrecords(restaurants.pagination.total_records);
    setTimeout(() => {
      setloading(false);
      setRefresh(true);
    }, 1000);
  }, []);
  console.log("refresh", refresh);

  const fetchData = () => {
    if (refresh === true) {
      setspinner(true);
      setcurrentPage(currentPage + 1);

        dataService.getRestaurantsInfinite(currentPage).then((resp) => {
          var arraydata = [
            { ...restaurantList, list: restaurantList.list.concat(resp.data) },
          ];
          arraydata = [...new Set(arraydata[0].list)];
          setRestaurantList({ list: arraydata });
        });
        setspinner(false);
    } 
    else if (refresh === false && currentPage === 2) {
      setcurrentPage(currentPage + 1);
      setspinner(true);

      setTimeout(() => {
        debugger;
        dataService.getRestaurantsInfinite(1).then((resp) => {
          setRestaurantList({
            ...restaurantList,
            list: restaurantList.list.concat(resp.data),
          });
        });
        setspinner(false);
      }, 1000);
    }
  };
  return (
     
        <InfiniteScroll
          dataLength={list.length}
          next={() => fetchData()}
          hasMore={currentPage === parseInt(totalPage + 1) ? false : true}
          loader={<div>{spinner ? <LoadingSpinner /> : ""}</div>}
        >
          <div className="food-list row frame">
            {list &&
              list.map((item) => <Restaurant item={item} key={item.id} />)}
          </div>
        </InfiniteScroll>
  );
};

const mapStateToProps = (state) => {
  const { Restaurants, errors } = state;
  return { restaurants: Restaurants, errors };
};
const actionCreator = {
  getRestaurants: UserAction.getRestaurants,
};
export default connect(mapStateToProps, actionCreator)(RestaurantsList);
