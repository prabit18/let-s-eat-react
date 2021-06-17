import React from 'react';
import OffersSection from "./OffersSection";
import CategorySection from "./CategorySection";

const HomeTopSection = () => {
    return (
        <div className="top-bg">
            <OffersSection/>
            <CategorySection/>
        </div>
    );
};

export default HomeTopSection;
