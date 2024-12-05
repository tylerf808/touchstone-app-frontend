import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapWithRoute = ({
  apiKey,
  origin,
  center,
  zoom,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"]
    });

    const initializeMap = async () => {
      try {
        // Load the Google Maps API and get the Google object
        const google = await loader.load();
        
        const mapOptions = {
          zoom: zoom,
          center: center,
          mapTypeId: google.maps.MapTypeId.ROADMAP // Use the returned Google object
        };

        // Create new map instance
        mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

        // Create DirectionsService for calculating routes
        const directionsService = new google.maps.DirectionsService();
        
        // Create DirectionsRenderer for displaying the route
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: mapInstanceRef.current,
          preserveViewport: false, // This allows the renderer to adjust the viewport
        });

        // Configure route request
        const request = {
          origin: origin,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // // Calculate and display route
        // directionsService.route(request, (result, status) => {
        //   if (status === google.maps.DirectionsStatus.OK) {
        //     directionsRenderer.setDirections(result);
        //     const bounds = result.routes[0].bounds;
        //   } else {
        //     console.error(`Error fetching directions: ${status}`);
        //   }
        // });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey, origin, center, zoom]);

  const height = window.innerHeight - 68;

  return (
    <div 
      ref={mapRef}
      style={{ 
        minHeight: height,
        backgroundColor: '#f0f0f0'
      }}
    />
  );
};

export default MapWithRoute;