import React, { useState, useEffect, useContext } from 'react';
import TruckRouteMap from './components/TruckRouteMap';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import ResultsContainer from './components/ResultsContainer';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";
import { GoogleMap, DirectionsRenderer, Marker, useJsApiLoader } from '@react-google-maps/api';
import { withEmotionCache } from '@emotion/react';

const AddJob = () => {

  const [job, setJob] = useState(null);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false)
  const [tractors, setTractors] = useState(null)
  const [drivers, setDrivers] = useState(null)
  const [logistics, setLogistics] = useState({
    revenue: 0,
    driver: '',
    tractor: '',
    startDate: '',
    client: ''
  })
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [restStops, setRestStops] = useState([]);
  const [waypointDetails, setWaypointDetails] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [stops, setStops] = useState()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
});

  const { user, setShowAlert, setAlertMsg, apiUrl } = useContext(UserContext)

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
      })
    } else {
      setError('Browser does not support geolocation')
    }
  }

  const calculateRoute = async (details) => {
    setIsCalculating(true);
    await fetch(apiUrl + '/api/costs/check', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(details)
    }).then((res) => res.json()).then((data) => {
      if (data && data.routes && data.routes[0]) {
        // Create a DirectionsResult object that DirectionsRenderer expects
        const directionsResult = {
            ...data,
            routes: data.routes.map(route => ({
                ...route,
                legs: route.legs.map(leg => ({
                    ...leg,
                    start_location: { lat: leg.start_location.lat, lng: leg.start_location.lng },
                    end_location: { lat: leg.end_location.lat, lng: leg.end_location.lng },
                    steps: leg.steps.map(step => ({
                        ...step,
                        start_location: { lat: step.start_location.lat, lng: step.start_location.lng },
                        end_location: { lat: step.end_location.lat, lng: step.end_location.lng }
                    }))
                }))
            }))
        };

        setDirectionsResponse(directionsResult);
        setRestStops(data.restStops || []);
        setWaypointDetails(data.waypointDetails || []);
        
        // Log for debugging
        console.log('Route data:', directionsResult);
    }
    })
  };

  const fetchDriversAndTractors = async () => {
    await fetch(apiUrl + "/api/user/tractorsAndUsers", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then((res) => res.json()).then((data) => {
      setDrivers(data[0])
      setTractors(data[1])
      const newLogistics = logistics
      newLogistics.driver = data[0][0]
      newLogistics.tractor = data[0][0]
      setLogistics(newLogistics)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isExpanded) {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }

    const startValue = document.getElementById('start-input').value
    const pickUpValue = document.getElementById('pick-up-input').value
    const dropOffValue = document.getElementById('drop-off-input').value

    const details = {
      stops: [
        startValue,
        pickUpValue,
        dropOffValue
      ],
      logistics
    }
    calculateRoute(details);
  };

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      getUserLocation()
      fetchDriversAndTractors()
    }
  }, [])

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 40,
    lng: -95
  };

  const truckDetails = {height: 13.5, weight: 2000}

  return (
    <div className="calculator-container">
      <DetailsInput handleSubmit={handleSubmit} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
        tractors={tractors} drivers={drivers} logistics={logistics} setLogistics={setLogistics} />
      <TruckRouteMap stops={stops} truckDetails={truckDetails} />
    </div>
  );
};

export default AddJob;