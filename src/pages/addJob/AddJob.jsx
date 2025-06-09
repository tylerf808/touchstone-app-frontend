import React, { useState, useEffect, useContext } from 'react';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";
import * as atlas from 'azure-maps-control'
import "azure-maps-control/dist/atlas.min.css";

const AddJob = () => {
  const [job, setJob] = useState(null);
  const [profitable, setProfitable] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tractors, setTractors] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [selectedTractor, setSelectedTractor] = useState()
  const [logistics, setLogistics] = useState({
    revenue: 0,
    driver: '',
    startDate: '',
    client: '',
    hazmat: []
  });
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { apiUrl, location } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchDriversAndTractors = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/tractorsAndUsers`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDrivers(data[0]);
      setTractors(data[1]);
      setSelectedTractor(data[1][0])
      setLogistics(prevLogistics => ({
        ...prevLogistics,
        driver: data[0][0]
      }));
    } catch (err) {
      console.error("Error fetching drivers and tractors:", err);
      setError("Failed to load drivers and tractors data");
    }
  };

  const addJob = async () => {
    try {
      if (!job) {
        throw new Error("No job data to submit");
      }

      const response = await fetch(`${apiUrl}/api/jobs/newJob`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(job)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJob(null);
      return data;
    } catch (err) {
      console.error("Error adding job:", err);
      setError("Failed to add job: " + err.message);
      return null;
    }
  };

  // Find route by sending addresses to backend
  const findRoute = async (e) => {
    // Prevent form submission default behavior
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      setLoading(true);
      setError(null);

      // Get addresses from input elements
      const startElement = document.getElementById('start-input');
      const pickupElement = document.getElementById('pick-up-input');
      const dropoffElement = document.getElementById('drop-off-input');

      if (!startElement || !pickupElement || !dropoffElement) {
        throw new Error('Could not find one or more address input elements');
      }

      const dateObj = new Date(logistics.startDate)

      const formattedStartDate = dateObj.toISOString().split('.')[0] + 'Z';

      const startAddr = startElement.value;
      const waypointAddr = pickupElement.value;
      const endAddr = dropoffElement.value;

      // Validate addresses
      if (!startAddr || !waypointAddr || !endAddr) {
        throw new Error('Please enter all three addresses');
      }

      // Create request payload
      const payload = {
        startAddress: startAddr,
        pickupAddress: waypointAddr,
        dropoffAddress: endAddr,
        startDate: formattedStartDate,
        tractor: selectedTractor,
        logistics: logistics
      };
      console.log(payload)

      // Make request to your backend
      const response = await fetch(`${apiUrl}/api/costs/calculate`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data)

      if (!data) {
        throw new Error('No route data received from server');
      }

    } catch (err) {
      setError(`Error calculating route: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch drivers and tractors when component mounts
    fetchDriversAndTractors();
  }, []);

  return (
    <div className="calculator-container">
      <DetailsInput
        findRoute={findRoute}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        tractors={tractors}
        drivers={drivers}
        logistics={logistics}
        setLogistics={setLogistics}
        profitable={profitable}
        loaded={loaded}
        job={job}
        addJob={addJob}
        selectedTractor={selectedTractor}
        setSelectedTractor={setSelectedTractor}
      />

      <div className="results-container">
        {loading ?
          <div className="loading-container">
            <CircularProgress />
            <p>Calculating route...</p>
          </div>
          :
          <div className="route-info-container">
            
          </div>
        }
      </div>
    </div>
  );
};

export default AddJob;