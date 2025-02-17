import React, { useState, useEffect, useContext } from 'react';
import MapWithRoute from './components/MapWithRoute';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import ResultsContainer from './components/ResultsContainer';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";
import parseAddress from '../../helpers/parseAddress'

const AddJob = () => {

  const [job, setJob] = useState(null);
  const [profitable, setProfitable] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);

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

  const { user, setShowAlert, setAlertMsg, apiUrl, location } = useContext(UserContext)

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  const getDefaultMap = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      fetch("https://pcmiler.alk.com/apis/rest/v1.0/service.svc/mapRoutes?dataset=Current", {
        method: 'POST',
        headers: {
          "Authorization": process.env.REACT_APP_TRIMBLE_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Map: {
            Viewport: {
              Center: {
                Lat: latitude,
                Lon: longitude
              },
              ZoomRadius: 200,
              ZoomRadiusSpecified: true,
              Region: 0
            },
            Width: window.innerWidth - 20,
            Height: window.innerHeight - 80,
          }
        })
      }).then((res) => res.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob)
          document.getElementById('mapImage').src = imageUrl
        })
    })
  }

  const calculateRoute = async (details) => {

    console.log(details)

    const startObj = parseAddress(details.start)
    const pickUpObj = parseAddress(details.pickUp)
    const dropOffObj = parseAddress(details.dropOff)

    await fetch(apiUrl + '/api/costs/check', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(details)
    }).then((res) => res.json()).then((data) => {
      setJob(data)
      setLoaded(true)
    })

    await fetch('https://pcmiler.alk.com/apis/rest/v1.0/service.svc/mapRoutes?dataset=Current', {
      method: 'POST',
      headers: {
        "Authorization": process.env.REACT_APP_TRIMBLE_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          Map: {
            Viewport: {
              Center: null,
              ScreenCenter: null,
              ZoomRadius: 0,
              CornerA: null,
              CornerB: null,
              Region: 0
            },
            Width: window.innerWidth - 20,
            Height: window.innerHeight - 20,
            PinDrawer: {
              Pins: [
                {
                  Point: {
                    Lat: 41.63411,
                    Lon: -87.96074
                  },
                  Image: "ltruck_r"
                },
                {
                  Point: {
                    Lat: 25.75312,
                    Lon: -80.29229
                  },
                  Image: "lbldg_bl"
                }
              ]
            },
            Routes:
              [
                {
                  Stops: [
                    {
                      Address: { startObj }
                    },
                    {
                      Address: { pickUpObj }
                    },
                    {
                      Address: { dropOffObj }
                    }
                  ]
                }
              ]
          }
        }
      )

    }).then((res) => {
      return res.blob()
    }).then((blob) => {
      const imageUrl = URL.createObjectURL(blob); // Create object URL
      document.getElementById("mapImage").src = imageUrl; // Set to an <img> tag
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
      if (!job) {
        getDefaultMap()
      }
      fetchDriversAndTractors()
    }
  }, [])

  return (
    <div className="calculator-container">
      <DetailsInput handleSubmit={handleSubmit} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
        tractors={tractors} drivers={drivers} logistics={logistics} setLogistics={setLogistics}
        profitable={profitable} loaded={loaded} job={job} />
      <div className="map-container">
        <img id='mapImage' />
      </div>
    </div>
  );
};

export default AddJob;