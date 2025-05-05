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

  const CostsTab = () => (
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
        return <CostsTab />;
      case 1:
        return <WorkDetailsTab />;
      case 2:
        return <PreferencesTab />;
      default:
        return <CostsTab />;
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