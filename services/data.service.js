import axios from "axios";
import { useState } from "react";
import { apiURL } from "../config/env";
import { authHeader } from "../redux/helper/authHeader";

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
    getRestaurantsInfinite,
    AddTocart,
    RemoveItemFromcart,
    cartItems,
    bulkUpdate,
    clearCart
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
       
      
        const data = await axios.post(apiURL+'restaurants/web/list', body);
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

//cart

async function AddTocart(body){
    var payload=JSON.stringify(body)
    try{
        const data = await axios.post(apiURL+'carts/web/update',payload,{headers: authHeader()});
        return {error:false,data:data.data.data}
    }catch(e){
        return {error: true, message: e}


    }
}
//cart item remove
async function RemoveItemFromcart(body){
    var payload=JSON.stringify(body)
    try{
        const data = await axios.post(apiURL+'carts/web/delete',payload,{headers: authHeader()});
        return {error:false,data:data.data.data}
    }catch(e){
        return {error: true, message: e}


    }
}

//checkout
async function cartItems(){
    try{
    var data= await axios.post(apiURL+'carts/web/checkout',{},{headers: authHeader()})
return {error:false,data:data.data.data.data}

    }
    catch(e){
        console.log(e);
        return {error: true, message: e}

    }
}

async function bulkUpdate(body){
    try{
    let data= await axios.post(apiURL+'carts/web/bulk_update',body,{headers: authHeader()})
    console.log("data",data);
    if(data){
        localStorage.setItem('cartItem',JSON.stringify([]))
    localStorage.setItem('cart_item_objs_v1',JSON.stringify([]))
    localStorage.setItem('cart_item_objs_v2',JSON.stringify([]))
    return {error:false,data:data.data}
    }

    }
    catch(e){
        console.log(e);
        return {error: true, message: e}

    }
}
async function clearCart(){
    try{
    var data= await axios.post(apiURL+'carts/web/reset',{},{headers: authHeader()})
return {error:false,data:data.data.data}

    }
    catch(e){
        console.log(e);
        return {error: true, message: e}

    }
}