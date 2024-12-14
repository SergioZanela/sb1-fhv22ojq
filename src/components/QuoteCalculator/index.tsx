import React from 'react';
import { Calculator } from 'lucide-react';
import AddressInput from './AddressInput';
import QuoteResult from './QuoteResult';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import { useQuoteCalculator } from './hooks/useQuoteCalculator';

export default function QuoteCalculator() {
  const { error: mapsError } = useGoogleMaps();
  const {
    pickup,
    setPickup,
    delivery,
    setDelivery,
    quoteResult,
    loading,
    error: quoteError,
    calculateQuote,
  } = useQuoteCalculator();

  const handleProceedBooking = () => {
    // TODO: Implement booking flow
    console.log('Proceeding to booking...');
  };

  const error = mapsError || quoteError;

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

            <form onSubmit={calculateQuote} className="space-y-6">
              <AddressInput
                id="pickup-input"
                label="Pickup Location"
                value={pickup}
                onChange={setPickup}
                placeholder="Enter pickup address in NSW"
              />

              <AddressInput
                id="delivery-input"
                label="Delivery Location"
                value={delivery}
                onChange={setDelivery}
                placeholder="Enter delivery address in NSW"
              />

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
              <QuoteResult
                result={quoteResult}
                onProceed={handleProceedBooking}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}