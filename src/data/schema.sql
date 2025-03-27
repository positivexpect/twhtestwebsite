-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('video-testimonials', 'video-testimonials', true),
  ('ugly-windows', 'ugly-windows', true);

-- Create video testimonials table
CREATE TABLE IF NOT EXISTS video_testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_url TEXT NOT NULL,
    video_file_path TEXT,
    contact_info TEXT NOT NULL,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    social_media_links TEXT[],
    notes TEXT
);

-- Create ugly windows contest table
CREATE TABLE IF NOT EXISTS ugly_windows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    photo_url TEXT,
    photo_file_path TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'winner', 'not_selected')),
    votes INTEGER DEFAULT 0,
    notes TEXT
);

-- Create anonymous tips table
CREATE TABLE IF NOT EXISTS anonymous_tips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    person_in_need_info TEXT NOT NULL,
    tipper_info TEXT,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'completed', 'denied')),
    notes TEXT
);

-- Create RLS policies
ALTER TABLE video_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE ugly_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE anonymous_tips ENABLE ROW LEVEL SECURITY;

-- Allow public to insert into all tables
CREATE POLICY "Allow public insert" ON video_testimonials
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Allow public insert" ON ugly_windows
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Allow public insert" ON anonymous_tips
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow only authenticated users to read all submissions
CREATE POLICY "Allow authenticated read" ON video_testimonials
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON ugly_windows
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read" ON anonymous_tips
    FOR SELECT TO authenticated
    USING (true);

-- Allow public to read approved submissions
CREATE POLICY "Allow public read approved" ON video_testimonials
    FOR SELECT TO public
    USING (status = 'approved');

CREATE POLICY "Allow public read all" ON ugly_windows
    FOR SELECT TO public
    USING (true);

-- Allow public to update votes
CREATE POLICY "Allow public update votes" ON ugly_windows
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true); 