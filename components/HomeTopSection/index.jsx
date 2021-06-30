import React from 'react';
import OffersSection from './OffersSection';
import CategorySection from './CategorySection';
import {connect} from 'react-redux';

const HomeTopSection = (props) => {
    const {Cuisines} = props
    return (
        <div className="top-bg">
            <OffersSection/>
            {Object.keys(Cuisines).length > 0 && <CategorySection/>}
        </div>
    );
};
const mapStateToProps = (state) => {
    const {
    Cuisines
  } = state
  return {Cuisines}
}
export default connect(mapStateToProps)(HomeTopSection);
