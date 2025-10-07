// src/pages/TripDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';
import Coorgday1 from "../../assets/Abbey.png";
import Coorgday2 from "../../assets/Rajas.png";
import Coorgday3 from "../../assets/Elephant.png";
import Periyarday1 from "../../assets/periyar.png";
import Periyarday2 from "../../assets/boat.png";
import Periyarday3 from "../../assets/village.png";
import Chikmagalur from "../../assets/westernghats.png";
import Chikmagalurday2 from "../../assets/coffeetrees.png";

const tripData = {
  1: {
    title: "Coorg Coffee & Rainforest Escape",
    dates: "Oct 5-10, 2025",
    budget: "₹25,000",
    days: [
      { day: 1, activities: ["Abbey Falls visit", "Coffee plantation tour"], image: Coorgday1 },
      { day: 2, activities: ["Raja's Seat trek", "Local cuisine tasting"], image: Coorgday2 },
      { day: 3, activities: ["Dubare Elephant Camp", "River rafting"], image: Coorgday3 },
    ],
    food: "Local Coorgi cuisine, street food, and coffee tastings",
    lodging: "Eco resorts and homestays",
    guide: true,
    guideInfo: {
      name: "Ramesh Kumar",
      experience: "8 years",
      charges: "₹2000/day",
      contact: "+91 9876543210",
    },
  },
  2: {
    title: "Periyar Eco & Wildlife Retreat",
    dates: "Nov 12-15, 2025",
    budget: "₹30,000",
    days: [
      { day: 1, activities: ["Periyar Wildlife Sanctuary visit"], image: Periyarday1 },
      { day: 2, activities: ["Boating at Periyar Lake", "Bamboo rafting"], image: Periyarday2 },
      { day: 3, activities: ["Local village exploration"], image: Periyarday3 },
    ],
    food: "Traditional Kerala dishes and riverbank snacks",
    lodging: "Eco-lodges and treehouses",
    guide: false,
  },
  3: {
    title: "Chikmagalur Hills & Coffee Tour",
    dates: "Dec 1-3, 2025",
    budget: "₹20,000",
    days: [
      { day: 1, activities: ["Trekking in Western Ghats", "Sunset viewpoint"], image: Chikmagalur },
      { day: 2, activities: ["Coffee estate tour", "Local café visits"], image: Chikmagalurday2 },
    ],
    food: "South Indian cuisine and coffee tasting",
    lodging: "Boutique resorts and homestays",
    guide: true,
    guideInfo: {
      name: "Suresh Patil",
      experience: "5 years",
      charges: "₹1500/day",
      contact: "+91 9123456780",
    },
  },
};

function TripDetails() {
  const { id } = useParams();
  const trip = tripData[id];
  const navigate = useNavigate();

  if (!trip) return <p className="p-6 text-center">Trip not found!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{trip.title}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {trip.dates} | Budget: {trip.budget}
          </p>
        </div>
        <Button onClick={() => navigate(-1)}>Back to Itineraries</Button>
      </div>

      {/* Multi-Day Itinerary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Multi-Day Plan</h2>
        {trip.days.map((d) => (
          <div key={d.day} className="bg-gray-50 rounded shadow p-4 flex flex-col md:flex-row gap-4">
            <img src={d.image} alt={`Day ${d.day}`} className="w-full md:w-1/3 h-32 object-cover rounded" />
            <div>
              <h3 className="font-semibold mb-1">Day {d.day}</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {d.activities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Food & Lodging */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded shadow p-4">
          <h3 className="font-semibold mb-2">Food Options</h3>
          <p>{trip.food}</p>
        </div>
        <div className="bg-gray-50 rounded shadow p-4">
          <h3 className="font-semibold mb-2">Lodging</h3>
          <p>{trip.lodging}</p>
        </div>
      </div>

      {/* Tour Guide */}
      {trip.guide && (
        <div className="bg-gray-50 rounded shadow p-4">
          <h3 className="font-semibold mb-2">Tour Guide</h3>
          <p><strong>{trip.guideInfo.name}</strong></p>
          <p>Experience: {trip.guideInfo.experience}</p>
          <p>Charges: {trip.guideInfo.charges}</p>
          <p>Contact: {trip.guideInfo.contact}</p>
          <Button className="mt-2">Book Guide</Button>
        </div>
      )}
    </div>
  );
}

export default TripDetails;
