export default function parseAddress(addressString) {
    // Remove extra spaces and split by commas
    const parts = addressString.trim().split(',').map(part => part.trim());
    
    let streetAddress, city, state;
    
    if (parts.length >= 3) {
      // Format: "123 Main St, New York, NY"
      streetAddress = parts[0];
      city = parts[1];
      state = parts[2];
    } else if (parts.length === 2) {
      // Format: "123 Main St, New York NY"
      streetAddress = parts[0];
      // Split last part by space to separate city and state
      const cityState = parts[1].trim().split(' ');
      state = cityState.pop(); // Get last word as state
      city = cityState.join(' '); // Remaining words are city
    } else {
      // Try to parse single string format: "123 Main St New York NY"
      const words = parts[0].split(' ');
      state = words.pop(); // Last word is state
      city = words.pop(); // Second to last word is city
      streetAddress = words.join(' '); // Remaining is street address
    }
    
    return {
      StreetAddress: streetAddress || '',
      City: city || '',
      State: state || ''
    };
}