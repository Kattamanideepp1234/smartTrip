import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Heart, Share2, Camera } from 'lucide-react';

const Community = () => {
  const posts = [
    {
      id: 1,
      author: "Priya Menon",
      location: "Munnar, Kerala",
      content: "Spent the weekend exploring tea plantations in Munnar 🌿. The misty hills and homestays made it magical!",
      image: "🍃",
      likes: 42,
      comments: 15,
      tags: ["Eco-Tourism", "Tea Gardens", "Kerala"]
    },
    {
      id: 2,
      author: "Rahul Iyer",
      location: "Hampi, Karnataka",
      content: "If you love history, Hampi is a must! The ruins, temples, and sunrise from Matanga Hill were unforgettable.",
      image: "🏯",
      likes: 36,
      comments: 22,
      tags: ["Heritage", "History", "South India"]
    },
    {
      id: 3,
      author: "Divya Reddy",
      location: "Coorg, Karnataka",
      content: "Coffee plantation stay in Coorg ☕🌲 Highly recommend for those who love nature and peace.",
      image: "☕",
      likes: 29,
      comments: 10,
      tags: ["Coffee Trails", "Homestay", "Nature"]
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            South India Travel Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your journeys across Kerala, Karnataka, Tamil Nadu, Andhra, and beyond. Discover tips, hidden gems, and sustainable travel ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-dashed border-border rounded-lg text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Share photos and stories from your South Indian travels</p>
                  </div>
                  <Button variant="hero" className="w-full">
                    Create Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{post.author}</h3>
                          <p className="text-sm text-muted-foreground">{post.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl text-center py-4">{post.image}</div>
                    <p className="mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active Travelers</span>
                  <span className="font-bold text-primary">5,432</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shared Stories</span>
                  <span className="font-bold text-accent">2,018</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eco Points Earned</span>
                  <span className="font-bold text-secondary">76,342</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Local</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Suresh Kumar</h3>
                  <p className="text-sm text-muted-foreground mb-3">Local Guide, Kerala Backwaters</p>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
