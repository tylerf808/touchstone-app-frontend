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
  const [profitable, setProfitable] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false)
  const [tractors, setTractors] = useState(null)
  const [drivers, setDrivers] = useState(null)
  const [logistics, setLogistics] = useState({
    revenue: 0,
    driver: '',
    tractor: 0,
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
        setLocation([{ lat: parseFloat(latitude), lng: parseFloat(longitude) }, {lat: parseFloat(latitude) + 1, lng: parseFloat(longitude + 1)}])
      })
    } else {
      setError('Browser does not support geolocation')
    }
  }

  // const getDefaultMap = async () => {
  //     const formattedLatLng = []
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coord
  //       formattedLatLng = [{ lat: parseFloat(latitude), lng: parseFloat(longitude) }, {lat: parseFloat(latitude+ 1) , lng: parseFloat(longitude + 1)}]
  //     })
  //     await fetch(`https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/map?pt1=${formattedLatLng[0].lat}%2C${formattedLatLng[0].lng}&pt2=${formattedLatLng[1].lat}%2C${formattedLatLng[1].lng}&style=Modern&format=image%2Fjpeg&height=300&SRS=EPSG%3A900913&width=600&region=NA&dataset=Current`, {
  //       method: 'GET',
  //       headers: {
  //         "Authorization": process.env.REACT_APP_TRIMBLE_API_KEY
  //       }
  //     }).then((res) => console.log(res))

    
  // }

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
      setLoaded(true)
  
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
      newLogistics.tractor = data[1][0].internalNum
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
      start: startValue,
      pickUp: pickUpValue,
      dropOff: dropOffValue,
      tractor: parseInt(logistics.tractor),
      client: logistics.client,
      driver: logistics.driver,
      revenue: logistics.revenue,
      startDate: logistics.startDate
    }
    console.log(details)
    calculateRoute(details);
  };

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      // getUserLocation()
      // getDefaultMap()
      fetchDriversAndTractors()
    }
  }, [])

  return (
    <div className="calculator-container">
      <DetailsInput handleSubmit={handleSubmit} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
        tractors={tractors} drivers={drivers} logistics={logistics} setLogistics={setLogistics} 
        profitable={profitable} loaded={loaded} job={job}/>
      <div className="map-container">

      </div>
    </div>
  );
};

export default AddJob;