import axios from "axios";
import { useState } from "react";
import { apiURL } from "../config/env";
export const dataService = {
    getCuisines,
    getRestaurants,
    getCuratedList,
    getMenuList,
    getRestaurant,
    getSignup,
    verifyOtp,
    getLogin,
    ResendOtp,
    socialLogin,
    Mobileupadte,
    verifyMobileNumber,
    getRestaurantsInfinite
}

async function getCuisines() {
    try {
        const data = await axios.post( apiURL+'cuisines/web/featured_cuisine_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
 

async function getRestaurants(type) {
    console.log("type is",type);
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
      
        const data = await axios.post( apiURL+'restaurants/web/list', body);
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
        const data = await axios.post( apiURL+'curatedlist/web/featured_curated_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}



async function getMenuList(type) {
    
    if(typeof type==="string"){
    var body={ "url":type};
    try {
        if(typeof type==="string"||undefined){

        const data = await axios.post( apiURL+'menu-items/web/restaurants/menu',body);
        return {error: false, data: data}
        }else{
            //debugger
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
        const data = await axios.post( apiURL+'restaurants/web/view',body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function getSignup(Email,first_name,last_name) {
    var body={
        "email":Email,
        "first_name":first_name,
        "last_name":last_name
     }
    try {
        const data = await axios.post( apiURL+'customers/web/sign_up',body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function verifyOtp(sessiontoken,otp,username) {
     var body={ 
               "otp":otp,   
               "session":sessiontoken,
               "username":username,
             }
     try {
         const data = await axios.post( apiURL+'customers/web/verify_otp',body);
         console.log("data----",data)
         return {error: false, data: data}
     } catch (e) {
         return {error: true, message: e}
     }
 }
 async function ResendOtp(username) {
    var body={ 
              "username":username,
            }
    try {
        const data = await axios.post( apiURL+'customers/web/resend_otp',body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
 async function getLogin(Email) {
     console.log(Email);
    var body={
        "username":Email
     }
    try {
        
        const data = await axios.post(apiURL+'customers/web/login',body);
        console.log("Data--->>",data)
        return data.data
    } catch (e) {
        return {error: true, message: e}
    }
}
async function socialLogin(body) {
    try {
        const data = await axios.post(apiURL+'customers/web/social_login',body);
        console.log("Data--->>",data)
        return data.data
    } catch (e) {
        return {error: true, message: e}
    }
 }
 async function Mobileupadte(Mobile_Number) {
    console.log(Mobile_Number);
   var body={
    "phone_number":"+91"+Mobile_Number
    }
    let user=JSON.parse(localStorage.getItem('user'))
    console.log("token is",user.token)
    let authorization="Bearer " +user.token.id_token
    let headers = {
        "Content-Type": "application/json",
        "Authorization": authorization,
    }
    console.log(headers)
   try {
       
       const data = await axios.post(apiURL+'customers/web/update_mobile_number',body,{headers:headers});
       console.log("Data comes from mobile update --->>",data)
       return data.data
   } catch (e) {
       return {error: true, message: e}
   }
}
async function verifyMobileNumber(sessiontoken,otp,username) {
    var body={ 
              "otp":otp,   
              "session":sessiontoken,
              "username":username,
            }
    try {
        const data = await axios.post( apiURL+'customers/web/verify_otp',body);
        console.log("data----",data)
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}