import { Loader } from '@googlemaps/js-api-loader';

class TruckRoutingService {
  constructor(apiKey, truckSpecifications) {
    this.apiKey = apiKey;
    this.truckSpecifications = truckSpecifications;
    this.directionsService = null;
    this.googleMaps = null;
  }

  async initializeGoogleMaps() {
    const loader = new Loader({
      apiKey: this.apiKey,
      version: "weekly",
      libraries: ["places"]
    });

    this.googleMaps = await loader.load();
    this.directionsService = new this.googleMaps.maps.DirectionsService();
  }

  // Updated to handle multiple waypoints
  createTruckRouteOptions(stops) {
    // Destructure stops
    const { start, pickUp, dropOff } = stops;

    // Prepare waypoints
    const waypoints = [
      {
        location: pickUp,
        stopover: true
      }
    ];

    const routeOptions = {
      origin: start,
      destination: dropOff,
      waypoints: waypoints,
      optimizeWaypoints: false, // Keep the specified order
      travelMode: this.googleMaps.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: this.googleMaps.maps.TrafficModel.BEST_GUESS
      },
      avoidTolls: this.truckSpecifications.avoidTolls,
      avoidHighways: this.truckSpecifications.avoidHighways
    };

    // Special handling for hazmat routes to avoid tunnels
    if (this.truckSpecifications.isHazmat) {
      routeOptions.avoidTunnels = true;
    }

    return routeOptions;
  }

  // Calculate total route distance and estimated time
  calculateRouteMetrics(route) {
    let totalDistance = 0;
    let totalDuration = 0;

    route.legs.forEach(leg => {
      totalDistance += leg.distance.value; // meters
      totalDuration += leg.duration.value; // seconds
    });

    return {
      totalDistanceKm: (totalDistance / 1000).toFixed(2),
      totalDurationHours: (totalDuration / 3600).toFixed(2),
      legs: route.legs.map(leg => ({
        start: leg.start_address,
        end: leg.end_address,
        distance: (leg.distance.value / 1000).toFixed(2),
        duration: (leg.duration.value / 3600).toFixed(2)
      }))
    };
  }

  // Comprehensive route analysis
  analyzeRoute(route) {
    return {
      metrics: this.calculateRouteMetrics(route),
      tunnelRestrictions: this.truckSpecifications.isHazmat 
        ? this.detectTunnels(route) 
        : [],
      bridgeRestrictions: this.checkBridgeRestrictions(route),
      hazmatRestrictions: this.truckSpecifications.isHazmat
        ? this.checkHazmatRoute(route) 
        : []
    };
  }

  // Main routing method for multi-stop routes
  async calculateTruckRoute(stops) {
    if (!this.googleMaps) {
      await this.initializeGoogleMaps();
    }

    const routeOptions = this.createTruckRouteOptions(stops);

    return new Promise((resolve, reject) => {
      this.directionsService.route(routeOptions, (result, status) => {
        if (status === this.googleMaps.maps.DirectionsStatus.OK) {
          // Analyze the primary route
          const primaryRouteAnalysis = this.analyzeRoute(result.routes[0]);

          // Optionally analyze alternative routes
          const alternativeRoutes = result.routes.slice(1).map(route => 
            this.analyzeRoute(route)
          );

          resolve({
            primaryRoute: primaryRouteAnalysis,
            alternativeRoutes: alternativeRoutes
          });
        } else {
          reject(new Error(`Routing failed: ${status}`));
        }
      });
    });
  }

  // Existing methods like detectTunnels, checkBridgeRestrictions, checkHazmatRoute 
  // would remain the same as in the previous implementation
  detectTunnels(route) { /* ... */ }
  checkBridgeRestrictions(route) { /* ... */ }
  checkHazmatRoute(route) { /* ... */ }
}

export default TruckRoutingService;