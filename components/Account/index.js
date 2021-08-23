import {React} from 'react';
import { useRouter} from 'next/router'
const Account=(props)=>{
    console.log("comses",props.data)
const router = useRouter()
    const handleroute=(url)=>{
        
        router.push({pathname:"/restaurant/"+url });
    }
    return(
        <>
     <div class="page-banner">
        <section className="main-section">
            <section className="restaurant-list">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="listing-box favourite-listing-box">
                                    <div className="col-lg-2 col-md-2" id="profile-menu">
                                        <div className="favourite-menu-section">
                                        <ul className="menu-feild frame favourite-menu">
                                                <li className="food-filter active"><a href="/profile">Profile</a></li>
                                                <li className="food-filter"><a href="#">Orders</a></li>
                                                <li className="food-filter"><a href="#">Manage Address</a></li>
                                                <li className="food-filter"><a href="/favourites">Favorite Restaurants</a></li>
                                                <li className="food-filter"><a href="#">My Tasty Points</a></li>
                                                <li className="food-filter"><a href="#">Invite a User</a></li>
                                                <li className="food-filter"><a href="#">Help</a></li>
                                            </ul>
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
  export default Account;