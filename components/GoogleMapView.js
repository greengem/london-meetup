"use client";
import { UserLocationContext } from '@/context/UserLocationContext';
import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import Markers from '@/components/Markers';

export default function GoogleMapView({ businessList}) {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);

  const containerStyle = {
    width: '100%',
    height: '100vh'
  }


  return (
      <LoadScript 
        googleMapsApiKey='AIzaSyD1-7MUSN50ulvjMHdWDEeHFj5rotY0jCs'
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={14}
        >
          <MarkerF
            position={userLocation}
          />
          {businessList.map((item,index)=>index<=7&&(
            <Markers business={item} key={index}/>
          ))}
        </GoogleMap>
      </LoadScript>
  )
}
