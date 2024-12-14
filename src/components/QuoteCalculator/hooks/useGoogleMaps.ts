import { useEffect, useState } from 'react';
import { initializeMapsLoader, setupAutocomplete } from '../../../utils/maps';

export function useGoogleMaps() {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        await initializeMapsLoader().load();
        
        const pickupInput = document.getElementById('pickup-input') as HTMLInputElement;
        const deliveryInput = document.getElementById('delivery-input') as HTMLInputElement;
        
        setupAutocomplete(pickupInput);
        setupAutocomplete(deliveryInput);
      } catch (err) {
        setError('Failed to initialize address autocomplete');
      }
    };

    initializeAutocomplete();
  }, []);

  return { error };
}