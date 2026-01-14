-- Create team_members table for staff management
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  quote TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_items table
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_content table for managing homepage content
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE, -- e.g., 'hero_title', 'about_description', etc.
  content_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'html', 'json'
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Team members policies
CREATE POLICY "Team members are viewable by everyone" 
ON public.team_members 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage team members" 
ON public.team_members 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Gallery items policies
CREATE POLICY "Gallery items are viewable by everyone" 
ON public.gallery_items 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage gallery items" 
ON public.gallery_items 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Site content policies
CREATE POLICY "Site content is viewable by everyone" 
ON public.site_content 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage site content" 
ON public.site_content 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();