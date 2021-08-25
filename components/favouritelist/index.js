import {React, useEffect} from 'react';
import { UserAction } from '../../redux/actions/user.action';
import { connect } from 'react-redux';
import { useRouter} from 'next/router'
const FavouriteList=(props)=>{
    console.log("comses",props.data)
const router = useRouter()
    const handleroute=(url)=>{
        
        router.push({pathname:"/restaurant/"+url });
    }
    return(
        <>
         <div className="page-banner">
            <section className="main-section">
            <section className="restaurant-list">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="listing-box favourite-listing-box">
                                    <div className="col-lg-2 col-md-2" id="profile-menu">
                                        <div className="favourite-menu-section">
                                            <ul className="menu-feild frame favourite-menu">
                                                <li className="food-filter "><a href="/profile">Profile</a></li>
                                                <li className="food-filter"><a href="#">Orders</a></li>
                                                <li className="food-filter"><a href="#">Manage Address</a></li>
                                                <li className="food-filter active"><a href="/favourites">Favorite Restaurants</a></li>
                                                <li className="food-filter"><a href="#">My Tasty Points</a></li>
                                                <li className="food-filter"><a href="#">Invite a User</a></li>
                                                <li className="food-filter"><a href="#">Help</a></li>
                                            </ul>
                                        </div>
                                    </div>       
                              <div className="col-lg-10 right-favourite-col">
                                        <div className="filter-section">
                                            <div className="resto-count favourite-menu-header">
                                                <h2>Favourites</h2>
                                            </div>
                                        </div>    
                                     <div className="food-list row frame">
                                        { props.data && props.data.map((item)=>(
                                        <div className="col-xl-4 col-lg-4 col-sm-6" key={item.id}>
                                                <div className={["food-product hvr-shadow",!item.restaurant_status?"deleted-product":""].join('')} onClick={()=>handleroute(item.url)}>
                                                    <a className="clickable" href="#"></a>
                                                    <div className="food-item">
                                                        <img alt="food-item" src={`https://development-cdn.letseat.co.uk/${item.image_url}`}/>
                                                        <div className="brand-logo">
                                                            <img alt="restaurant-logo" src={`https://development-cdn.letseat.co.uk/${item.logo}`}/>
                                                        </div>
                                                    </div>
                                                    <div className="food-desc">
                                                        <h4>{item.name}</h4>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div className="delivery-detail">
                                                        <div className="delivery-time">
                                                            <img alt="deliver-icon" src="images/delivery-icon.svg"/>
                                                            <span>{item.delivery_time}</span>
                                                        </div>
                                                        <div className="bg-rating">
                                                    <img alt="bg-rating" src="images/bg-rating.svg"/>
                                                    <div className="rating-rank">
                                                        <img alt="star-icon" src="images/Star-icon.svg"/>
                                                        <p className={["rating-content", "m-0"].join(' ')}>{item.ratings.length < 2 ? item.ratings + '.0' : item.ratings}</p>
                                                    </div>
                                                </div>
                                                    </div>
                                                </div>
                                                <div className="whishlist-icon">
                                                    <img src="images/Icon feather-heart.svg" alt="whishlist-icon"/>
                                                </div>
                                            </div>
                                         ))}   
                                          </div>
                                     </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                </section>
        </section>
    </div> 
        </>
    )
}  
  export default (FavouriteList);