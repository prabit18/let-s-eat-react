import React from "react";
import dynamic from "next/dynamic";
import HomepageTopLoader from "../../Loader/HomepageTopLoader";
const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});

const OffersSection = (props) => {
  const options = {
    loop: true,
    margin: 15,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1.5,
        margin: 15,
      },
      400: {
        items: 1.8,
        margin: 15,
      },
      480: {
        items: 2.5,
        margin: 15,
      },
      600: {
        items: 3.5,
      },
      900: {
        items: 4.5,
      },
    },
  };
  var Data = [1, 2, 3, 4, 5, 6];
  return (
    <section className="offer-section">
      <div className="container custom-container">
        <div className="row">
          <div className="col-md-12">
            <OwlCarousel
              className="slider-items owl-carousel"
              id="offer-carousel"
              {...options}
            >
              {Data.map((data, i) => (
                <a href="#" className="item hvr-shrink" key={i}>
                  <img
                    // src={`images/new-offers${i + 1}.jpg`}
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-deliver-%26-offer-ads-design-template-664c0400c6b3d38642ed37f0f1e2134c_screen.jpg?ts=1591836204"
                    alt="Offer Image"
                  />
                </a>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;

{/* <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws…/1b6d1378-69ff-44e0-9898-9a320695466d/offers1.jpg`}
                    alt="Offer Image"
                  />
                </a>
                <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws…/d38cd8a9-5c16-4600-a864-549100729efe/offers2.jpg`}
                    alt="Offer Image"
                  />
                </a>
                <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws.com/public/cuisines/1c1e56fa-cbc3-4815-9cc1-076c4a6d09c5/offers3.jpg`}
                    alt="Offer Image"
                  />
                </a>
                <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws.com/public/cuisines/cabf3b65-0a9d-4f24-8100-5db0b6c8ea38/new-offers4.jpg`}
                    alt="Offer Image"
                  />
                </a>
                <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws.com/public/cuisines/0b13ce1d-b1da-44e5-aa02-d7c3051c14a2/new-offers5.jpg`}
                    alt="Offer Image"
                  />
                </a>
                <a href="#" className="item hvr-shrink">
                  <img
                     src={`https://letseat-development.s3.eu-west-1.amazonaws.com/public/cuisines/9fdea592-f72b-45d5-87ee-e78f01ba3345/offers6.jpg`}
                    alt="Offer Image"
                  />
                </a> */}