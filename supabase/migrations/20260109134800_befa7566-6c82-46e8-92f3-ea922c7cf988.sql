-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  graduation_year INTEGER,
  program TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create statistics table for achievements
CREATE TABLE public.statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  value INTEGER NOT NULL,
  suffix TEXT DEFAULT '',
  label TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Trophy',
  color TEXT DEFAULT 'from-primary to-accent-blue',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create timeline_events table for school history
CREATE TABLE public.timeline_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  icon TEXT DEFAULT 'Calendar',
  is_milestone BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials
CREATE POLICY "Active testimonials are viewable by everyone" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for statistics
CREATE POLICY "Active statistics are viewable by everyone" 
ON public.statistics 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage statistics" 
ON public.statistics 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for timeline_events
CREATE POLICY "Active timeline events are viewable by everyone" 
ON public.timeline_events 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage timeline events" 
ON public.timeline_events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at triggers
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_statistics_updated_at
BEFORE UPDATE ON public.statistics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at
BEFORE UPDATE ON public.timeline_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, content, rating, graduation_year, program, avatar_url, sort_order) VALUES
('Arben Hoxha', 'I diplomuar 2023 - Elektroteknikë', 'Shkolla Profesionale Elbasan më dha bazat e forta për karrierën time. Tani punoj si teknik elektrik në një kompani të madhe.', 5, 2023, 'Elektroteknikë', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 1),
('Elira Shehu', 'E diplomuar 2022 - Informatikë', 'Mësuesit ishin shumë profesionalë dhe na përgatitin për tregun e punës. Falë shkollës, unë tani punoj si programuese.', 5, 2022, 'TIK', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', 2),
('Driton Berisha', 'I diplomuar 2024 - Mekanikë', 'Eksperienca praktike që mora në shkollë ishte e paçmueshme. Rekomandoj këtë shkollë për çdo të ri që dëshiron një profesion.', 5, 2024, 'Mekanikë', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 3),
('Albana Krasniqi', 'E diplomuar 2023 - Ekonomi', 'Laboratorët modernë dhe mësimdhënia praktike më ndihmuan të jem gati për punë që ditën e parë pas diplomimit.', 5, 2023, 'Ekonomi', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 4);

-- Insert default statistics
INSERT INTO public.statistics (stat_key, value, suffix, label, description, icon, color, sort_order) VALUES
('graduates', 5000, '+', 'Studentë të Diplomuar', 'Që nga themelimi', 'GraduationCap', 'from-primary to-accent-blue', 1),
('employment', 92, '%', 'Shkallë Punësimi', 'Brenda 6 muajve', 'Briefcase', 'from-accent-emerald to-primary', 2),
('awards', 50, '+', 'Çmime & Mirënjohje', 'Kombëtare dhe ndërkombëtare', 'Trophy', 'from-accent-orange to-accent-red', 3),
('partners', 30, '+', 'Partnerë Biznesi', 'Për praktikë profesionale', 'Users', 'from-accent-purple to-primary', 4),
('profiles', 15, '', 'Profile Profesionale', 'Në fusha të ndryshme', 'Award', 'from-primary to-accent-purple', 5),
('years', 40, '+', 'Vite Eksperiencë', 'Në arsimin profesional', 'TrendingUp', 'from-accent-emerald to-accent-blue', 6);

-- Insert timeline events
INSERT INTO public.timeline_events (year, title, description, icon, is_milestone, sort_order) VALUES
(1962, 'Themelimi i Shkollës', 'Shkolla Profesionale Elbasan u themelua si një nga institucionet e para të arsimit profesional në Shqipëri.', 'Building', true, 1),
(1975, 'Zgjerimi i Programeve', 'U shtuan drejtime të reja si Elektroteknika dhe Mekanika industriale.', 'Layers', false, 2),
(1990, 'Era e Re', 'Pas ndryshimeve politike, shkolla u modernizua dhe u ristrukturua.', 'RefreshCw', true, 3),
(2005, 'Partneritete Ndërkombëtare', 'Filluan bashkëpunimet me organizata europiane për arsimin profesional.', 'Globe', false, 4),
(2015, 'Laboratorë Modernë', 'Investime të mëdha në infrastrukturë dhe teknologji të re.', 'Monitor', true, 5),
(2020, 'Digjitalizimi', 'Implementimi i platformave digjitale dhe mësimit online.', 'Laptop', false, 6),
(2024, 'Sot', 'Shkolla vazhdon të jetë lider në arsimin profesional në rajon.', 'Star', true, 7);