import React from 'react'
import BottomSectionLoader from './BottomSectionLoader'
import CategorySectionLoader from './CategorySectionLoader'
import HomepageTopLoader from './HomepageTopLoader'

function HomePageLoader() {
    return (
        <div >
            <HomepageTopLoader/>
            <CategorySectionLoader/>
           <div style={{marginLeft:"10px"}}><BottomSectionLoader/></div> 
        </div>
    )
}

export default HomePageLoader
