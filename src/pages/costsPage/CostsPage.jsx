import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from 'react-google-charts'
import './costsPageStyles.css'

const { apiUrl } = require('../../urls.json')

export default function CostsPage(props) {

  const [editCosts, setEditCosts] = useState(false)
  const [pieChartData, setPieChartData] = useState()
  const [costs, setCosts] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    if (!props.loggedIn) {
      navigate('/')
    }
    getCosts()
  }, [])

  const getCosts = async () => {

    let userID

    if (props.user.accountType === 'dispatcher') {
      userID = props.user.admin
    } else {
      userID = props.user.username
    }

    await fetch(apiUrl + '/api/costs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userID
      })
    }).then((res) => res.json()).then((data) => {
      setCosts(data[0])
      setPieChartData([
        ["Cost", "Amount"],
        ["Insurance", data[0].insurance],
        ['Tractor', data[0].tractorLease],
        ['Trailer', data[0].trailerLease],
        ['G&A', data[0].gAndA],
        ['Labor', data[0].laborRate],
        ['Overhead', data[0].overhead],
        ['Loan', data[0].loan],
        ['Parking', data[0].parking],
        ['ODC', data[0].odc],
        ['Dispatch', data[0].dispatch],
        ['Repairs', data[0].repairs]
      ])
    })
  }

  const updateCosts = async () => {

    let userID

    if (props.user.accountType === 'dispatcher') {
      userID = props.user.admin
    } else {
      userID = props.user.username
    }

    await fetch(apiUrl + "/api/costs/updateCosts", {
      method: "put",
      body: JSON.stringify({ ...costs, username: userID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json()).then((data) => setCosts(data))
      .catch((err) => console.log(err))


  };

  const options = {
    legend: { position: "bottom" },
  };

  return (
    <div className="costsContainer">
      <div className="graphContainer">
        <h2 style={{ color: 'orange' }}>Costs as Percentage of Total</h2>
        <Chart chartType="PieChart" width="100%" height="100%" data={pieChartData} options={options} />
      </div>
      <div className="infoContainer">
        <div className="fixedCostsContainer">
          <div className="subHeaderContainer">
            <h2 style={{ color: 'orange' }}>Fixed Costs</h2>
            {editCosts ?
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
                <span id="edit-btn" className="cancelX" onClick={() => {
                  setEditCosts(false)
                }}>&#10006;</span>
                <span id="edit-btn" className="confirmCheck" onClick={() => {
                  document.getElementById('confirm-changes-container').style.display = 'block'
                }}>&#10003;</span>
                <div className="confirmChangesContainer" id="confirm-changes-container" style={{position: 'absolute', backgroundColor: 'white', display: 'none'}}>
                  <p style={{fontWeight: 'bold'}}>Confirm Changes:</p><button style={{color: 'white', backgroundColor: 'green', marginLeft: '1rem'}} onClick={() => {
                    updateCosts()
                    setEditCosts(false)
                    document.getElementById('confirm-changes-container').style.display = 'none'
                  }}>Confirm</button><button style={{color: 'white', backgroundColor: 'red', marginLeft: '1rem'}} onClick={() => {
                    document.getElementById('confirm-changes-container').style.display = 'none'
                    setEditCosts(false)
                  }}>Discard</button>
                </div>
              </div>
              :
              <i id="edit-btn" class="fa fa-pencil" style={{ fontSize: '1.5em' }} onClick={() => {
                setEditCosts(true)
              }}></i>
            }
          </div>
          {editCosts ?
            <>
              <div className="costsItem">
                <p className="inputInstructions">Total Annual Cost of Insurance (enter in $)</p>
                <input className="costsInput" defaultValue={Math.round(costs.insurance * 240)} onChange={(e) => setCosts({ ...costs, insurance: ((e.target.value) / 240).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Trailer Lease (Enter monthly pmt, if more than one trailer enter average for all trailers)</p>
                <input className="costsInput" defaultValue={Math.round(costs.trailerLease * 30)} onChange={(e) => setCosts({ ...costs, trailerLease: (e.target.value / 30).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Tractor Lease (Enter monthly pmt, if more than one tractor enter average for all tractors)</p>
                <input className="costsInput" defaultValue={Math.round(costs.tractorLease * 30)} onChange={(e) => setCosts({ ...costs, tractorLease: (e.target.value / 30).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Amount spent on repairs each month</p>
                <input className="costsInput" defaultValue={Math.round(costs.repairs * 30)} onChange={(e) => setCosts({ ...costs, repairs: (e.target.value / 30).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Monthly loan payments</p>
                <input className="costsInput" defaultValue={Math.round(costs.loan * 30)} onChange={(e) => setCosts({ ...costs, loan: (e.target.value / 30).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Parking (Enter monthly pmt for parking , if any)</p>
                <input className="costsInput" defaultValue={Math.round(costs.parking * 30)} onChange={(e) => setCosts({ ...costs, parking: (e.target.value / 30).toFixed(2) })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">G&A (Enter as a percentage eg 4% is 4)</p>
                <input className="costsInput" defaultValue={Math.round(costs.gAndA * 30)} onChange={(e) => setCosts({ ...costs, gAndA: (e.target.value / 100).toFixed(2) })} />
              </div>
            </>
            :
            <>
              <div className="costsItem">
                <p className="costsLabel">Insurance</p>
                <p className="costsNum">${costs?.insurance}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Trailer Lease</p>
                <p className="costsNum">${costs?.trailerLease}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Tractor Lease</p>
                <p className="costsNum">${costs?.tractorLease}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Repairs</p>
                <p className="costsNum">${costs?.repairs}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Loan</p>
                <p className="costsNum">${costs?.loan}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Parking</p>
                <p className="costsNum">${costs?.parking}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">G&A</p>
                <p className="costsNum">${costs?.gAndA}</p>
              </div>
            </>
          }
        </div>
        <div className="operatingCostsContainer">
          <div className="subHeaderContainer">
            <h2 style={{ color: 'orange' }}>Operating Costs</h2>
          </div>
          {editCosts ?
            <>
              <div className="costsItem">
                <p className="inputInstructions">Labor Rate (enter as percentage eg. 25% is 25)</p>
                <input className="costsInput" defaultValue={costs.laborRate*100} onChange={(e) => setCosts({ ...costs, laborRate: e.target.value/100 })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Payroll Tax Rate (enter as percentage eg. 2% is 2)</p>
                <input className="costsInput" defaultValue={costs.payrollTax*100} onChange={(e) => setCosts({ ...costs, payrollTax: e.target.value/100 })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Dispatch Rate (enter as percentage eg. 5% is 5)</p>
                <input className="costsInput" defaultValue={costs.dispatch*100} onChange={(e) => setCosts({ ...costs, dispatch: e.target.value/100 })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Factor Rate (enter as percentage eg. 2% is 2)</p>
                <input className="costsInput" defaultValue={costs.factor*100} onChange={(e) => setCosts({ ...costs, factor: e.target.value/100 })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">ODC (enter as percentage eg 2% is 2)</p>
                <input className="costsInput" defaultValue={costs.odc*100} onChange={(e) => setCosts({ ...costs, odc: e.target.value/100 })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">Number of Tractors (enter total tractors)</p>
                <input className="costsInput" defaultValue={costs.tractorNum} onChange={(e) => setCosts({ ...costs, tractorNum: e.target.value })} />
              </div>
              <div className="costsItem">
                <p className="inputInstructions">MPG (enter average fleet mpg)</p>
                <input className="costsInput" defaultValue={costs.mpg} onChange={(e) => setCosts({ ...costs, mpg: e.target.value })} />
              </div>
            </>
            :
            <>
              <div className="costsItem">
                <p className="costsLabel">Labor Rate</p>
                <p className="costsNum">{costs?.laborRate * 100}%</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Payroll Tax Rate</p>
                <p className="costsNum">{costs?.payrollTax * 100}%</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Dispatch rate</p>
                <p className="costsNum">{costs?.dispatch * 100}%</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Factor rate</p>
                <p className="costsNum">{costs?.factor * 100}%</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">ODC</p>
                <p className="costsNum">{costs?.odc * 100}%</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">Num. of Tractors</p>
                <p className="costsNum">{costs?.tractorNum}</p>
              </div>
              <div className="costsItem">
                <p className="costsLabel">MPG</p>
                <p className="costsNum">{costs?.mpg}</p>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}