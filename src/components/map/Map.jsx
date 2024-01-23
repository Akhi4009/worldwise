import React from 'react'
import styles from "./map.module.css";
import { useNavigate } from 'react-router-dom';
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent} from "react-leaflet"
import { useState } from 'react';
import L from 'leaflet';
import markerIcon from "/location-pin.png";
import { useCities } from '../../context/CityContext';
import { useEffect } from 'react';
import {useGeolocation} from "../../hooks/useGeolocation"
import Button from '../layout/Button';
import { useUrlPosition } from '../../hooks/useUrlPosition';

function Map() {
  const {cities} = useCities();
  const [mapPosition,setMapPosition] = useState([40,0]);
  const {isLoading:isLoadinPosition,
    position:geoLocationPosition,
    getPosition
  } = useGeolocation();
   
  const [mapLat, mapLng] = useUrlPosition();
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // The point of the icon that corresponds to the marker's location
    popupAnchor: [0, -32], // The point from which the popup should open relative to the iconAnchor
  });
  
  useEffect(()=>{
    if(geoLocationPosition)
    setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng]);
  },[geoLocationPosition])

  useEffect(()=>{
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng]);
  },[mapLat,mapLng])

  return (
    <div className={styles.mapContainer}>
   
   {!geoLocationPosition && <Button type="position" onClick={getPosition}>
    {isLoadinPosition ? "Loading..." : "Use Your Position"}
    </Button>
  }
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
  <DetectClick/>
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map;