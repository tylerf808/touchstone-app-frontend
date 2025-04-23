import { useState } from 'react';

const TabbedInputComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Personal Info", "Work Details", "Preferences"];
  
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

  // Tab content components
  const PersonalInfoTab = () => (
    <div className="tab-content">
      <div className="input-group">
        <label className="input-label">Full Name</label>
        <input 
          type="text" 
          className="input-field"
          placeholder="Enter your full name"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Email</label>
        <input 
          type="email" 
          className="input-field"
          placeholder="Enter your email"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Phone Number</label>
        <input 
          type="tel" 
          className="input-field"
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );
  
  const WorkDetailsTab = () => (
    <div className="tab-content">
      <div className="input-group">
        <label className="input-label">Company</label>
        <input 
          type="text" 
          className="input-field"
          placeholder="Enter your company name"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Position</label>
        <input 
          type="text" 
          className="input-field"
          placeholder="Enter your job title"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Years of Experience</label>
        <input 
          type="number" 
          className="input-field"
          placeholder="Enter years of experience"
        />
      </div>
    </div>
  );
  
  const PreferencesTab = () => (
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
        return <PersonalInfoTab />;
      case 1:
        return <WorkDetailsTab />;
      case 2:
        return <PreferencesTab />;
      default:
        return <PersonalInfoTab />;
    }
  };

  return (
    <div className="tabbed-container">
      <style jsx>{`
        .tabbed-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .tab-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 24px;
        }
        
        .tab-button {
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .tab-button.active {
          color: #2563eb;
        }
        
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #2563eb;
        }
        
        .tab-button:hover:not(.active) {
          color: #4b5563;
        }
        
        .tab-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }
        
        .input-label {
          font-size: 14px;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 4px;
        }
        
        .input-field {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .navigation {
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
        }
        
        .nav-button {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          color: #2563eb;
        }
        
        .nav-button:disabled {
          color: #9ca3af;
          cursor: not-allowed;
        }
        
        .nav-button:hover:not(:disabled) {
          color: #1d4ed8;
        }
        
        .arrow {
          width: 16px;
          height: 16px;
        }
        
        .prev-button .arrow {
          margin-right: 4px;
        }
        
        .next-button .arrow {
          margin-left: 4px;
        }
      `}</style>

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