import { useState,useEffect } from "react";
import react from 'react';
import RestaurantDetail from "../RestaurantDetail";
import { useRouter} from 'next/router'
import InfiniteScroll from "react-infinite-scroll-component";

const Restaurant=(props)=>{
    const router = useRouter()
    const handleroute=(url)=>{
        
        // router.push({pathname:"/restaurant/"+url },null,{ shallow: false });
        window.location='/restaurant/'+url
    }
  
    return(
        <>     
      
        
                                     <div className="col-xl-3 col-lg-3 col-sm-6" key={props.item.id}>
                                            <div className="food-product hvr-shadow" >
                                               <a className="clickable" onClick={()=>handleroute(props.item.url)}/>
                                                 <div className="food-item">
                                                   <img alt="food-item" src={`https://development-cdn.letseat.co.uk/${props.item.image_url}`}/>
                                                    <div className="brand-logo">
                                                    <img alt="restaurant-logo" src={`https://development-cdn.letseat.co.uk/${props.item.logo}`}/>
                                                </div>
                                            </div>
                                            <div className="food-desc">
                                                <h4>{props.item.name}</h4>
                                                <p>{props.item.description}</p>
                                            </div>
                                            <div className="delivery-detail">
                                                <div className="delivery-time">
                                                    <img alt="deliver-icon" src="images/delivery-icon.svg"/>
                                                    <span>{props.item.delivery_time}</span>
                                                </div>
                                                <div className="bg-rating">
                                                    <img alt="bg-rating" src="images/bg-rating.svg"/>
                                                    <div className="rating-rank">
                                                        <img alt="star-icon" src="images/Star-icon.svg"/>
                                                        <p className={["rating-content", "m-0"].join(' ')}>{props.item.ratings.length < 2 ? props.item.ratings + '.0' : props.item.ratings}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      </div>    
                             
        </>  
    )
}
export default Restaurant;