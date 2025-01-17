import React, { useState, useEffect, useContext } from 'react';
import MapWithRoute from './components/MapWithRoute';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import ResultsContainer from './components/ResultsContainer';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";

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
    await fetch(apiUrl + '/api/costs/check', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(details)
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      setJob(data)
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

    const addresses = [startValue, pickUpValue, dropOffValue]

    const states = []
    
    addresses.forEach((address) => {
      const stateMatch = address.match(/,\s*([A-Z]{2})\s*/);
      states.push(stateMatch ? stateMatch[1] : null)
    })

    const details = {
      addresses: [
        startValue,
        pickUpValue,
        dropOffValue
      ],
      states,
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

  return (
    <div className="calculator-container">
      <DetailsInput handleSubmit={handleSubmit} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
        tractors={tractors} drivers={drivers} logistics={logistics} setLogistics={setLogistics} />
      <div className="map-container">
        <MapWithRoute
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          origin={location}
          center={location}
          zoom={12}
        />
      </div>
    </div>
  );
};

export default AddJob;