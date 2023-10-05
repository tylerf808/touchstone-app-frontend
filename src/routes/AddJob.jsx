import { CircularProgress, Alert, Modal, Box } from "@mui/material";
import { Container } from "@mui/system";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { apiUrl, mapsApiKey } = require('../urls.json')

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
    if (!loggedIn) {
      navigate('/')
    }
    async function getDrivers() {
      const response = await fetch(apiUrl + '/api/user/getDrivers', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manager: user })
      }).then((res) => res.json())
      setDrivers(response)
    }
    getDrivers()
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

    document.getElementById('job-results').style.height = '100vh'

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
        username: user
      })
    }).then((data) => data.json());

    const grossProfitCosts =
      parseFloat((checkRes.odc) +
        (checkRes.factor * pay) +
        (checkRes.laborRate * pay) +
        (checkRes.payrollTax * (checkRes.laborRate * pay)) +
        (checkRes.dispatch * pay) +
        checkRes.gasCost);
    const operationProfitCosts =
      parseFloat(checkRes.insurance +
        checkRes.tractorLease +
        checkRes.trailerLease +
        checkRes.gAndA);
    const netProfitCosts =
      parseFloat(
        checkRes.repairs +
        checkRes.loan);
    const totalCost = (operationProfitCosts) + (grossProfitCosts) + (netProfitCosts);

    setShowLoading(false);

    const newJob = {
      start: start,
      pickUp: pickUp,
      dropOff: dropOff,
      revenue: parseFloat(pay),
      grossProfitPercentage: (((pay - grossProfitCosts) / pay) * 100).toFixed(2) + "%",
      operatingProfitPercentage:
        (((pay - (operationProfitCosts + grossProfitCosts)) / pay) * 100).toFixed(2) + "%",
      netProfitPercentage: (((pay - totalCost) / pay) * 100).toFixed(2) + "%",
      distance: checkRes.distance,
      date: date,
      user_id: user,
      gasCost: checkRes.gasCost,
      factor: parseFloat((checkRes.factor * pay)),
      gAndA: parseFloat(checkRes.gAndA),
      loan: parseFloat(checkRes.loan),
      odc: parseFloat(checkRes.odc),
      repairs: parseFloat(checkRes.repairs),
      ratePerMile: parseFloat((pay / checkRes.distance)),
      labor: parseFloat((checkRes.laborRate * pay)),
      payrollTax: parseFloat((checkRes.payrollTax * (checkRes.laborRate * pay))),
      netProfit: parseFloat((pay - totalCost)),
      grossProfit: parseFloat((pay - grossProfitCosts)),
      operatingProfit: parseFloat((pay - (operationProfitCosts + grossProfitCosts))),
      insurance: parseFloat((checkRes.insurance)),
      dispatch: parseFloat((pay * checkRes.dispatch)),
      laborRatePercent: checkRes.laborRate * 100 + "%",
      trailer: parseFloat((checkRes.trailerLease)),
      tractor: parseFloat((checkRes.tractorLease)),
      totalFixedCost: parseFloat((
        checkRes.tractorLease +
        checkRes.trailerLease +
        checkRes.insurance +
        checkRes.gAndA
      ).toFixed(2)),
      tolls: parseFloat(checkRes.tolls),
      client: client,
      driver: driver,
      admin: user,
      driveTime: checkRes.duration
    }

    setJob(newJob)

    if (totalCost > pay) {
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
    document.getElementById('job-results').style.height = '0vh'
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
      <div className="headerContainer">
        <h1>Check Job</h1>
      </div>
      <form className="jobInputsForm" id="check-job-form">
        <div className="jobInputHeadersContainer">
          <div style={{ width: '100%', marginTop: '1em' }} className="jobInputsHeader">
            <h2 style={{ color: '#7a7979' }}>Route</h2>
          </div>
          <div style={{
            width: '50%', marginTop: '1em', borderLeft: '.1em solid #7a7979',
            borderRight: '.1em solid #7a7979'
          }} className="jobInputsHeader">
            <h2 style={{ color: '#7a7979' }}>Revenue</h2>
          </div>
          <div style={{ width: '100%', marginTop: '1em' }} className="jobInputsHeader">
            <h2 style={{ color: '#7a7979' }}>Details</h2>
          </div>
        </div>
        <div className="jobInputsContainer">
          <div className="routeInputsContainer">
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
            <div className="routeInputsItem">
              <p className="jobInputsLabel">Drop Off</p>
              <Autocomplete className="autocompleteContainer" id='drop-off-auto'>
                <input className="addressInput" name="dropOff" id="drop-off" type="text" />
              </Autocomplete>
            </div>
          </div>
          <div className="revenueInputContainer">
            <div className="inputContainer" >
              <p className="jobInputsLabel">$</p>
              <input className="textInput" type='number' placeholder="Enter Dollar Amount" name="revenue" id='revenue' />
            </div>
          </div>
          <div className="detailInputsContainer">
            <div className="detailInputsItem">
              <p className="jobInputsLabel">Date</p>
              <input className="textInput" type='date' name="date" id='date' />
            </div>
            <div className="detailInputsItem">
              <p className="jobInputsLabel">Client</p>
              <input className="textInput" id="client" placeholder="Enter Clients Name" name="client" ></input>
            </div>
            <div className="detailInputsItem">
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
              </div>
              :
              <div className="jobResultsContainer">
                <div className="headerContainer" >
                  {profitable ? <h1 style={{ color: 'lightgreen' }}>Job is Profitable</h1> : <h1 style={{ color: 'maroon' }}>Job is NOT Profitable</h1>}
                </div>
                <div className="checkJobDisplay" >
                  <div id="profit-label" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                    <p>Revenue</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                    <p>${job?.revenue}</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Labor</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.labor}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Payroll Tax</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.payrollTax}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Dispatch</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.dispatch}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Factor</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.factor}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Fuel</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.gasCost}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Tolls</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.tolls}]</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>ODC</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.odc}]</p>
                  </div>
                  <div id="profit-label" className="jobDisplayItem" >
                    <p>Gross Profit</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem" >
                    <p>${job?.grossProfit}</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Fixed Costs</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.totalFixedCost}]</p>
                  </div>
                  <div id="profit-label" className="jobDisplayItem">
                    <p>Operating Profit</p>
                  </div>
                  <div id="profit-number" className="jobDisplayItem">
                    <p>${(job?.operatingProfit)}</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>Repairs and Dep.</p>
                  </div>
                  <div className="jobDisplayItem">
                    <p>[${job?.repairs}]</p>
                  </div>
                  <div id="net-profit-label" className="jobDisplayItem">
                    <p style={{ fontWeight: 'bold' }}>Net Profit</p>
                  </div>
                  <div id="net-profit-number" className="jobDisplayItem">
                    <p style={{ fontWeight: 'bold' }}>${job?.netProfit}</p>
                  </div>
                </div>
                <div className="btnContainer" style={{ marginTop: 50 }}>
                  <button onClick={addJob} className="addJobBtn">Add Job</button>
                  <button onClick={clearResults} className="btn2">Clear</button>
                </div>
              </div>
            }
          </>
          :
          null
        }
      </div>
      {/* <div className="jobResults">           
        {showLoading ? <CircularProgress sx={{ color: 'orange', position: 'relative', left: '44%', top: '43%' }}></CircularProgress> : null}
        {showResults ?
          <div className="jobModalContainer">
            <div className="headerContainer" >
              {profitable ? <h2 >Job is Profitable</h2> : <h2>Job is NOT Profitable</h2>}
            </div>
            <div className="checkJobDisplay" >
              <div id="profit-label" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                <p>Revenue</p>
              </div>
              <div id="profit-number" className="jobDisplayItem" style={{ justifyContent: 'center', left: 20 }}>
                <p>${job?.revenue}</p>
              </div>
              <div className="jobDisplayItem">
                <p>Labor</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.labor}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>Payroll Tax</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.payrollTax}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>Dispatch</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.dispatch}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>Factor</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.factor}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>Fuel</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.gasCost}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>Tolls</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.tolls}]</p>
              </div>
              <div className="jobDisplayItem">
                <p>ODC</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.odc}]</p>
              </div>
              <div id="profit-label" className="jobDisplayItem" >
                <p>Gross Profit</p>
              </div>
              <div id="profit-number" className="jobDisplayItem" >
                <p>${job?.grossProfit}</p>
              </div>
              <div className="jobDisplayItem">
                <p>Fixed Costs</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.totalFixedCost}]</p>
              </div>
              <div id="profit-label" className="jobDisplayItem">
                <p>Operating Profit</p>
              </div>
              <div id="profit-number" className="jobDisplayItem">
                <p>${(job?.operatingProfit)}</p>
              </div>
              <div className="jobDisplayItem">
                <p>Repairs and Dep.</p>
              </div>
              <div className="jobDisplayItem">
                <p>[${job?.repairs}]</p>
              </div>
              <div id="net-profit-label" className="jobDisplayItem">
                <p style={{ fontWeight: 'bold' }}>Net Profit</p>
              </div>
              <div id="net-profit-number" className="jobDisplayItem">
                <p style={{ fontWeight: 'bold' }}>${job?.netProfit}</p>
              </div>
            </div>
            <div className="btnContainer" style={{ marginTop: 50 }}>
              <button onClick={addJob} className="addJobBtn">Add Job</button>
              <button onClick={() => {
                document.getElementById('modal').style.display = 'none';
                document.getElementById("start").value = ''
                document.getElementById("pick-up").value = ''
                document.getElementById("drop-off").value = ''
                document.getElementById("revenue").value = ''
                document.getElementById("date").value = ''
                document.getElementById("client").value = ''
                document.getElementById("driver").value = ''
              }} className="btn2">Clear</button>
            </div>
          </div> : null}
      </div> */}
    </div>

  )
}
