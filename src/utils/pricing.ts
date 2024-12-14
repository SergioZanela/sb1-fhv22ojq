export const calculatePrice = (distanceInKm: number): number => {
  const basePrice = 50; // Base price $50
  const pricePerKm = 2.5; // $2.5 per km
  return basePrice + (distanceInKm * pricePerKm);
};