// Frontend (React)
import { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, Marker, useJsApiLoader, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 40,
    lng: -95
};

const libraries = ['places'];

const TruckRouteMap = ({ stops, truckDetails }) => {
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [restStops, setRestStops] = useState([]);
    const [waypointDetails, setWaypointDetails] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const calculateRoute = async () => {
        try {
            setIsCalculating(true);
            const response = await fetch('/api/calculate-route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stops,
                    truckDetails
                }),
            });

            const data = await response.json();
            
            // Check if we have a valid route
            if (data && data.routes && data.routes[0]) {
                // Create a DirectionsResult object that DirectionsRenderer expects
                const directionsResult = {
                    ...data,
                    routes: data.routes.map(route => ({
                        ...route,
                        legs: route.legs.map(leg => ({
                            ...leg,
                            start_location: { lat: leg.start_location.lat, lng: leg.start_location.lng },
                            end_location: { lat: leg.end_location.lat, lng: leg.end_location.lng },
                            steps: leg.steps.map(step => ({
                                ...step,
                                start_location: { lat: step.start_location.lat, lng: step.start_location.lng },
                                end_location: { lat: step.end_location.lat, lng: step.end_location.lng }
                            }))
                        }))
                    }))
                };

                setDirectionsResponse(directionsResult);
                setRestStops(data.restStops || []);
                setWaypointDetails(data.waypointDetails || []);
                console.log('Route data:', directionsResult);
            }
        } catch (error) {
            console.error('Error calculating route:', error);
        } finally {
            setIsCalculating(false);
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    return (
        <div style={mapContainerStyle}>
            {stops && stops.length >= 2 && (
                <button 
                    onClick={calculateRoute}
                    disabled={isCalculating}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 1000,
                        padding: '10px 20px',
                        backgroundColor: isCalculating ? '#94a3b8' : '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isCalculating ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isCalculating ? 'Calculating...' : 'Calculate Route'}
                </button>
            )}

            {/* Waypoint Details Panel */}
            {waypointDetails.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    maxWidth: '300px'
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Route Details</h3>
                    {waypointDetails.map((waypoint, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <strong>Stop {index + 1}:</strong>
                            <div>{waypoint.formatted_address}</div>
                        </div>
                    ))}
                </div>
            )}

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={4}
                onLoad={setMap}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
            >
                {directionsResponse && (
                    <DirectionsRenderer
                        directions={directionsResponse}
                        options={{
                            suppressMarkers: false,
                            polylineOptions: {
                                strokeColor: '#2563eb',
                                strokeWeight: 5,
                            },
                        }}
                    />
                )}

                {restStops.map((stop, index) => (
                    <Marker
                        key={`rest-${index}`}
                        position={{
                            lat: stop.geometry.location.lat,
                            lng: stop.geometry.location.lng
                        }}
                        icon={{
                            url: '/rest-stop-icon.png',
                            scaledSize: isLoaded ? new window.google.maps.Size(30, 30) : null
                        }}
                        title={stop.name}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default TruckRouteMap;