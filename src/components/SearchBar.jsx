const suggestions = [
  { name: "Coorg", img: "https://source.unsplash.com/400x250/?coorg,coffee" },
  { name: "Munnar", img: "https://source.unsplash.com/400x250/?munnar,tea" },
  { name: "Ooty", img: "https://source.unsplash.com/400x250/?ooty,hills" },
  { name: "Leh-Ladakh", img: "https://source.unsplash.com/400x250/?leh-ladakh" },
  { name: "Goa", img: "https://source.unsplash.com/400x250/?goa,beach" },
];

function SearchBar({ onSelect }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search destination..."
        className="w-full border p-3 rounded-lg shadow-sm mb-6"
      />
      <div className="grid sm:grid-cols-3 gap-4">
        {suggestions.map((place) => (
          <div
            key={place.name}
            onClick={() => onSelect(place.name)}
            className="cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition"
          >
            <img src={place.img} alt={place.name} className="w-full h-32 object-cover" />
            <div className="p-2 text-center font-semibold">{place.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
