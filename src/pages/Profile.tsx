import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award,
  Settings,
  Leaf,
  Heart,
  Bookmark
} from 'lucide-react';

const Profile = () => {
  const stats = [
    { label: "Trips Completed", value: "18", icon: MapPin },
    { label: "States Visited", value: "7", icon: Calendar },
    { label: "Eco Points", value: "3,210", icon: Leaf },
    { label: "Community Likes", value: "254", icon: Heart }
  ];

  const achievements = [
    { title: "Eco Warrior", description: "Completed 5 eco-friendly treks", earned: true },
    { title: "Temple Explorer", description: "Visited 10 historic temples", earned: true },
    { title: "Local Champion", description: "Supported 15 local homestays", earned: false },
    { title: "Spice Trail Seeker", description: "Explored Kerala spice plantations", earned: true }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="text-center pt-6">
                <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Arjun Ramesh</h2>
                <p className="text-muted-foreground mb-4">South India Travel Enthusiast</p>
                
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="secondary">Verified Traveler</Badge>
                  <Badge className="bg-accent text-accent-foreground">Level 4</Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.title}
                    className={`p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-muted/30 border-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Award className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="pt-6">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Saved Trips */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Saved Itineraries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Coorg Coffee Trails", status: "Saved", date: "Winter 2024" },
                    { title: "Kerala Backwaters", status: "Completed", date: "Monsoon 2024" },
                    { title: "Hampi Heritage Walk", status: "Planning", date: "Summer 2025" }
                  ].map((trip) => (
                    <div key={trip.title} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">{trip.title}</h4>
                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                      </div>
                      <Badge 
                        variant={trip.status === 'Completed' ? 'default' : 'outline'}
                        className={trip.status === 'Planning' ? 'bg-secondary/10 text-secondary' : ''}
                      >
                        {trip.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Travel Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Preferred Travel Style</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Eco-Tourism', 'Temple Visits', 'Trekking', 'Food Trails'].map((style) => (
                        <Badge key={style} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Budget Range</h4>
                    <Badge variant="outline">₹20,000 - ₹60,000</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Sustainability Focus</h4>
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-4 h-4 text-accent" />
                      <span className="text-sm">High Priority</span>
                    </div>
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

export default Profile;
