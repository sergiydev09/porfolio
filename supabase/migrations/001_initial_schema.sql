-- Leads/Contactos
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  services_interested TEXT[] DEFAULT '{}',
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  how_found TEXT,

  -- Tracking
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  landing_page TEXT,
  user_agent TEXT,
  ip_country TEXT,

  -- Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'won', 'lost', 'spam')),
  notes TEXT,
  follow_up_date DATE,
  estimated_value DECIMAL,

  -- Soft delete
  archived BOOLEAN DEFAULT FALSE
);

-- Page views for analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  page_path TEXT NOT NULL,
  session_id TEXT,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  screen_size TEXT,
  country TEXT,
  duration_seconds INTEGER
);

-- Projects for portfolio
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT,
  role TEXT,
  period TEXT,
  thumbnail_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  challenge TEXT,
  solution TEXT,
  results JSONB,
  testimonial JSONB,

  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  benefits TEXT[] DEFAULT '{}',
  target_audience TEXT,
  deliverables TEXT[] DEFAULT '{}',
  pricing_type TEXT,
  pricing_range TEXT,

  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);
CREATE INDEX idx_projects_is_public ON projects(is_public);
CREATE INDEX idx_services_is_active ON services(is_active);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
