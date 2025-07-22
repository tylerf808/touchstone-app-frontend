import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";
import formatUSD from '../../helpers/currencyFormatter';
import './costsPageStyles.css';

export default function CostsPage() {

  const [costs, setCosts] = useState();
  const [tractors, setTractors] = useState([]);
  const [openFixedModal, setOpenFixedModal] = useState(false)
  const [openOperationaldModal, setOpenOperationaldModal] = useState(false)

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
      setTractors(data.tractors);
    });
  };

  const operationalKeys = [
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
  ]

  return (
    <div className="costs-page-container">
      <h1 className="costs-title">Costs Overview</h1>
      <div className="costs-sections">
        <section className="fixed-costs-section">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <h2>Fixed Costs</h2>
            <i className="fa fa-pencil" style={{ fontSize: '1.2rem' }}></i>
          </div>

          <table className="fixed-costs-table">
            <tbody>
              {fixedKeys.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{costs ? formatUSD(costs[key]) : '-'}</td>
                </tr>
              ))}
              <tr>
                <td>Average Loads per Month</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
          <div className="tractors-grid">
            {tractors.map((tractor) => (
              <div className="tractor-card" key={tractor.internalNum}>
                <h3>Tractor {tractor.internalNum}</h3>
                <div className="tractor-cost-row">
                  <span>Insurance:</span>
                  <span>{formatUSD(tractor.insurance)}</span>
                </div>
                <div className="tractor-cost-row">
                  <span>Tractor Lease:</span>
                  <span>{formatUSD(tractor.tractorLease)}</span>
                </div>
                <div className="tractor-cost-row">
                  <span>Trailer Lease:</span>
                  <span>{formatUSD(tractor.trailerLease)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="operational-costs-section">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <h2>Operational Costs</h2>
            <i className="fa fa-pencil" style={{ fontSize: '1.2rem' }}></i>
          </div>
          <table className="operational-costs-table">
            <tbody>
              {operationalKeys.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{costs ? costs[key] : '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}