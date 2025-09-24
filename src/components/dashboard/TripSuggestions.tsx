import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Leaf,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripSuggestions = () => {
  const navigate = useNavigate();
  const suggestions = [
    {
      id: 1,
      title: "Coorg Coffee & Rainforest Escape",
      location: "Coorg, Karnataka",
      duration: "5 days",
      price: "$600",
      rating: 4.7,
      image: "🌿",
      tags: ["Eco-Friendly", "Adventure", "Wildlife"],
      ecoScore: 92,
      description: "Explore lush coffee plantations, misty hills, and vibrant wildlife in Coorg's rainforests."
    },
    {
      id: 2,
      title: "Periyar Eco & Wildlife Retreat",
      location: "Periyar, Kerala",
      duration: "4 days",
      price: "$550",
      rating: 4.8,
      image: "🐘",
      tags: ["Eco-Friendly", "Wildlife", "Adventure"],
      ecoScore: 90,
      description: "Experience serene backwaters, Periyar Wildlife Sanctuary, and eco-friendly bamboo rafting adventures."
    },
    {
      id: 3,
      title: "Chikmagalur Hills & Coffee Tour",
      location: "Chikmagalur, Karnataka",
      duration: "3 days",
      price: "$450",
      rating: 4.6,
      image: "☕",
      tags: ["Eco-Friendly", "Trekking", "Coffee Farms"],
      ecoScore: 88,
      description: "Discover scenic hill stations, sustainable coffee farms, and trekking through verdant Western Ghats."
    }
  ];


  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Personalized Trip Suggestions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered recommendations based on your preferences, budget, and travel style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((trip) => (
            <Card key={trip.id} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">{trip.image}</div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    <Leaf className="w-3 h-3 mr-1" />
                    {trip.ecoScore}% Eco
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {trip.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{trip.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.location}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {trip.rating}
                    </div>
                  </div>
                  <div className="flex items-center font-semibold text-primary">
                    <DollarSign className="w-4 h-4" />
                    {trip.price.replace('$', '')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {trip.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="nature" size="lg">
            View All Suggestions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripSuggestions;