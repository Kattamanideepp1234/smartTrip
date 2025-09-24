-- Create enum types
CREATE TYPE public.travel_style AS ENUM ('adventure', 'cultural', 'relaxation', 'business', 'family', 'luxury', 'budget');
CREATE TYPE public.destination_type AS ENUM ('city', 'nature', 'beach', 'mountain', 'cultural', 'adventure');
CREATE TYPE public.itinerary_status AS ENUM ('planning', 'confirmed', 'completed', 'cancelled');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  travel_preferences travel_style[],
  preferred_budget_range NUMRANGE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  destination_type destination_type NOT NULL,
  image_url TEXT,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create itineraries table
CREATE TABLE public.itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status itinerary_status DEFAULT 'planning',
  budget_estimate DECIMAL(10, 2),
  destinations TEXT[], -- Array of destination IDs
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create itinerary_items table (for detailed day-by-day plans)
CREATE TABLE public.itinerary_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  itinerary_id UUID NOT NULL REFERENCES public.itineraries(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIME,
  end_time TIME,
  location TEXT,
  estimated_cost DECIMAL(8, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community_posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  location TEXT,
  destination_id UUID REFERENCES public.destinations(id),
  image_urls TEXT[],
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for destinations (public read, admin write)
CREATE POLICY "Destinations are viewable by everyone" 
ON public.destinations FOR SELECT USING (true);

-- Create policies for itineraries
CREATE POLICY "Users can view their own itineraries" 
ON public.itineraries FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own itineraries" 
ON public.itineraries FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries" 
ON public.itineraries FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries" 
ON public.itineraries FOR DELETE USING (auth.uid() = user_id);

-- Create policies for itinerary_items
CREATE POLICY "Users can view their own itinerary items" 
ON public.itinerary_items FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.itineraries 
  WHERE itineraries.id = itinerary_items.itinerary_id 
  AND itineraries.user_id = auth.uid()
));

CREATE POLICY "Users can manage their own itinerary items" 
ON public.itinerary_items FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.itineraries 
  WHERE itineraries.id = itinerary_items.itinerary_id 
  AND itineraries.user_id = auth.uid()
));

-- Create policies for community_posts
CREATE POLICY "Posts are viewable by everyone" 
ON public.community_posts FOR SELECT USING (true);

CREATE POLICY "Users can create posts" 
ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- Create policies for post_likes
CREATE POLICY "Likes are viewable by everyone" 
ON public.post_likes FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" 
ON public.post_likes FOR ALL USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at
  BEFORE UPDATE ON public.itineraries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update post likes count
CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for post likes count
CREATE TRIGGER update_likes_count_trigger
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_post_likes_count();

-- Insert sample destinations
INSERT INTO public.destinations (name, description, country, city, destination_type, image_url, latitude, longitude) VALUES
('Eiffel Tower', 'Iconic iron lattice tower and symbol of Paris', 'France', 'Paris', 'cultural', '/placeholder.svg', 48.8584, 2.2945),
('Machu Picchu', 'Ancient Incan citadel set high in the Andes Mountains', 'Peru', 'Cusco', 'cultural', '/placeholder.svg', -13.1631, -72.5450),
('Santorini', 'Beautiful Greek island known for white buildings and blue domes', 'Greece', 'Santorini', 'beach', '/placeholder.svg', 36.3932, 25.4615),
('Swiss Alps', 'Stunning mountain range perfect for hiking and skiing', 'Switzerland', 'Interlaken', 'mountain', '/placeholder.svg', 46.6863, 7.8632),
('Tokyo Tower', 'Communications tower inspired by the Eiffel Tower', 'Japan', 'Tokyo', 'city', '/placeholder.svg', 35.6586, 139.7454),
('Banff National Park', 'Pristine wilderness with mountains, lakes, and wildlife', 'Canada', 'Banff', 'nature', '/placeholder.svg', 51.4968, -115.9281);