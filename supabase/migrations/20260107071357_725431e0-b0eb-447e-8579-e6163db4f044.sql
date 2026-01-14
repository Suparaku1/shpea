-- Create programs table for managing school programs/directions
CREATE TABLE public.programs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  image_url text,
  color text DEFAULT 'accent-blue',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for programs
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- RLS policies for programs
CREATE POLICY "Programs are viewable by everyone" ON public.programs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage programs" ON public.programs
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create contact_info table for contact details
CREATE TABLE public.contact_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  info_type text NOT NULL, -- address, phone, email, hours
  title text NOT NULL,
  details text[] NOT NULL,
  icon text,
  color text DEFAULT 'accent-blue',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for contact_info
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact_info
CREATE POLICY "Contact info is viewable by everyone" ON public.contact_info
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage contact info" ON public.contact_info
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create social_links table
CREATE TABLE public.social_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL,
  url text NOT NULL,
  icon text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for social_links
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- RLS policies for social_links
CREATE POLICY "Social links are viewable by everyone" ON public.social_links
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage social links" ON public.social_links
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create faq_items table
CREATE TABLE public.faq_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for faq_items
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for faq_items
CREATE POLICY "FAQ items are viewable by everyone" ON public.faq_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage FAQ items" ON public.faq_items
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create partners table
CREATE TABLE public.partners (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_url text,
  website_url text,
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- RLS policies for partners
CREATE POLICY "Partners are viewable by everyone" ON public.partners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage partners" ON public.partners
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create news/announcements table
CREATE TABLE public.news_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  category text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for news_items
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for news_items
CREATE POLICY "Published news are viewable by everyone" ON public.news_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage news" ON public.news_items
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at
  BEFORE UPDATE ON public.faq_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_items_updated_at
  BEFORE UPDATE ON public.news_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site content sections
INSERT INTO public.site_content (section_key, content, content_type) VALUES
  ('hero_title', 'Shkolla Profesionale Elbasan', 'text'),
  ('hero_subtitle', 'Ndërto të Ardhmen Tënde me Arsim Profesional Cilësor', 'text'),
  ('hero_description', 'Ofrojmë 11 drejtime profesionale për të rinjtë që duan të ndërtojnë një karrierë të suksesshme', 'text'),
  ('about_title', 'Rreth Nesh', 'text'),
  ('about_description', 'Shkolla Profesionale Elbasan është institucion arsimor me traditë që ofron arsim cilësor profesional.', 'text'),
  ('footer_description', 'Synojmë të jemi një qendër inovacioni, duke përgatitur të rinjtë për punësim të denjë përmes edukimit profesional.', 'text'),
  ('stat_directions', '11', 'text'),
  ('stat_years', '4', 'text'),
  ('stat_employment', '100%', 'text')
ON CONFLICT (section_key) DO NOTHING;

-- Insert default programs
INSERT INTO public.programs (title, description, image_url, color, sort_order) VALUES
  ('TIK - Teknologji Informacioni', 'Zhvillimi i aftësive në programim, rrjete kompjuterike dhe sistemet e informacionit.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&auto=format', 'accent-blue', 1),
  ('Ekonomi - Biznes', 'Përgatitja për menaxhim biznesi, kontabilitet dhe sipërmarrje.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format', 'accent-emerald', 2),
  ('Hoteleri - Turizëm', 'Shërbime hotelerie, kuzhina profesionale dhe udhërrëfyes turistik.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&auto=format', 'accent-purple', 3),
  ('Mekanikë', 'Prodhimi dhe riparimi i makinerive, torneria dhe saldimi.', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop&auto=format', 'accent-orange', 4),
  ('Elektroteknikë', 'Instalime elektrike, automatizim dhe sistemet e kontrollit.', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format', 'accent-blue', 5),
  ('Ndërtim', 'Teknikat e ndërtimit, leximi i projekteve dhe punime ndërtimore.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format', 'accent-emerald', 6);

-- Insert default contact info
INSERT INTO public.contact_info (info_type, title, details, icon, color, sort_order) VALUES
  ('address', 'Adresa e Shkollës', ARRAY['Rruga Zogu i Parë', 'Elbasan 3001, Shqipëri'], 'MapPin', 'accent-blue', 1),
  ('phone', 'Telefon', ARRAY['+355 68 333 71 71', '+355 69 88 10 796'], 'Phone', 'accent-emerald', 2),
  ('email', 'Email', ARRAY['info@shpe.al', 'leonidha.haxhinikolla@akpa.gov.al'], 'Mail', 'accent-purple', 3),
  ('hours', 'Orari i Punës', ARRAY['E Hënë - E Premte', '08:00 - 16:00'], 'Clock', 'accent-orange', 4);

-- Insert default social links
INSERT INTO public.social_links (platform, url, icon, sort_order) VALUES
  ('Facebook', 'https://facebook.com/shpe', 'Facebook', 1),
  ('Instagram', 'https://instagram.com/shpe', 'Instagram', 2),
  ('YouTube', 'https://youtube.com/shpe', 'Youtube', 3);

-- Insert default FAQ items
INSERT INTO public.faq_items (question, answer, category, sort_order) VALUES
  ('Si mund të regjistrohem në shkollë?', 'Mund të regjistroheni duke plotësuar formularin online ose duke u paraqitur personalisht në sekretarinë e shkollës me dokumentet e nevojshme.', 'Regjistrimi', 1),
  ('Cilat janë drejtimet që ofroni?', 'Ofrojmë 11 drejtime profesionale duke përfshirë TIK, Ekonomi-Biznes, Hoteleri-Turizëm, Mekanikë, Elektroteknikë dhe Ndërtim.', 'Programet', 2),
  ('Sa vite zgjat shkolla?', 'Programet tona zgjasin 4 vite dhe përfundojnë me marrjen e diplomës profesionale.', 'Programet', 3),
  ('A ofrohen bursa?', 'Po, ofrojmë bursa për nxënësit me rezultate të shkëlqyera akademike dhe për familjet me nevoja ekonomike.', 'Financat', 4);