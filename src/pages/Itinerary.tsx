import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Itinerary = () => {
  const navigate = useNavigate();

  const trips = [
    { title: "Coorg Coffee & Rainforest Escape", dates: "Oct 5-10, 2025", status: "Planning" },
    { title: "Periyar Eco & Wildlife Retreat", dates: "Nov 12-15, 2025", status: "Confirmed" },
    { title: "Chikmagalur Hills & Coffee Tour", dates: "Dec 1-3, 2025", status: "Planning" }
  ];

  return (
    <div className="min-h-screen pt-12 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
            Smart Itinerary Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage personalized travel plans with AI-powered suggestions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Itineraries */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    My Itineraries
                  </span>
                  <Button variant="hero" onClick={() => navigate("/planner")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <Card 
                      key={trip.title} 
                      className="border-l-4 border-l-indigo-600 hover:shadow transition"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{trip.title}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {trip.dates}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                          {trip.status}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Travel Assistant */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>AI Travel Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">✨ Smart Suggestions</h4>
                    <p className="text-sm text-gray-600">
                      Get personalized recommendations based on your travel style and budget.
                    </p>
                  </div>
                  <Button variant="nature" className="w-full">
                    Get AI Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
