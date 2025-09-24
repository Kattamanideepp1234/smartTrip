import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TripForm from "../components/TripForm";
import TripResults from "../components/TripResults";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [tripData, setTripData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-8">
          Create Your Trip
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Plan your journey with professional multi-day itineraries and budget guidance.
        </p>

        {/* Step 1: Search */}
        {!destination && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Choose Destination</h2>
            <SearchBar onSelect={(dest) => setDestination(dest)} />
          </div>
        )}

        {/* Step 2: Form */}
        {destination && !tripData && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Plan for {destination}</h2>
            <TripForm destination={destination} onSubmit={(data) => setTripData(data)} />
          </div>
        )}

        {/* Step 3: Results */}
        {tripData && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <TripResults destination={destination} tripData={tripData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TripPlanner;
