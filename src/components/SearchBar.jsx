import Coorg from "../assets/Coorg.png";
import Munnar from "../assets/Munnar.png";
import Ooty from "../assets/Ooty.png";
import Lehladhak from "../assets/Lehladhak.png";
import Goa from "../assets/Goa.png"

const suggestions = [
  { name: "Coorg", img: Coorg},
  { name: "Munnar", img: Munnar },
  { name: "Ooty", img: Ooty },
  { name: "Leh-Ladakh", img: Lehladhak },
  { name: "Goa", img: Goa },
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
            <img src={place.img} alt={place.name} className="w-full h-20 object-cover rounded-t-lg" />
            <div className="p-2 text-center font-semibold">{place.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
