// src/pages/Explore.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, Compass } from 'lucide-react';

const Explore = () => {
  // South Indian places dataset
  const allDestinations = [
    { name: "Coorg", state: "Karnataka", type: "Nature", tags: ["Adventure", "Eco-Tourism", "Family"] },
    { name: "Periyar Wildlife Sanctuary", state: "Kerala", type: "Wildlife", tags: ["Eco-Tourism", "Adventure", "Family"] },
    { name: "Chikmagalur", state: "Karnataka", type: "Adventure", tags: ["Adventure", "Budget", "Friends"] },
    { name: "Hampi", state: "Karnataka", type: "Heritage", tags: ["Cultural", "Solo", "Budget"] },
    { name: "Munnar", state: "Kerala", type: "Hills", tags: ["Eco-Tourism", "Adventure", "Couple"] },
    { name: "Ooty", state: "Tamil Nadu", type: "Hills", tags: ["Family", "Eco-Tourism", "Budget"] },
    { name: "Mahabalipuram", state: "Tamil Nadu", type: "Heritage", tags: ["Cultural", "Solo", "Luxury"] },
    { name: "Araku Valley", state: "Andhra Pradesh", type: "Nature", tags: ["Adventure", "Budget", "Family"] },
    { name: "Ramoji Film City", state: "Telangana", type: "Entertainment", tags: ["Family", "Friends", "Luxury"] },
  ];

  const filterOptions = ['Adventure', 'Cultural', 'Eco-Tourism', 'Budget', 'Luxury', 'Solo', 'Family', 'Friends', 'Couple'];

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const normalize = (s) => (String(s || '').toLowerCase().trim());

  const applyFilters = () => {
    if (selectedFilters.length === 0) {
      setFilteredDestinations(allDestinations);
      return;
    }

    const selectedNorm = selectedFilters.map(normalize);
    const results = allDestinations.filter(dest =>
      dest.tags.some(tag => selectedNorm.includes(normalize(tag)))
    );
    setFilteredDestinations(results);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setFilteredDestinations(allDestinations);
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Destinations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing South Indian places with interactive maps and personalized recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Travel Style</label>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((style) => {
                      const active = selectedFilters.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleFilter(style)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition
                            ${active 
                              ? 'bg-blue-600 text-white' 
                              : 'border border-gray-300 text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" className="w-36" onClick={resetFilters}>Reset</Button>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Featured Destinations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination) => (
                    <Card key={destination.name} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{destination.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {destination.state}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded bg-gray-100">{destination.type}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-muted-foreground">
                    No destinations match your filters.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Map and Results */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Compass className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Map Coming Soon</h3>
                    <p className="text-muted-foreground">Explore South Indian destinations with our smart map interface</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
