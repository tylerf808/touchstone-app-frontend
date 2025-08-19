import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";
import formatUSD from '../../helpers/currencyFormatter';
import EditCostsModal from "./EditCostsModal";
import './costsPageStyles.css';

export default function CostsPage() {

  const [costs, setCosts] = useState();
  const [tractors, setTractors] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [costsType, setCostsType] = useState('')
  const [newCosts, setNewCosts] = useState()

  const navigate = useNavigate();

  const { user, apiUrl } = useContext(UserContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      getCosts();
    }
  }, []);

  const getCosts = async () => {
    await fetch(apiUrl + '/api/costs/coststractors', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then((res) => res.json()).then((data) => {
      setCosts(data.costs[0]);
      setNewCosts(data.costs[0])
      setTractors(data.tractors);
    });
  };

  const confirmEditCosts = async () => {
    await fetch(apiUrl + '/api/costs/updateCosts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(newCosts)
    }).then((res) => res.json()).then((data) => {
        setCosts(data)
        console.log(data)
      })
  }

  const directKeys = [
    { key: 'laborRate', label: 'Labor Rate' },
    { key: 'payrollTax', label: 'Payroll Tax' },
    { key: 'dispatch', label: 'Dispatch' },
    { key: 'factor', label: 'Factor' },
    { key: 'odc', label: 'ODC' }

  ];

  const fixedKeys = [
    { key: 'overhead', label: 'Overhead' },
    { key: 'parking', label: 'Parking' },
    { key: 'repairs', label: 'Repairs' },
    { key: 'loan', label: 'Loan' },
    { key: 'loadsPerMonth', label: 'Loads per Month'}
    
  ]

  return (
    <div className="costs-page-container">
      <div className="costs-sections">
        <section className="fixed-costs-section">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <h2>Fixed Costs</h2>
            <i className="fa fa-pencil" style={{ fontSize: '1.2rem' }} onClick={() => {
              setCostsType('fixed')
              setIsOpen(true)
            }}></i>
          </div>
          <table className="fixed-costs-table">
            <tbody>
              {fixedKeys.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  {label === 'Overhead' && <td>{costs ? costs[key] : '-'}%</td>}
                  {label === 'Repairs' && <td>{costs ? costs[key] : '-'}¢</td>}
                  {label === 'Loads per Month' && <td>{costs ? costs[key] : '-'}</td>}
                  {label !== 'Repairs' && label !== 'Overhead' && label !== 'Loads per Month' && <td>{costs ? formatUSD(costs[key]) : '-'}</td>}
                </tr>
              ))}
            </tbody>
          </table>

        </section>
        <section className="operational-costs-section">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <h2>Direct Costs</h2>
            <i className="fa fa-pencil" style={{ fontSize: '1.2rem' }} onClick={() => {
              setCostsType('operational')
              setIsOpen(true)
            }}></i>
          </div>
          <table className="operational-costs-table">
            <tbody>
              {directKeys.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{costs ? costs[key] : '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div className="tractors-section">
        <h2 style={{ paddingTop: '1rem', marginLeft: '1rem' }}>Tractors Costs</h2>
        <div className="tractors-grid">
          {tractors.map((tractor) => (
            <div className="tractor-card" key={tractor.internalNum}>
              <h3>Tractor {tractor.internalNum}</h3>
              <div className="tractor-cost-row">
                <span>Insurance</span>
                <span>{formatUSD(tractor.insurance)}</span>
              </div>
              <div className="tractor-cost-row">
                <span>Tractor Lease</span>
                <span>{formatUSD(tractor.tractorLease)}</span>
              </div>
              <div className="tractor-cost-row">
                <span>Trailer Lease</span>
                <span>{formatUSD(tractor.trailerLease)}</span>
              </div>
              <div className="tractor-cost-row">
                <span>Annual Depreciation</span>
                <span>{formatUSD(tractor.depreciation)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditCostsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        costsType={costsType}
        costs={costs}
        newCosts={newCosts}
        setNewCosts={setNewCosts}
        confirmEditCosts={confirmEditCosts}
      />
    </div>
  );
}