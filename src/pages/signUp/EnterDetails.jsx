import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/Context';
import './signUpStyles.css'

const TabbedInputComponent = () => {

  const { apiUrl } = useContext(UserContext)

  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  const [newUserInfo, setNewUserInfo] = useState({ name: '', username: '', password: '', passwordConf: '' })
  const [confSuccess, setConfSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Operational Costs", "Fixed Costs", "Add Drivers", "Add Tractors"];

  const confirmPendingAccount = async (e) => {
    e.preventDefault()
    if (newUserInfo.password !== newUserInfo.passwordConf) {
      alert('Passwords do not match')
    } else {
      await fetch(apiUrl + `/api/user/confirmPendingAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...newUserInfo, confirmationCode: code })
      }).catch((err) => console.log(err))
      navigate('/login')
    }
  }

  const handelChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value })
  }


  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const OperationalCostsTab = () => (
    <div className="tab-content">
      <div className="input-group">
        <label className="input-label">Tractor lease monthly payment</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Trailer lease monthly payment</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Repairs costs in cents per mile</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Repairs costs in cents per mile</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Monthly loan payment (leave blank if none)</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Monthly parking cost</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Monthly G&A cost</label>
        <input
          type="number"
          className="input-field"
        />
      </div>
    </div>
  );

  const FixedCostsTab = () => (
    <div className="tab-content">
      <div className="input-group fixed-group">
        <label className="input-label">Labor rate as a percentage of revenue</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span >%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label className="input-label">Payroll tax rate</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label className="input-label">Dispatch fee as a percentage of revenue</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label className="input-label">Factor fee as a percentage of revenue</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label className="input-label">Other direct costs (ODC) as a percentage of revenue</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label className="input-label">Overhead as a percentage of revenue</label>
        <div>
          <input
            type="number"
            className="input-field"
          />
          <span>%</span>
        </div>
      </div>
    </div>
  );

  const AddUsersTab = () => (
    <div className="tab-content">
      <div className="input-group">
        <label className="input-label">Theme</label>
        <select className="input-field">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Notifications</label>
        <div className="checkbox-group">
          <input type="checkbox" id="notifications" />
          <label htmlFor="notifications">Enable notifications</label>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Language</label>
        <select className="input-field">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );

  const AddTractorsTab = () => (
    <div className="tab-content">
      <div className="input-group">
        <label className="input-label">Theme</label>
        <select className="input-field">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Notifications</label>
        <div className="checkbox-group">
          <input type="checkbox" id="notifications" />
          <label htmlFor="notifications">Enable notifications</label>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Language</label>
        <select className="input-field">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );

  // Render the appropriate tab content based on activeTab state
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <OperationalCostsTab />;
      case 1:
        return <FixedCostsTab />;
      case 2:
        return <AddUsersTab />;
      case 3:
        return <AddTractorsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="tabbed-container">
      {/* Tab headers */}
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div>
        {renderTabContent()}
      </div>
      {/* Navigation arrows */}
      <div className="navigation">
        <button
          className="nav-button prev-button"
          onClick={prevTab}
          disabled={activeTab === 0}
        >
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Previous
        </button>
        <button
          className="nav-button next-button"
          onClick={nextTab}
          disabled={activeTab === tabs.length - 1}
        >
          Next
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TabbedInputComponent;