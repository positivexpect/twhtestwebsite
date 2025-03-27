-- Function to increment votes
CREATE OR REPLACE FUNCTION increment_votes(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE ugly_windows
  SET votes = votes + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 