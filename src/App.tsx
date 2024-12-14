import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuoteCalculator from './components/QuoteCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <QuoteCalculator />
    </div>
  );
}

export default App;