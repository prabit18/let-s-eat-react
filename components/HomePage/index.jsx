import React from 'react';
import HomeTopSection from "../HomeTopSection";
import FoodListing from "../FoodListing";
import {foodCategoryName} from "../constants";

const HomePage = () => {
    return (
        <>
            <HomeTopSection/>
            {foodCategoryName.map((item) => <FoodListing key={item.id} title={item}/> )}
        </>
    );
};

export default HomePage;
