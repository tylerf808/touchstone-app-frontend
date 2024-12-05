import React, { useState, useEffect, useContext } from 'react';
import MapWithRoute from './components/MapWithRoute';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import ResultsContainer from './components/ResultsContainer';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";

const AddJob = () => {

  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false)
  const [tractors, setTractors] = useState(null)
  const [drivers, setDrivers] = useState(null)

  const { user, setShowAlert, setAlertMsg, apiUrl } = useContext(UserContext)

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude)
        setLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
      })
    } else {
      setError('Browser does not support geolocation')
    }
  }

  const calculateRoute = async () => {
    try {
      setAlertMsg(null);
      setShowAlert(false)
    } catch (err) {
      setAlertMsg(err.message);
      setShowAlert(true)
    }
  };

  const fetchDriversAndTractors = async () => {
    await fetch(apiUrl + "/api/user/tractorsAndUsers", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      setDrivers(data[0])
      setTractors(data[1])
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const startValue = document.getElementById('start-input').value
    const pickUpValue = document.getElementById('pick-up-input').value
    const dropOffValue = document.getElementById('drop-off-input').value

    const details = {
      addresses: {
        start: startValue,
        pickUpV: pickUpValue,
        dropOff: dropOffValue
      },
      revenue: 0,
      driver: '',
      tractor: 0,
      startDate: '',
      endDate: '',
    }
    calculateRoute();
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
      <DetailsInput calculateRoute={calculateRoute} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
        tractors={tractors} drivers={drivers} />
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