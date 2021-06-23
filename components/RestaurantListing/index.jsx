import React from 'react';


const RestaurantListingPage = () => {
	const resto = [
		{id: 1, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/kfc.jpg',foodimgurl:'images/food-list2.jpg',rating:'4.3',deliverytime:'45 min'},
		{id: 2, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/wimpy.jpg',foodimgurl:'images/food-list3.jpg',rating:'4.1',deliverytime:'35 min'},
		{id: 3, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/mcd.jpg',foodimgurl:'images/food-list4.jpg',rating:'4.2',deliverytime:'22 min'},
		{id: 4, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/wimpy.jpg',foodimgurl:'images/food-list5.jpg',rating:'4.5',deliverytime:'35 min'},
		{id: 5, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/ph.jpg',foodimgurl:'images/food-list6.jpg',rating:'4.6',deliverytime:'25 min'},
		{id: 6, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/mcd.jpg',foodimgurl:'images/food-list7.jpg',rating:'4.2',deliverytime:'15 min'},
		{id: 7, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/KFC.jpg',foodimgurl:'images/food-list8.jpg',rating:'4.3',deliverytime:'45 min'},
		{id: 8, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/mcd.jpg',foodimgurl:'images/food-list9.jpg',rating:'4.1',deliverytime:'35 min'},
		{id: 9, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/d.jpg',foodimgurl:'images/food-list0.jpg',rating:'4.2',deliverytime:'22 min'},
		{id: 10, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/ph.jpg',foodimgurl:'images/food-list11.jpg',rating:'4.5',deliverytime:'35 min'},
		{id: 11, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/wimpy.jpg',foodimgurl:'images/food-list12.jpg',rating:'4.6',deliverytime:'25 min'},
		{id: 12, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/d.jpg',foodimgurl:'images/food-list13.jpg',rating:'4.2',deliverytime:'15 min'},
		{id: 13, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/KFC.jpg',foodimgurl:'images/food-list14.jpg',rating:'4.3',deliverytime:'45 min'},
		{id: 14, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/ph.jpg',foodimgurl:'images/food-list15.jpg',rating:'4.1',deliverytime:'35 min'},
		{id: 15, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/wimpy.jpg',foodimgurl:'images/food-list16.jpg',rating:'4.2',deliverytime:'22 min'},
		{id: 16, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/d.jpg',foodimgurl:'images/food-list0.jpg',rating:'4.5',deliverytime:'35 min'},
		{id: 17, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/mcd.jpg',foodimgurl:'images/food-list1.jpg',rating:'4.6',deliverytime:'25 min'},
		{id: 18, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/d.jpg',foodimgurl:'images/food-list0.jpg',rating:'4.2',deliverytime:'15 min'},
		{id: 19, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/d.jpg',foodimgurl:'images/food-list0.jpg',rating:'4.2',deliverytime:'22 min'},
		{id: 20, name: 'KFC', text: 'Lorem ipsum dolor sit consetetur sadipscing elitr.', logoImgurl: 'images/ph.jpg',foodimgurl:'images/food-list11.jpg',rating:'4.5',deliverytime:'35 min'},

        
	]
	const result=[];

	for(let i=0;i<resto.length;i+=1)
	{ 
		result.push(
			 
                                     <div className="col-xl-3 col-lg-3 col-sm-6">
                                        <div className="food-product hvr-shadow">
                                            <a className="clickable" href="#"></a>
                                            <div className="food-item">
                                                <img alt="food-item" src={resto[i].foodimgurl}/>
                                                <div className="brand-logo">
                                                    <img alt="restaurant-logo" src={resto[i].logoImgurl}/>
                                                </div>
                                            </div>
                                            <div className="food-desc">
                                                <h4>{resto[i].name}</h4>
                                                <p>{resto[i].text}</p>
                                            </div>
                                            <div className="delivery-detail">
                                                <div className="delivery-time">
                                                    <img alt="deliver-icon" src="images/delivery-icon.svg"/>
                                                    <span>{resto[i].deliverytime}</span>
                                                </div>
                                                <div className="bg-rating">
                                                    <img alt="bg-rating" src="images/bg-rating.svg"/>
                                                    <div className="rating-rank">
                                                        <img alt="star-icon" src="images/Star-icon.svg"/>
                                                        <p className="rating-content">{resto[i].rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
				)
	}

	return (
		<>
        <section className="restaurant-list">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="listing-box">
                                <div className="filter-section">
                                    <div className="resto-count">
                                        <h2>680 Restaurents</h2>
                                    </div>
                                    <div className="filter-box custom-scroll">
                                        <ul>
                                            <li><a href="#">Rating</a></li>
                                            <li><a href="#">Delivery Time</a></li>
                                            <li><a href="#">Pure Veg</a></li>
                                            <li><a href="#">Offers</a></li>
                                            <li className="filter"><a href="#">Filters
                                                <span>
                                        <img alt="filter-icon" src="images/filter.svg"/>
                                    </span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="food-list row frame">
									{result}
							    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
				   

              

								</>	
	
)}

export default RestaurantListingPage;