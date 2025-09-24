
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import heroImage from '@/assets/hero-tourism.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Discover Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-glow"> Adventure</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Smart, sustainable, and personalized travel planning powered by AI. 
            Explore eco-friendly destinations and create unforgettable memories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/explore')}
            >
              <Compass className="w-5 h-5 mr-2" />
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/itinerary')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Plan Itinerary
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Cards */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-scale-in">
        <Card className="p-4 bg-white/95 backdrop-blur shadow-elevated max-w-xs">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Eco Points Earned</h3>
              <p className="text-2xl font-bold text-accent">+245</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
