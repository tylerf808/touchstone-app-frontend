import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from 'react-google-charts'
import './costsPageStyles.css'
import UserContext from "../../helpers/Context";
import formatUSD from '../../helpers/currencyFormatter'

export default function CostsPage() {

  const [editCosts, setEditCosts] = useState(false)
  const [pieChartData, setPieChartData] = useState()
  const [costs, setCosts] = useState()
  const [tractors, setTractors] = useState()
  const [tractorTotal, setTractorTotal] = useState(0)

  const navigate = useNavigate()

  const { user, loggedIn, apiUrl } = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    } else {
      getCosts()
    }
  }, [])

  const getCosts = async () => {

    const token = localStorage.getItem('token')

    await fetch(apiUrl + '/api/costs/coststractors', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then((res) => res.json()).then((data) => {
      setCosts(data.costs[0])
      setTractors(data.tractors)
      let total = 0
      data.tractors.forEach((tractor) => {
        total += tractor.insurance
      })
      setTractorTotal(total)
      setPieChartData([
        ["Cost", "Amount"],
        ["Insurance", data.costs[0].insurance],
        ['Tractor', data.costs[0].tractorLease],
        ['Trailer', data.costs[0].trailerLease],
        ['Loan', data.costs[0].loan],
        ['Parking', data.costs[0].parking]
      ])
      console.log(data)
    })
  }

  const updateCosts = async () => {

    let userID

    if (user.accountType === 'dispatcher') {
      userID = user.admin
    } else {
      userID = user.username
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
    <div className="pageContainer">


      <div className="costsContainer">
        <div className="graphContainer">
          <h2 style={{ color: 'orange' }}>Monthly Fixed Costs</h2>
          <Chart chartType="PieChart" width="95%" height="100%" data={pieChartData} options={options} />
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
                  <div className="confirmChangesContainer" id="confirm-changes-container" style={{ position: 'absolute', backgroundColor: 'white', display: 'none' }}>
                    <p style={{ fontWeight: 'bold' }}>Confirm Changes:</p><button style={{ color: 'white', backgroundColor: 'green', marginLeft: '1rem' }} onClick={() => {
                      updateCosts()
                      setEditCosts(false)
                      document.getElementById('confirm-changes-container').style.display = 'none'
                    }}>Confirm</button><button style={{ color: 'white', backgroundColor: 'red', marginLeft: '1rem' }} onClick={() => {
                      document.getElementById('confirm-changes-container').style.display = 'none'
                      setEditCosts(false)
                    }}>Discard</button>
                  </div>
                </div>
                :
                <i id="edit-btn" className="fa fa-pencil" style={{ fontSize: '1.5em' }} onClick={() => {
                  setEditCosts(true)
                }}></i>
              }
            </div>
            {editCosts ?
              <>
                <div className="costsItem">
                  <p className="inputInstructions">Repairs (Cents per mile; eg. 10 cents is 0.1)</p>
                  <input className="costsInput" defaultValue={costs.repairs} onChange={(e) => setCosts({ ...costs, repairs: e.target.value })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Monthly loan payments</p>
                  <input className="costsInput" defaultValue={(costs.loan * 30)} onChange={(e) => setCosts({ ...costs, loan: (e.target.value / 30) })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Parking (Enter monthly pmt for parking , if any)</p>
                  <input className="costsInput" defaultValue={(costs.parking * 30)} onChange={(e) => setCosts({ ...costs, parking: (e.target.value / 30) })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Overhead (Enter as a percentage eg 4% is 4)</p>
                  <input className="costsInput" defaultValue={(costs.gAndA * 30)} onChange={(e) => setCosts({ ...costs, overhead: (e.target.value / 100) })} />
                </div>
              </>
              :
              <>
                <div className="tractorContainer">
                  <div className="costsItem" style={{ width: "100%" }}>
                    <p className="costsLabel">Insurance</p>
                  </div>
                  <div className="tractorSubContainer">
                    {tractors?.map((tractor, i) => {
                      return (
                        <div key={i} className="tractor">
                          <p>Internal Num: {tractor.internalNum}</p><p>${tractor.insurance}/Month</p>
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
                <div className="tractorContainer">
                  <div className="costsItem" style={{ width: "100%" }}>
                    <p className="costsLabel">Tractor Leases</p>
                  </div>
                  <div className="tractorSubContainer">
                    {tractors?.map((tractor, i) => {
                      return (
                        <div key={i} className="tractor">
                          <p>Internal Num: {tractor.internalNum}</p><p>${tractor.tractorLease}/Month</p>
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
                <div className="tractorContainer">
                  <div className="costsItem" style={{ width: "100%" }}>
                    <p className="costsLabel">Trailer Leases</p>
                  </div>
                  <div className="tractorSubContainer">
                    {tractors?.map((tractor, i) => {
                      return (
                        <div key={i} className="tractor">
                          <p>Internal Num: {tractor.internalNum}</p><p>${tractor.trailerLease}/Month</p>
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Repairs</p>
                  <p>{formatUSD(costs?.repairs)}</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Loan</p>
                  <p>{formatUSD(costs?.loan)}</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Parking</p>
                  <p>{formatUSD(costs?.parking)}</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Overhead</p>
                  <p>{formatUSD(costs?.overhead)}</p>
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
                  <input className="costsInput" defaultValue={costs?.laborRate * 100} onChange={(e) => setCosts({ ...costs, laborRate: e.target.value / 100 })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Payroll Tax Rate (enter as percentage eg. 2% is 2)</p>
                  <input className="costsInput" defaultValue={costs?.payrollTax * 100} onChange={(e) => setCosts({ ...costs, payrollTax: e.target.value / 100 })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Dispatch Rate (enter as percentage eg. 5% is 5)</p>
                  <input className="costsInput" defaultValue={costs?.dispatch * 100} onChange={(e) => setCosts({ ...costs, dispatch: e.target.value / 100 })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">Factor Rate (enter as percentage eg. 2% is 2)</p>
                  <input className="costsInput" defaultValue={costs?.factor * 100} onChange={(e) => setCosts({ ...costs, factor: e.target.value / 100 })} />
                </div>
                <div className="costsItem">
                  <p className="inputInstructions">ODC (enter as percentage eg 2% is 2)</p>
                  <input className="costsInput" defaultValue={costs?.odc * 100} onChange={(e) => setCosts({ ...costs, odc: e.target.value / 100 })} />
                </div>
              </>
              :
              <>
                <div className="costsItem">
                  <p className="costsLabel">Labor Rate</p>
                  <p className="costsNum">{costs?.laborRate}%</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Payroll Tax Rate</p>
                  <p className="costsNum">{costs?.payrollTax}%</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Dispatch rate</p>
                  <p className="costsNum">{costs?.dispatch}%</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">Factor rate</p>
                  <p className="costsNum">{costs?.factor}%</p>
                </div>
                <div className="costsItem">
                  <p className="costsLabel">ODC</p>
                  <p className="costsNum">{costs?.odc}%</p>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}