import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/Context';
import AddUserForm from './signUpPages/AddUserForm';
import './signUpStyles.css'
import AddTractorForm from './signUpPages/AddTractorForm';
import OperationalCostsTab from './signUpPages/OperationalCostsTab';
import FixedCostsTab from './signUpPages/FixedCostsTab';
import ConfirmDetails from './signUpPages/ConfirmDetails';

const TabbedInputComponent = () => {

  const { apiUrl } = useContext(UserContext)

  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  const [operationalCosts, setOperationalCosts] = useState({ tractorLease: '', trailerLease: '', repairs: '', loan: '', parking: '', gAndA: '' })
  const [fixedCosts, setFixedCosts] = useState({ labor: '', payroll: '', dispatch: '', factor: '', odc: '', overhead: '' })
  const [activeTab, setActiveTab] = useState(0);
  const [password, setPassword] = useState('')
  const [newUsers, setNewUsers] = useState([{ name: '', email: '', accountType: 'Driver' }])
  const [newTractors, setNewTractors] = useState([{
    internalNum: '', vin: '', mpg: '',
    insurance: '', height: { ft: '', in: '' },
    width: { ft: '', in: '' }, weight: ''
  }])
  const [newAccount, setNewAccount] = useState()
  const tabs = ["Password", "Operational Costs", "Fixed Costs", "Add Users", "Add Tractors", "Confirm Details"];

  const getPendingAccontDetails = async () => {
    const response = await fetch(apiUrl + '/api/user/getPendingAccount', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code })
    }).then((res) => res.json())
    const userData = response[0]
    setNewAccount(userData)
  }

  const togglePassword = () => {
    let password = document.getElementById('password')
    let passwordConf = document.getElementById('password-conf')
    if (password.type === 'password') {
      password.type = 'text'
      passwordConf.type = 'text'
    } else {
      password.type = 'password'
      passwordConf.type = 'password'
    }
  }

  useEffect(() => {
    getPendingAccontDetails()
  }, [])

  const confirmPendingAccount = async (e) => {
    e.preventDefault()
    await fetch(apiUrl + `/api/user/confirmPendingAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        operationalCosts: operationalCosts, fixedCosts: fixedCosts,
        users: newUsers, tractors: newTractors, confirmationCode: code, password: password
      })
    }).catch((err) => console.log(err))
    setActiveTab(5)
    setTimeout(function () { }, 3000)
    navigate('/login')
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

  const AddUsersTab = () => (
    <div className="tab-content">
      <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '.1rem', fontSize: '1rem' }}>Add drivers and dispatchers (must enter at least one)</div>
      <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '1rem', fontSize: '1rem' }}>A sign up link will be sent to their email.</div>
      {newUsers?.map((user, i) => {
        return <AddUserForm key={i} i={i} user={user} newUsers={newUsers} setNewUsers={setNewUsers} />
      })}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '.5rem', textAlign: 'center' }}>
        <button onClick={(e) => {
          e.preventDefault()
          const newArray = [...newUsers, { name: '', email: '', accountType: 'Driver' }]
          setNewUsers(newArray)
        }} className='modal-save-btn' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <span style={{ fontSize: '1.5rem', marginRight: '.5rem' }}>+</span>
          Add User
        </button>
      </div>
    </div>
  );

  const AddTractorsTab = () => (
    <div className="tab-content">
      <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '.5rem', fontSize: '1rem' }}>Add tractors (must enter at least one)</div>
      {newTractors?.map((tractor, i) => {
        return <AddTractorForm key={i} i={i} tractor={tractor} newTractors={newTractors} setNewTractors={setNewTractors} />
      })}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '.5rem' }}>
        <button onClick={(e) => {
          e.preventDefault()
          const newArray = [...newTractors, {
            internalNum: '', vin: '', mpg: '',
            insurance: '', height: { ft: '', in: '' },
            width: { ft: '', in: '' }, weight: ''
          }]
          setNewTractors(newArray)
        }} className='modal-save-btn' style={{ padding: '.5rem', width: '8rem', justifySelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem', marginRight: '.5rem' }}>+</span>
          Add Tractor
        </button>
      </div>
    </div>
  );

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
        <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
          <form className='tab-content'>
            <div className='input-group'>
              <label className='input-label'>Password</label>
              <input defaultValue={password} onChange={(e) => setPassword(e.target.value)} className='input-field' type='password' id='password'></input>
            </div>
            <div className='input-group'>
              <label className='input-label'>Confirm Password</label>
              <input className='input-field' type='password' id='password-conf'></input>
            </div>
            <div style={{width: '16rem', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end', marginRight: '0rem'}}>
              <label className='input-label'>Show Password</label>
              <input onClick={togglePassword} type='checkbox' style={{ accentColor: 'orange', height: '1rem', width: '1rem', alignSelf: 'center', marginLeft: '1rem'}}></input>
            </div>
          </form>
        </div>
        <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <OperationalCostsTab operationalCosts={operationalCosts} setOperationalCosts={setOperationalCosts} />
        </div>
        <div style={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <FixedCostsTab fixedCosts={fixedCosts} setFixedCosts={setFixedCosts} />
        </div>
        <div style={{ display: activeTab === 3 ? 'block' : 'none' }}>
          <AddUsersTab />
        </div>
        <div style={{ display: activeTab === 4 ? 'block' : 'none' }}>
          <AddTractorsTab />
        </div>
        <div style={{ display: activeTab === 5 ? 'block' : 'none' }}>
          <ConfirmDetails newAccount={newAccount} operationalCosts={operationalCosts}
            fixedCosts={fixedCosts} newUsers={newUsers} newTractors={newTractors} />
        </div>
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
        {activeTab === 5 ? <button style={{ backgroundColor: 'orange' }} onClick={confirmPendingAccount} className='modal-save-btn'>Submit</button> : <button
          className="nav-button next-button"
          onClick={nextTab}
          disabled={activeTab === tabs.length - 1}
        >
          Next
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>}

      </div>
    </div>
  );
};

export default TabbedInputComponent;