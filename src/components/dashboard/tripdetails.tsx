// src/pages/TripDetails.jsx
import { useParams } from 'react-router-dom';

const tripData = {
  1: {
    title: "Coorg Coffee & Rainforest Escape",
    content: "Full itinerary with eco stays, coffee plantation tours, and wildlife safaris.",
  },
  2: {
    title: "Periyar Eco & Wildlife Retreat",
    content: "Experience Periyar backwaters, wildlife sanctuary, and bamboo rafting.",
  },
  3: {
    title: "Chikmagalur Hills & Coffee Tour",
    content: "Trekking, coffee estates, and scenic Western Ghats adventures.",
  },
};

function TripDetails() {
  const { id } = useParams();
  const trip = tripData[id];

  if (!trip) return <p className="p-6 text-center">Trip not found!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
      <p className="text-lg text-gray-700">{trip.content}</p>
    </div>
  );
}

export default TripDetails;
