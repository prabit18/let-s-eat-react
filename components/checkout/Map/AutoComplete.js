import React, { useState,useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { addressList } from "../../../redux/reducer/addressList.reducer";

function LocationSearchInput(props) {
  const [updateaddress, setUpdateaddress] = useState(props.address);
  const [myaddress, setmyaddress] = useState(props.address)

  const [placesService, setplacesService] = useState(
    new window.google.maps.places.PlacesService(document.createElement("div"))
  );
  const [loading, setloading] = useState(false)
  console.log("props address",props.address)

  const handleChange = (address, e) => {
    props.edit === "Add"||undefined ? setmyaddress(address) : setUpdateaddress(address);
  };

  const handleSelect = (address, placeId, e) => {
    localStorage.setItem("address", address);
    console.log("address", address, e);
    props.handleMapaddress(address)

    
    props.edit === "Add"||undefined ? setmyaddress(address) : setUpdateaddress(address);
    const request = {
      placeId: placeId,
      fields: ["name", "geometry"],
    };
    placesService.getDetails(request, (place, status) => {
      console.log("status", status);
      if (status == "OK") {
        props.onPlaceChanged(place);
      }
    });
  };
  console.log("log-->",props.currentLocation);

  useEffect(() => {
  if(props.edit==="Add"||undefined){
    setmyaddress(props.address)
  }else{
    setUpdateaddress(props.address)
  }
  }, [props.address])
  
  return (
    <>
    <PlacesAutocomplete
      value={props.edit==="Add"||undefined?myaddress:updateaddress}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="autocomplete-container">
          <div className="map-zoom">
            <div className="plus-minus">
              <button type="button" className="plus-btn" onClick={()=>{props.handleZoom("zoom-in")}}>+</button>
              <button type="button" onClick={()=>{props.handleZoom("zoom-out")}}>-</button>
            </div>
            <em className="current-location-section" style={{cursor:"pointer"}}>
            <svg
              fill="#0A83EA"
              height="22"
              role="img"
              viewBox="0 0 20 20"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
              onClick={()=>props.currentLocation()}
            >
              <title>current-location</title>
              <path d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"></path>
            </svg>
          </em>
          </div>
          
          <div class="form-group location-data">
            <img
              src="images/Icon_checkmark.svg"
              alt="icon_checkmark"
              class="checkmark_img"
            />
            {/* <label for="add-field1"></label> */}
            <input
              {...getInputProps({
                type: "text",
                id: "add-field1",
                name: "add-field1",
                className: "form-control cart-input",
                placeholder: "search for new location",
              })}
            />

            {/* <LocationSearchInput onPlaceChanged={showPlace}/> */}

            {/* <a href="#" class="change-button" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#changeLocation">Change</a> */}
          </div>
          {/* <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            /> */}
          <div
            className={
              !suggestions.length > 0
                ? "autocomplete-dropdown-container suggestion-none"
                : "autocomplete-dropdown-container suggestion-exist"
            }
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              // const style = suggestion.active
              //   ? { backgroundColor: "#fafafa", cursor: "pointer",maxWidth:"330px" }
              //   : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </>
  );
}

export default LocationSearchInput;
