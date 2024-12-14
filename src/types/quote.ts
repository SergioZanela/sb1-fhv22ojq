export interface QuoteResult {
  distance: string;
  duration: string;
  price: number;
}

export interface LocationInput {
  pickup: string;
  delivery: string;
}