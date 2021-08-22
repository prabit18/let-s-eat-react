import React, { useState } from 'react'
import MapContext from '../Context/MapContext';
import Map from "./Map";

function index(props) {
    console.log("map props",props)
    return (
        <Map center={{ lat:props.lat, lng: props.lang }} style={{width:"200px"}}/>
    )   
}

export default index    
