
-- Create hero_slides table for carousel management
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  button_text TEXT DEFAULT 'Learn More',
  button_link TEXT DEFAULT '#',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view active hero slides"
ON public.hero_slides
AS PERMISSIVE
FOR SELECT
TO public
USING (is_active = true);

-- Admin full access
CREATE POLICY "Admins can manage hero slides"
ON public.hero_slides
AS PERMISSIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_hero_slides_updated_at
BEFORE UPDATE ON public.hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default slides
INSERT INTO public.hero_slides (title, subtitle, description, sort_order) VALUES
('Premium Dental Solutions', 'Quality You Can Trust', 'PLUSDEN Cambodia brings world-class dental equipment and supplies to elevate your practice with cutting-edge technology.', 0),
('Advanced Digital Imaging', 'Meyer Healthcare Technology', 'Experience precision diagnostics with our CBCT systems, panoramic X-rays, and intraoral scanners.', 1),
('Complete Infection Control', 'Meyer Products', 'Protect your patients and staff with our comprehensive range of sterilization and hygiene solutions.', 2);
