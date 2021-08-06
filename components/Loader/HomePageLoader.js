import React from 'react'
import BottomSectionLoader from './BottomSectionLoader'
import CategorySectionLoader from './CategorySectionLoader'
import HomepageTopLoader from './HomepageTopLoader'

function HomePageLoader() {
    return (
        <div >
            <HomepageTopLoader/>
            <div style={{marginTop:"30px"}}><CategorySectionLoader/></div>
           <div style={{marginTop:"50px"}}><BottomSectionLoader/></div> 
        </div>
    )
}

export default HomePageLoader
