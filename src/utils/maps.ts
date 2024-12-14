import { Loader } from '@googlemaps/js-api-loader';

// Replace with your actual API key when you have one
export const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

export const initializeMapsLoader = () => {
  return new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });
};

export const setupAutocomplete = (inputElement: HTMLInputElement) => {
  return new google.maps.places.Autocomplete(inputElement, {
    componentRestrictions: { country: 'au' },
    fields: ['address_components', 'geometry'],
  });
};

export const calculateDistance = async (origin: string, destination: string) => {
  const service = new google.maps.DistanceMatrixService();
  const result = await service.getDistanceMatrix({
    origins: [origin + ', NSW, Australia'],
    destinations: [destination + ', NSW, Australia'],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  });

  if (result.rows[0].elements[0].status !== 'OK') {
    throw new Error('Could not calculate distance. Please check the addresses.');
  }

  return {
    distance: result.rows[0].elements[0].distance.text,
    distanceValue: result.rows[0].elements[0].distance.value / 1000, // Convert to km
    duration: result.rows[0].elements[0].duration.text,
  };
};