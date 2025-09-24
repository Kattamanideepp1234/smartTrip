import { useState } from "react";

function TripForm({ destination, onSubmit }) {
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("₹25,000");
  const [food, setFood] = useState("Local cuisines");
  const [lodging, setLodging] = useState("Hotels and Homestays");
  const [guide, setGuide] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create multi-day activities sample
    const dayPlans = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activities: [`Sightseeing in ${destination}`, `Local food experience`],
    }));
    onSubmit({ days: dayPlans, budget, food, lodging, guide });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Number of days"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Food preferences"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Lodging preferences"
        value={lodging}
        onChange={(e) => setLodging(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={guide}
          onChange={(e) => setGuide(e.target.checked)}
        />
        Need a tour guide?
      </label>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Generate Itinerary
      </button>
    </form>
  );
}

export default TripForm;
