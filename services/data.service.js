import axios from "axios";
import { useState } from "react";
export const dataService = {
    getCuisines,
    getRestaurants,
    getCuratedList,
    getMenuList,
    getRestaurant,
    getRestaurantsInfinite
}

async function getCuisines() {
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/cuisines/web/featured_cuisine_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
 

async function getRestaurants(type) {
    
    console.log(typeof type)
    try {
         
           var body={};
         if(type==="pure_veg")
         {
             body={
                  "Filter":{
        "key":type,
        "value":"true"
    }
             }
         }
       else if (type==="ratings") {
            body={
                
       "sort_by":{
        "key":type,
        "value":"desc"
             }
            }      
       }else if(typeof type==="number"){
                body={
                    "pagination":{
                     "page_size":10,
                     "page":type
                     }
                 }
       }
       else if (type) {
            body={      
       "sort_by":{
        "key":type,
        "value":"asc"
             }
            }      
       }
      
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/restaurants/web/list', body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}

async function getRestaurantsInfinite(type) {
    var body={}
    console.log(typeof type)
    try {
         
            
       if(typeof type==="number"){
                body={
                    "pagination":{
                     "page_size":10,
                     "page":parseInt(type)
                     }
                 }
       }
       
      
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/restaurants/web/list', body);
        return data.data
    } catch (e) {
        return {error: true, message: e}
    }
}


async function getCuratedList(type) {
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/curatedlist/web/featured_curated_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}



async function getMenuList(type) {
    
    if(typeof type==="string"){
    console.log("prakash",typeof type);
    var body={ "url":type};
    try {
        if(typeof type==="string"||undefined){

        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/menu-items/web/restaurants/menu',body);
        //localStorage.setItem('menuItems',JSON.stringify(data.data.data))
        return {error: false, data: data}
        }else{
            debugger
            console.log("cart details",type)
           var menulist=type;
           menulist["error"]=false
            console.log("body",menulist);
            return {error: false, data: menulist}
}
    } catch (e) {
        return {error: true, message: e}
    }
}


}
async function getRestaurant(type) {
    //console.log('s',type);
    var body={"url":type};
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/restaurants/web/view',body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}