import React from 'react';
import HeroSection from '@/components/dashboard/HeroSection';
import TripSuggestions from '@/components/dashboard/TripSuggestions';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TripSuggestions />
    </div>
  );
};

export default Dashboard;