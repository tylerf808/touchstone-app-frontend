import { CircularProgress } from "@mui/material";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from "react-router-dom";
import './addJobStyles.css'

const { apiUrl, mapsApiKey } = require('../../urls.json')

export default function AddJob({ user, loggedIn, setShowAlert, setAlertMsg, library }) {

  const [showJobBtn, setShowJobBtn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [drivers, setDrivers] = useState([])
  const [profitable, setProfitable] = useState(false);
  const [job, setJob] = useState({});
  const statesArray = [];

  const navigate = useNavigate();

  useEffect(() => {

    let userID

    if(user.accountType === 'dispatcher'){
      userID = user.admin
    } else {
      userID = user.username
    }

    if (!loggedIn) {
      navigate('/')
    }
    async function getDrivers(user) {
      const response = await fetch(apiUrl + '/api/user/getDrivers', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin: user })
      }).then((res) => res.json())
      setDrivers(response)
    }
    getDrivers(userID)
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
    libraries: library,
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const checkJob = async (e) => {

    e.preventDefault()

    let userID

    if(user.accountType === 'dispatcher'){
      userID = user.admin
    } else {
      userID = user.username
    }

    setTimeout(() => {
      document.getElementById('loading-progress-msg').innerHTML = 'Fetching gas costs'
    }, 3000)

    const start = document.getElementById("start").value
    const pickUp = document.getElementById("pick-up").value
    const dropOff = document.getElementById("drop-off").value
    const pay = document.getElementById("revenue").value
    const date = document.getElementById("date").value
    const client = document.getElementById("client").value
    const driver = document.getElementById("driver").value

    const jobResultsDiv = document.getElementById('job-results')

    setAlertMsg("")
    setShowAlert(false)
    setShowResults(false)

    if (
      start === "" ||
      pickUp === "" ||
      dropOff === "" ||
      pay === "" ||
      date === "" ||
      client === '' ||
      driver === ''
    ) {
      setAlertMsg("Missing an entry")
      setShowAlert(true)
      setShowLoading(false)
      return;
    }

    document.getElementById('job-results').style.display = 'inline'
    setShowJobBtn(false)
    setShowLoading(true)
    setShowResults(true)

    jobResultsDiv.scrollIntoView()

    const geocoder = new window.google.maps.Geocoder();

    const geoStart = await geocoder.geocode({ address: start });
    const geoPickUp = await geocoder.geocode({ address: pickUp });
    const geoDropOff = await geocoder.geocode({ address: dropOff });

    statesArray.push(geoStart.results[0].address_components[4].short_name);
    statesArray.push(geoPickUp.results[0].address_components[4].short_name);
    statesArray.push(geoDropOff.results[0].address_components[4].short_name);

    const checkRes = await fetch(apiUrl + "/api/costs/check", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: start,
        pick_up: pickUp,
        drop_off: dropOff,
        state1: statesArray[0],
        state2: statesArray[1],
        state3: statesArray[2],
        username: userID
      })
    }).then((data) => data.json());

    setTimeout(() => {
      if (showLoading !== false) {
        document.getElementById('loading-progress-msg').innerHTML = 'Calculating total cost'
      } else {

      }
    }, 2000)

    const grossProfitCosts =
      parseFloat((checkRes.costs.odc) +
        (checkRes.costs.factor * pay) +
        (checkRes.costs.laborRate * pay) +
        (checkRes.costs.payrollTax * (checkRes.costs.laborRate * pay)) +
        (checkRes.costs.dispatch * pay) +
        checkRes.gasCost);
    const operationProfitCosts =
      parseFloat(checkRes.costs.insurance +
        (checkRes.costs.tractorLease / checkRes.costs.tractorNum) +
        (checkRes.costs.trailerLease / checkRes.costs.tractorNum) +
        checkRes.costs.gAndA);
    const netProfitCosts =
      parseFloat(
        checkRes.costs.repairs +
        checkRes.costs.loan);
    const totalCost = ((operationProfitCosts) + (grossProfitCosts) + (netProfitCosts)).toFixed(2);

    setShowLoading(false);

    console.log(checkRes)

    const newJob = {
      start: start,
      pickUp: pickUp,
      dropOff: dropOff,
      revenue: parseFloat(pay),
      grossProfitPercentage: (((pay - grossProfitCosts) / pay) * 100).toFixed(2) + "%",
      operatingProfitPercentage:
        (((pay - (operationProfitCosts + grossProfitCosts)) / pay) * 100).toFixed(2) + "%",
      netProfitPercentage: (((pay - totalCost) / pay) * 100).toFixed(2) + "%",
      distance: checkRes.distance.toFixed(2),
      date: date,
      user_id: user,
      gasCost: checkRes.gasCost.toFixed(2),
      factor: parseFloat((checkRes.costs.factor * pay).toFixed(2)),
      gAndA: parseFloat(checkRes.costs.gAndA).toFixed(2),
      loan: parseFloat(checkRes.costs.loan).toFixed(2),
      odc: parseFloat(checkRes.costs.odc * pay).toFixed(2),
      repairs: parseFloat((checkRes.costs.repairs / checkRes.costs.tractorNum)).toFixed(2),
      ratePerMile: parseFloat((pay / checkRes.distance).toFixed(2)),
      labor: parseFloat((checkRes.costs.laborRate * pay).toFixed(2)),
      payrollTax: parseFloat((checkRes.costs.payrollTax * (checkRes.costs.laborRate * pay)).toFixed(2)),
      netProfit: parseFloat((pay - totalCost)).toFixed(2),
      grossProfit: parseFloat((pay - grossProfitCosts).toFixed(2)),
      operatingProfit: parseFloat((pay - (operationProfitCosts + grossProfitCosts)).toFixed(2)),
      insurance: checkRes.costs.insurance / checkRes.costs.tractorNum,
      dispatch: parseFloat((pay * checkRes.costs.dispatch).toFixed(2)),
      laborRatePercent: checkRes.costs.laborRate * 100 + "%",
      trailer: parseFloat((checkRes.costs.trailerLease / checkRes.costs.tractorNum).toFixed(2)),
      tractor: parseFloat((checkRes.costs.tractorLease / checkRes.costs.tractorNum).toFixed(2)),
      totalFixedCost: parseFloat((
        checkRes.costs.tractorLease +
        checkRes.costs.trailerLease +
        checkRes.costs.insurance +
        checkRes.costs.gAndA
      ).toFixed(2)),
      tolls: parseFloat(checkRes.tolls * 8).toFixed(2),
      client: client,
      driver: driver,
      admin: userID,
      totalCost: parseFloat(totalCost),
      driveTime: checkRes.duration
    }

    console.log(newJob)

    setJob(newJob)

    if (parseFloat(totalCost) > pay) {
      setProfitable(false);
      setShowJobBtn(false);
      setShowResults(true);
    } else {
      setShowJobBtn(true);
      setShowResults(true);
      setProfitable(true);
    }
  };
  
  const addJob = async () => {
    await fetch(apiUrl + "/api/jobs/newJob", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setShowJobBtn(false);
    setShowResults(false);
    document.getElementById('job-results').style.display = 'none'
    document.getElementById("start").value = ''
    document.getElementById("pick-up").value = ''
    document.getElementById("drop-off").value = ''
    document.getElementById("revenue").value = ''
    document.getElementById("date").value = ''
    document.getElementById("client").value = ''
    document.getElementById("driver").value = ''
  };

  const clearResults = () => {
    setShowResults(false)
    document.getElementById('job-results').style.display = 'none'
    document.getElementById("start").value = ''
    document.getElementById("pick-up").value = ''
    document.getElementById("drop-off").value = ''
    document.getElementById("revenue").value = ''
    document.getElementById("date").value = ''
    document.getElementById("client").value = ''
    document.getElementById("driver").value = ''
  }

  return (
    <div className="pageContainer">
      <form className="jobInputsForm" id="check-job-form">
        <div className="routeInputsContainer">
          <div className="jobInputsHeader">
            <h2 style={{ color: 'orange' }}>Route</h2>
          </div>
          <div className="routeInputsItem">
            <p className="jobInputsLabel">Start</p>
            <Autocomplete className="autocompleteContainer">
              <input className="addressInput" name="start" id="start" type="text" />
            </Autocomplete>
          </div>
          <div className="routeInputsItem">
            <p className="jobInputsLabel">Pick Up</p>
            <Autocomplete className="autocompleteContainer">
              <input className="addressInput" name="pickUp" id="pick-up" type="text" />
            </Autocomplete>
          </div>
          <div className="routeInputsItem" id="bottom-item">
            <p className="jobInputsLabel">Drop Off</p>
            <Autocomplete className="autocompleteContainer" id='drop-off-auto'>
              <input className="addressInput" name="dropOff" id="drop-off" type="text" />
            </Autocomplete>
          </div>
        </div>
        <div className="revenueInputContainer">
          <div className="jobInputsHeader">
            <h2 style={{ color: 'orange' }}>Revenue</h2>
          </div>
          <div style={{ marginTop: '2rem' }} className="inputContainer" id="bottom-item">
            <p className="jobInputsLabel">$</p>
            <input className="textInput" type='number' placeholder="Enter Dollar Amount" name="revenue" id='revenue' />
          </div>
        </div>
        <div className="detailInputsContainer">
          <div className="jobInputsHeader">
            <h2 style={{ color: 'orange' }}>Details</h2>
          </div>
          <div className="detailInputsItem">
            <p className="jobInputsLabel">Date</p>
            <input className="textInput" type='date' name="date" id='date' />
          </div>
          <div className="detailInputsItem">
            <p className="jobInputsLabel">Client</p>
            <input className="textInput" id="client" placeholder="Enter Clients Name" name="client" ></input>
          </div>
          <div className="detailInputsItem" id="bottom-item">
            <p className="jobInputsLabel">Driver</p>
            <select className="textInput" id="driver" name="driver" >
              {drivers.map((el, i) => {
                return (
                  <option key={i} value={el.name}>{el.name}</option>
                )
              })}
            </select>
          </div>
        </div>
      </form>
      <div className="checkJobBtnContainer">
        <button className="checkJobBtn" onClick={checkJob}>Check Job</button>
      </div>
      <div className="jobResults" id="job-results">
        {showResults ?
          <>
            {showLoading ?
              <div className="loadingCircleContainer">
                <CircularProgress size='4em' sx={{ color: 'orange' }}></CircularProgress>
                <p id="loading-progress-msg" style={{ marginTop: '1rem' }}>Checking route</p>
              </div>
              :
              <div className="jobResultsContainer">
                <div className="resultsHeaderContainer" >
                  {profitable ? <h1 style={{ color: 'green' }}>Job is Profitable</h1> : <h1 style={{ color: 'maroon' }}>Job is NOT Profitable</h1>}
                </div>
                <div className="checkJobDisplay" >
                  <div id="profit-label" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                    <p>Revenue</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                    <span><CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.revenue} prefix="$" style={{ fontSize: '1.2rem' }} /></span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Labor</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.labor} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Payroll Tax</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.payrollTax} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Dispatch</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.dispatch} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Factor</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.factor} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Fuel</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.gasCost} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Tolls</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.tolls} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>ODC</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.odc} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div id="profit-label" className="jobDisplayItem" >
                    <p>Gross Profit</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem" >
                    <span><CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.grossProfit} prefix="$" style={{ fontSize: '1.2rem' }} /></span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Fixed Costs</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.totalFixedCost} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div id="profit-label" className="jobDisplayItem">
                    <p>Operating Profit</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem">
                    <span><CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.operatingProfit} prefix="$" style={{ fontSize: '1.2rem' }} /></span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Insurance</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.insurance} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Tractor & Trailer Lease</p>
                  </div>
                  <div className="jobDisplayItem">
                    <span>[<CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={job.tractor + job.trailer} prefix="$" style={{ fontSize: '1.2rem' }} />]</span>
                  </div>
                  <div id="net-profit-label" className="jobDisplayItem">
                    <p style={{ fontWeight: 'bold' }}>Net Profit</p>
                  </div>
                  <div id="net-profit-number" className="jobDisplayItem">
                    <CurrencyFormat displayType="text" value={job?.netProfit} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix="$" />
                  </div>
                </div>
                <div className="btnContainer">
                  {profitable ?
                    <button style={{ cursor: 'pointer' }} onClick={addJob} className="addJobBtn">Add Job</button>
                    :
                    <button disabled onClick={addJob} className="addJobBtn">Add Job</button>
                  }
                  <button style={{ cursor: 'pointer' }} onClick={clearResults} className="btn2">Clear</button>
                </div>
              </div>
            }
          </>
          :
          null
        }
      </div>
    </div>
  )
}
