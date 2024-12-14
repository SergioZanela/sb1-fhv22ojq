import React from 'react';
import { Truck, Clock, DollarSign } from 'lucide-react';
import type { QuoteResult as QuoteResultType } from '../../types/quote';

interface QuoteResultProps {
  result: QuoteResultType;
  onProceed: () => void;
}

export default function QuoteResult({ result, onProceed }: QuoteResultProps) {
  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Quote</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <Truck className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-600">Distance: {result.distance}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-600">Estimated Time: {result.duration}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-600">Price: ${result.price.toFixed(2)}</span>
        </div>
        <button
          onClick={onProceed}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Proceed with Booking
        </button>
      </div>
    </div>
  );
}