-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Replace 'tu-email@dominio.com' with your actual admin email

-- Leads policies
CREATE POLICY "Allow public insert on leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin full access to leads" ON leads
  FOR ALL USING (auth.jwt() ->> 'email' = 'tu-email@dominio.com');

-- Page views policies
CREATE POLICY "Allow public insert on page_views" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin select on page_views" ON page_views
  FOR SELECT USING (auth.jwt() ->> 'email' = 'tu-email@dominio.com');

-- Projects policies
CREATE POLICY "Allow public read on public projects" ON projects
  FOR SELECT USING (is_public = true);

CREATE POLICY "Allow admin full access to projects" ON projects
  FOR ALL USING (auth.jwt() ->> 'email' = 'tu-email@dominio.com');

-- Services policies
CREATE POLICY "Allow public read on active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to services" ON services
  FOR ALL USING (auth.jwt() ->> 'email' = 'tu-email@dominio.com');
