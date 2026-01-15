import React, { useState, useEffect, useContext } from 'react';
import './addJobStyles.css';
import { CircularProgress } from "@mui/material";
import DetailsInput from './components/DetailsInput';
import ResultsContainer from './components/ResultsContainer';
import UserContext from '../../helpers/Context'
import { useNavigate } from "react-router-dom";
import * as atlas from 'azure-maps-control'
import "azure-maps-control/dist/atlas.min.css";

const AddJob = ({ setShowAlert, setAlertMsg }) => {
  const [job, setJob] = useState(null);
  const [error, setError] = useState('')
  const [isExpanded, setIsExpanded] = useState(false);
  const [tractors, setTractors] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [logistics, setLogistics] = useState({
    revenue: 0,
    driver: '',
    startDate: '',
    client: '',
    hazmat: false,
    fastest: true
  });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

    setAlertMsg('')
    setShowAlert(false)

    // Get addresses from input elements
    const startElement = document.getElementById('start-input');
    const pickupElement = document.getElementById('pick-up-input');
    const dropoffElement = document.getElementById('drop-off-input');

    if (startElement.value === '' || pickupElement === '' || dropoffElement === '') {
      setAlertMsg('Missing an input')
      setShowAlert(true)
    }

    if (logistics.revenue === 0 || logistics.driver === '' || logistics.startDate === ''
      || logistics.driver === '' || logistics.client === '') {
      setAlertMsg('Missing an input')
      setShowAlert(true)
    }

    try {
      setLoading(true);
      setError(null);

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
        logistics: logistics
      };

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

      if (!data) {
        throw new Error('No route data received from server');
      }

      setJob(data)
      setShowResults(true);
      setLoading(false)
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
    <div className={`top-[8rem]  w-[54rem] h-[36rem] relative justify-self-center rounded-lg ${showResults ? 'expand' : 'bg-white'}`}>
      {!showResults ? (
        loading ? (
          <div className='self-center justify-self-center flex flex-col items-center justify-center h-full w-full'>
            <CircularProgress className='self-center justify-self-center' style={{ color: 'orange' }} />
            <p className='self-center justify-self-center' style={{ color: 'gray' }}>Calculating route...</p>
          </div>
        ) : (
          <DetailsInput
            findRoute={findRoute}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            tractors={tractors}
            drivers={drivers}
            logistics={logistics}
            setLogistics={setLogistics}
            job={job}
            addJob={addJob}
          />
        )
      ) : (
        <ResultsContainer
          addJob={addJob}
          job={job}
          setJob={setJob}
          setShowResults={setShowResults}
          setError={setError}
        />
      )}
    </div>
  );
};

export default AddJob;