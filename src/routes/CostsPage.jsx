import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CostsPage(props) {

  const [edit, setEdit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!props.user) {
      navigate('/')
    }
  }, []);

  const updateCosts = async () => {

    const newCostsObj = {
      insuranceType: (props.insuranceType),
      insurance: (props.insuranceValue / 30),
      tractorLease: (props.tractorValue / 30),
      trailerLease: (props.trailerValue / 30),
      dispatch: (props.dispatchValue / 100),
      mpg: (props.mpgValue),
      laborRate: (props.laborValue / 100),
      payrollTax: (props.payrollValue / 100),
      factor: (props.factorValue / 100),
      odc: (props.odcValue / 100),
      gAndA: (props.gAndAValue / 30),
      loan: (props.loanValue / 30),
      repairs: props.repairsValue / 30,
      parking: props.parkingValue / 30
    };

    await fetch("http://localhost:3001/api/costs?id=" + props.user, {
      method: "PUT",
      body: JSON.stringify(newCostsObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))

    await fetch("http://localhost:3001/api/costs?id=" + props.user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
      .then((data) => {
        props.setCosts(data[0])
      })
  };

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h2>Current Costs Per Job</h2>
      </div>
      {edit ?
        <div className="costsContainer">
          <div className="costsHeaderContainer">
            <h1>Operating Costs</h1>
          </div>
          <div className="operatingCostsContainer">
          <div className="costsItem">
              <p className="costsLabel">Insurance Type:</p>
              <input className="costsInput" onChange={(e) => props.setInsuranceType(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Insurance Amount:</p>
              <input className="costsInput" onChange={(e) => props.setInsuranceValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Tractor Lease:</p>
              <input className="costsInput" onChange={(e) => props.setTractorValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Tailer Lease:</p>
              <input className="costsInput" onChange={(e) => props.setTrailerValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">G&A:</p>
              <input className="costsInput" onChange={(e) => props.setGAndAValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Repairs:</p>
              <input className="costsInput" onChange={(e) => props.setRepairsValue(e.target.value)}></input>
            </div>
          </div>
          <div className="costsHeaderContainer">
            <h1>Fixed Costs</h1>
          </div>
          <div className="fixedCostsContainer">
            <div className="costsItem">
              <p className="costsLabel">Labor Rate:</p>
              <input className="costsInput" onChange={(e) => props.setLaborValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Payroll Tax:</p>
              <input className="costsInput" onChange={(e) => props.setPayrollValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Dispatch:</p>
              <input className="costsInput" onChange={(e) => props.setDispatchValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">MPG:</p>
              <input className="costsInput" onChange={(e) => props.setMpgValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Factor:</p>
              <input className="costsInput" onChange={(e) => props.setFactorValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">ODC:</p>
              <input className="costsInput" onChange={(e) => props.setOdcValue(e.target.value)}></input>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Loan:</p>
              <input className="costsInput" onChange={(e) => props.setLoanValue(e.target.value)}></input>
            </div>
          </div>
        </div>
        :
        <div className="costsContainer">
          <div className="costsHeaderContainer">
            <h1>Operating Costs</h1>
          </div>
          <div className="operatingCostsContainer">
          <div className="costsItem">
              <p className="costsLabel">Insurance Type:</p>
              <p className="costsNum">${props.costs.insuranceType}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Insurance Amount:</p>
              <p className="costsNum">${props.costs.insurance}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Tractor Lease:</p>
              <p className="costsNum">${props.costs.tractorLease}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Tailer Lease:</p>
              <p className="costsNum">${props.costs.tractorLease}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">G&A:</p>
              <p className="costsNum">${props.costs.gAndA}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Repairs:</p>
              <p className="costsNum">${props.costs.repairs}</p>
            </div>
          </div>
          <div className="costsHeaderContainer">
            <h1>Fixed Costs</h1>
          </div>
          <div className="fixedCostsContainer">
            <div className="costsItem">
              <p className="costsLabel">Labor Rate:</p>
              <p className="costsNum">${props.costs.laborRate}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Payroll Tax:</p>
              <p className="costsNum">${props.costs.payrollTax}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Dispatch:</p>
              <p className="costsNum">${props.costs.dispatch}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">MPG:</p>
              <p className="costsNum">${props.costs.mpg}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Factor:</p>
              <p className="costsNum">${props.costs.factor}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">ODC:</p>
              <p className="costsNum">${props.costs.odc}</p>
            </div>
            <div className="costsItem">
              <p className="costsLabel">Loan:</p>
              <p className="costsNum">${props.costs.loan}</p>
            </div>
          </div>
        </div>
      }
      <div className="btnContainer">
        {edit ?
          <button className="checkJobBtn" onClick={() => {
            setEdit(false)
            updateCosts()
          }}>Update</button>
          :
          <button className="checkJobBtn" onClick={() => {
            setEdit(true)
          }}>Edit Costs</button>}
      </div>
    </div>
  );
}
