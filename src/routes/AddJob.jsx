import { CircularProgress, Alert, Modal, Box } from "@mui/material";
import { Container } from "@mui/system";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function AddJob({ userType, user, loggedIn, setShowAlert, setAlertMsg, library }) {
  const CurrencyFormat = require("react-currency-format");

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
    // async function getDrivers() {
    //   const response = await fetch('http://localhost:3001/api/user/getDrivers', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ manager: user })
    //   }).then((res) => res.json())
    //   setDrivers(response)
    // }
    // async function getDispatchersDrivers() {
    //   const response = await fetch('http://localhost:3001/api/user/getDispatchersDrivers', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ id: user })
    //   }).then((res) => res.json())
    //   setDrivers(response)
    // }
    // if (userType === "manager") {
    //   getDrivers()
    // } else if (userType === "dispatcher") {
    //   getDispatchersDrivers()
    // } else {
    //   return
    // }
    async function getDrivers() {
      const response = await fetch('http://localhost:3001/api/user/getDrivers', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manager: user })
      }).then((res) => res.json())
      setDrivers(response)
    }
    getDrivers()
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDcXIOrxmAOOPEvqjLEXVeZb9mdTyUqS6k",
    libraries: library,
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const checkJob = async (e) => {

    e.preventDefault()

    const start = document.getElementById("start").value;
    const pickUp = document.getElementById("pick-up").value;
    const dropOff = document.getElementById("drop-off").value;
    const pay = document.getElementById("revenue").value;
    const date = document.getElementById("date").value;
    const client = document.getElementById("client").value;
    const driver = document.getElementById("driver").value;

    setAlertMsg("");
    setShowAlert(false);
    setShowResults(false);

    if (
      start === "" ||
      pickUp === "" ||
      dropOff === "" ||
      pay === "" ||
      date === "" ||
      client === '' ||
      driver === ''
    ) {
      setAlertMsg("Missing an entry");
      setShowAlert(true);
      setShowLoading(false);
      return;
    }
    const modal = document.getElementById('modal')
    modal.style.display = 'block'

    setShowJobBtn(false);
    setShowLoading(true);

    const geocoder = new window.google.maps.Geocoder();

    const geoStart = await geocoder.geocode({ address: start });
    const geoPickUp = await geocoder.geocode({ address: pickUp });
    const geoDropOff = await geocoder.geocode({ address: dropOff });

    statesArray.push(geoStart.results[0].address_components[4].short_name);
    statesArray.push(geoPickUp.results[0].address_components[4].short_name);
    statesArray.push(geoDropOff.results[0].address_components[4].short_name);

    const checkRes = await fetch(
      "http://localhost:3001/api/costs/check?id=" +
      user +
      "&start=" +
      start +
      "&pick_up=" +
      pickUp +
      "&drop_off=" +
      dropOff +
      "&state1=" +
      statesArray[0] +
      "&state2=" +
      statesArray[1] +
      "&state3=" +
      statesArray[2]
    ).then((data) => data.json());

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
      odc: parseFloat(checkRes.odc ),
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
      driveTime: checkRes.duration
    }

    setJob(newJob)
    console.log(grossProfitCosts)

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
    await fetch("http://localhost:3001/api/jobs", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setShowJobBtn(false);
    setShowResults(false);
    document.getElementById('modal').style.display = 'none';
    document.getElementById("start").value = ''
    document.getElementById("pick-up").value = ''
    document.getElementById("drop-off").value = ''
    document.getElementById("revenue").value = ''
    document.getElementById("date").value = ''
    document.getElementById("client").value = ''
    document.getElementById("driver").value = ''
  };

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h1>Check Job</h1>
      </div>
      <form className="verticalFormContainer" id="check-job-form">
        <div className="formItem">
          <p >Start</p>
          <Autocomplete className="inputContainer">
            <input className="textInput" name="start" id="start" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <p >Pick Up</p>
          <Autocomplete className="inputContainer">
            <input className="textInput" name="pickUp" id="pick-up" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <p >Drop Off</p>
          <Autocomplete className="inputContainer" id='drop-off-auto'>
            <input className="textInput" name="dropOff" id="drop-off" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <p >Revenue</p>
          <div className="inputContainer" >
            <p style={{ top: 0 }}>$</p>
            <input style={{ width: 100 }} className="textInput" type='number' placeholder="Enter Dollar Amount" name="revenue" id='revenue' />
          </div>
        </div>
        <div className="formItem">
          <p >Date</p>
          <div className="inputContainer">
            <input className="textInput" type='date' name="date" id='date' />
          </div>
        </div>
        <div className="formItem">
          <p >Client</p>
          <div className="inputContainer">
            <input className="textInput" id="client" placeholder="Enter Clients Name" name="client" ></input>
          </div>
        </div>
        <div className="formItem">
          <p >Driver</p>
          <div className="inputContainer">
            <select className="textInput" id="driver" name="driver" >
              {drivers.map((el, i) => {
                return (
                  <option key={i} value={el.username}>{el.username}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="btnContainer">
          <button className="checkJobBtn" onClick={checkJob}>Check Job</button>
        </div>
      </form>
      <div className="modal" id="modal">
        <div className="jobModalContent" id="modal-content">
          <span className="close" id="close-modal" onClick={() => {
            const modal = document.getElementById('modal')
            modal.style.display = 'none';
          }}>&times;</span>

          {showLoading ? <CircularProgress sx={{ color: 'orange', position: 'relative', left: '44%', top: '43%' }}></CircularProgress> : null}

          <div >
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
          </div>
        </div>
      </div>
    </div >
  )
}
