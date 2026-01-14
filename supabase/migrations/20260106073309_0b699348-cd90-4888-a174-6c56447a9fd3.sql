-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for media bucket
CREATE POLICY "Public can view media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update media files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'media' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete media files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'media' AND 
  has_role(auth.uid(), 'admin'::app_role)
);