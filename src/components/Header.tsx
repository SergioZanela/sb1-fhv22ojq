import React from 'react';
import { Package, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Swift Parcels NSW</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            <button className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              <User className="h-4 w-4 mr-2" />
              Login
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </nav>
    </header>
  );
}