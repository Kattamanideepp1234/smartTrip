import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Heart, Share2, Camera } from 'lucide-react';

const Community = () => {
  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      location: "Banff National Park",
      content: "Just finished an incredible 5-day eco-hike through the Canadian Rockies! The sustainable lodges were amazing.",
      image: "🏔️",
      likes: 24,
      comments: 8,
      tags: ["Eco-Tourism", "Hiking", "Canada"]
    },
    {
      id: 2,
      author: "Miguel Rodriguez",
      location: "Costa Rica",
      content: "Local tip: Visit the coffee farms in Monteverde for an authentic sustainable tourism experience!",
      image: "☕",
      likes: 18,
      comments: 12,
      tags: ["Local Tips", "Sustainable", "Coffee"]
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow travelers and locals to share experiences and discover hidden gems
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-dashed border-border rounded-lg text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Share photos and stories from your travels</p>
                  </div>
                  <Button variant="hero" className="w-full">
                    Create Post
                  </Button>
                </div>
              </CardContent>
            </Card>

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

          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active Travelers</span>
                  <span className="font-bold text-primary">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shared Experiences</span>
                  <span className="font-bold text-accent">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eco Points Earned</span>
                  <span className="font-bold text-secondary">45,678</span>
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
                  <h3 className="font-semibold">Maria González</h3>
                  <p className="text-sm text-muted-foreground mb-3">Local Guide, Costa Rica</p>
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