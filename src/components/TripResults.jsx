function TripResults({ destination, tripData }) {
  const guideInfo = {
    name: "Ramesh Kumar",
    experience: "8 years",
    charges: "₹2000/day",
    contact: "+91 9876543210",
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">Your Trip to {destination}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded shadow">
          <h4 className="font-semibold mb-2">Multi-Day Plan</h4>
          <ul className="list-disc ml-5 text-gray-700">
            {tripData.days.map(d => (
              <li key={d.day}>
                <strong>Day {d.day}:</strong> {d.activities.join(", ")}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-indigo-50 rounded shadow">
          <h4 className="font-semibold mb-2">Food Options</h4>
          <p>{tripData.food}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded shadow">
          <h4 className="font-semibold mb-2">Lodging</h4>
          <p>{tripData.lodging}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded shadow">
          <h4 className="font-semibold mb-2">Budget</h4>
          <p>{tripData.budget}</p>
        </div>
        {tripData.guide && (
          <div className="p-4 bg-indigo-50 rounded shadow">
            <h4 className="font-semibold mb-2">Tour Guide</h4>
            <p><strong>{guideInfo.name}</strong></p>
            <p>Experience: {guideInfo.experience}</p>
            <p>Charges: {guideInfo.charges}</p>
            <p>Contact: {guideInfo.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripResults;
