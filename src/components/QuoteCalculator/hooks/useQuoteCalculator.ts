import { useState } from 'react';
import { calculateDistance } from '../../../utils/maps';
import { calculatePrice } from '../../../utils/pricing';
import type { QuoteResult } from '../../../types/quote';

export function useQuoteCalculator() {
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { distance, duration, distanceValue } = await calculateDistance(pickup, delivery);
      const price = calculatePrice(distanceValue);

      setQuoteResult({
        distance,
        duration,
        price,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating the quote');
    } finally {
      setLoading(false);
    }
  };

  return {
    pickup,
    setPickup,
    delivery,
    setDelivery,
    quoteResult,
    loading,
    error,
    calculateQuote,
  };
}