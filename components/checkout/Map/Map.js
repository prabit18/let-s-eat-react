import React, { useState, useRef, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationSearchInput from "./AutoComplete";
import MapContext from "../../Context/MapContext";
import { GooleMapApiKey } from "../../../config/env";
import Geocode from "react-geocode";

function MapContainer(props) {
  let API_Key=GooleMapApiKey
  // const{places,setplaces,mapRef}=useContext(MapContext)
  const [places, setplaces] = useState([]);
  const mapRef = useRef("");
  
  const [placesService, setplacesService] = useState(
    new window.google.maps.places.PlacesService(document.createElement("div"))
  );
  // const [location, setlocation] = useState({lat:'',lng:''})
  console.log("props map", props);

  const showPlace = (place) => {
    console.log("place", place.geometry.location.lat());
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    localStorage.setItem("latlong", JSON.stringify({ lat, lng }));
    setplaces([place]);
    mapRef.current.map.setCenter(place.geometry.location);
  };
  console.log("props map", props);
  const [location, setlocation] = useState({ lat: props.lat, lng: props.lang });
  const loc = {
    lat: props.lat,
    lng: props.lang,
  };
  const onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    localStorage.setItem("latlong", JSON.stringify({ lat, lng }));
  };
  const [zoom, setzoom] = useState(12);
  const handleZoomIncrement = (type) => {
    if (type === "zoom-in") {
      setzoom(zoom + 1);
    } else {
      setzoom(zoom - 1);
    }
  };
  useEffect(() => {}, [location]);
  const getCurrentLoaction = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos),
        (err) => deniedPosition(err)
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };
  const successPosition = (position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    localStorage.setItem("latlong", JSON.stringify({ lat, lng }));
    Geocode.setApiKey(API_Key);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromLatLng("13.9370204", "75.1503554").then(
      (response) => {
        const formatted_address = response.results[0].formatted_address;
        console.log("formatted_address:", formatted_address);
        localStorage.setItem("address", formatted_address);
        
          props.handleMapaddress(formatted_address)

       
        setlocation({ lat: lat, lng: lng });
        const request = {
          placeId: response.results[0].place_id,
          fields: ["name", "geometry"],
        };
        placesService.getDetails(request, (place, status) => {
          console.log("status", status);
          if (status == "OK") {
            showPlace(place);
          }
        });
        // setaddress(formatted_address)
      },
      (error) => {
        console.error(error);
      }
    );
  };
  // const onPlaceChanged=(e)=>{
  //   console.log("place changed",e);
  // }
  return (
    <>
      <div className="map">
        <Map
          ref={mapRef}
          google={props.google}
          zoom={zoom}
          initialCenter={location}
          
          style={{ minWidth: "330px", height: "200px" }}
          
        >
          {places.length > 0 ? (
            places.map((place, i) => (
              <Marker
              icon="/images/Location Pin-V2-new.svg/"
                key={i}
                position={place.geometry.location}
                draggable
                onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
                style={{width:"50px",height:"50px"}}
              />
            ))
          ) : (
            <Marker
              icon="/images/Location Pin-V2-new.svg"
              position={loc}
              draggable
              onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
            />
          )}
        </Map>
      </div>
      <LocationSearchInput
        onPlaceChanged={showPlace}
        address={props.address}
        zoom={zoom}
        handleZoom={handleZoomIncrement}
        currentLocation={getCurrentLoaction}
        handleMapaddress={props.handleMapaddress}
        edit={props.edit}
        
      />
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: GooleMapApiKey,
  libraries: ["places"],
})(MapContainer);
