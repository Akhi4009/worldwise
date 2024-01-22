import React from 'react'
import styles from "./map.module.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {MapContainer,TileLayer,Marker,Popup, useMap} from "react-leaflet"
import { useState } from 'react';
import L from 'leaflet';
import markerIcon from "/location-pin.png";
import { useCities } from '../../context/CityContext';
import { useEffect } from 'react';
function Map() {
  const navigate = useNavigate();
  const {cities} = useCities();
  const [mapPosition,setMapPosition] = useState([40,0]);
  const [searchParams] = useSearchParams()

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');
  
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // The point of the icon that corresponds to the marker's location
    popupAnchor: [0, -32], // The point from which the popup should open relative to the iconAnchor
  });

  useEffect(()=>{
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng]);
  },[mapLat,mapLng])
  return (
    <div className={styles.mapContainer}
   
    >
    <MapContainer 
    center={mapPosition} 
    zoom={7}
     scrollWheelZoom={true} className={styles.map}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
    { cities.map(city=>(
      <Marker position={[city.position.lat,city.position.lng]} icon={customIcon}key={city.id} >
      <Popup>
       <span>{city.cityName}</span>
      </Popup>
    </Marker>
    ))
  }
  <ChangeCenter position={mapPosition}/>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null;
}

export default Map;