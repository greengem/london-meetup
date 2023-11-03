"use client"
import { useState, useEffect } from 'react';
import { UserLocationContext } from '@/context/UserLocationContext';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';

export default function Providers({ children }) {
    
    const [userLocation, setUserLocation] = useState({lat: null, lng: null});
    const [selectedBusiness, setSelectedBusiness] = useState([]);

    useEffect(()=>{
      getUserLocation();
    },[])
    const getUserLocation=()=>{
      navigator.geolocation.getCurrentPosition(function(pos){
        setUserLocation({
          lat:pos.coords.latitude,
          lng:pos.coords.longitude
        })
      })
    }

    return (
      <SelectedBusinessContext.Provider value={{selectedBusiness, setSelectedBusiness}}>
        <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
          {children}
        </UserLocationContext.Provider>
      </SelectedBusinessContext.Provider>
    );
};
