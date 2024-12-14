import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Truck, DollarSign } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

// Replace with your actual API key when you have one
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

interface QuoteResult {
  distance: string;
  duration: string;
  price: number;
}

export default function QuoteCalculator() {
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Google Maps
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      // Initialize autocomplete for both input fields
      const pickupInput = document.getElementById('pickup-input') as HTMLInputElement;
      const deliveryInput = document.getElementById('delivery-input') as HTMLInputElement;

      new google.maps.places.Autocomplete(pickupInput, {
        componentRestrictions: { country: 'au' },
        fields: ['address_components', 'geometry'],
      });

      new google.maps.places.Autocomplete(deliveryInput, {
        componentRestrictions: { country: 'au' },
        fields: ['address_components', 'geometry'],
      });
    });
  }, []);

  const calculatePrice = (distanceInKm: number): number => {
    // Base price $50
    const basePrice = 50;
    // $2.5 per km
    const pricePerKm = 2.5;
    return basePrice + (distanceInKm * pricePerKm);
  };

  const handleGetQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const service = new google.maps.DistanceMatrixService();
      const result = await service.getDistanceMatrix({
        origins: [pickup + ', NSW, Australia'],
        destinations: [delivery + ', NSW, Australia'],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      });

      if (result.rows[0].elements[0].status === 'OK') {
        const distance = result.rows[0].elements[0].distance.text;
        const duration = result.rows[0].elements[0].duration.text;
        const distanceValue = result.rows[0].elements[0].distance.value / 1000; // Convert to km
        const price = calculatePrice(distanceValue);

        setQuoteResult({
          distance,
          duration,
          price,
        });
      } else {
        setError('Could not calculate distance. Please check the addresses.');
      }
    } catch (err) {
      setError('An error occurred while calculating the quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12" id="quote">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <Calculator className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Get an Instant Quote
              </h2>
            </div>

            <form onSubmit={handleGetQuote} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="pickup-input"
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter pickup address in NSW"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="delivery-input"
                    type="text"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter delivery address in NSW"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  'Calculating...'
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Quote
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {quoteResult && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Quote</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Distance: {quoteResult.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Estimated Time: {quoteResult.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Price: ${quoteResult.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {/* TODO: Implement booking flow */}}
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Proceed with Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}