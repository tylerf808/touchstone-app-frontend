import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import addJobImage from '../../images/add-job-page-edited.PNG'
import dashboardImage from '../../images/dashboard-page-edited.PNG'
import viewJobsImage from '../../images/view-jobs-page-edited.PNG'
import './landingPageStyles.css'
import UserContext from '../../helpers/Context';
import { useUserContext } from '../../helpers/Context';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const [currentTileIndex, setCurrentTileIndex] = useState(0);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const { setShowMenu, showMenu, user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg,
    setAlertMsg, userType, setUserType, apiUrl, costs, setCosts, fetchUser } = useUserContext()

  useEffect(() => {
    fetchUser()
    if(loggedIn){
      navigate('/dashboard')
    }
  }, [])

  const tiles = [
    {
      backgroundImage: addJobImage,
      backgroundClass: 'first-tile-background',
      title: "Optimized Trucking Routes and Earnings Calculator",
      description: "Use cutting edge tools and real time data to find the best route and calculate earnings using a personalized costs profile.",
      tileClass: 'first-tile-content',
      btnStyle: "first-tile-btn"
    },
    {
      backgroundImage: dashboardImage,
      backgroundClass: 'second-tile-background',
      title: "Track Expenditures Using Detailed Analytics",
      tileClass: 'second-tile-content',
      description: "Leverage a suite of tools to track and analyze your costs and earnings."
    },
    {
      backgroundImage: viewJobsImage,
      backgroundClass: 'third-tile-background',
      title: "Detailed Database of All Jobs",
      tileClass: 'third-tile-content',
      description: "Keep track of all your previous jobs with sortable and downloadable tables."
    }
  ];

  const scrollToTile = (tileIndex) => {
    const container = containerRef.current;
    const clientHeight = container.clientHeight;

    container.scrollTo({
      top: tileIndex * clientHeight,
      behavior: 'smooth'
    });

    setCurrentTileIndex(tileIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;

    const handleWheel = (event) => {
      // Prevent default scrolling
      event.preventDefault();

      // If already scrolling, ignore additional scroll events
      if (isScrolling) return;

      const { deltaY } = event;
      const clientHeight = container.clientHeight;

      // Determine next tile index
      let nextTileIndex = currentTileIndex;
      if (deltaY > 0) {
        // Scrolling down
        nextTileIndex = Math.min(currentTileIndex + 1, tiles.length - 1);
      } else {
        // Scrolling up
        nextTileIndex = Math.max(currentTileIndex - 1, 0);
      }

      // Only scroll if the index has changed
      if (nextTileIndex !== currentTileIndex) {
        isScrolling = true;

        // Smooth scroll to the next tile
        container.scrollTo({
          top: nextTileIndex * clientHeight,
          behavior: 'smooth'
        });

        // Update current tile index
        setCurrentTileIndex(nextTileIndex);

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 600); // Match this to your scroll animation duration
      }
    };

    // Add wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentTileIndex, tiles.length]);

  return (
    <div className="snap-scroll-wrapper">
      <div ref={containerRef} className="snap-container">
        {tiles.map((tile, index) => (
          <div key={index} className="snap-tile">
            {/* Background Image */}
            <div
              className='tile-background'
              style={{ backgroundImage: `url(${tile.backgroundImage})` }}
            />

            {/* Overlay Content */}
            <div className={tile.tileClass}>
              <h2 className='tile-header'>{tile.title}</h2>
              <p className='tile-description'>{tile.description}</p>
              {tile.btnStyle ? <button className='first-tile-btn' onClick={() => navigate('/signUp')}>Get Started</button> : null}
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="dot-navigation">
        {tiles.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentTileIndex === index ? 'active' : ''}`}
            onClick={() => scrollToTile(index)}
          />
        ))}
      </div>
    </div>
  );
};
