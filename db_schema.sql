-- PostgreSQL Schema for Chatbot Promoción

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number TEXT UNIQUE,
  name TEXT,
  company TEXT,
  city TEXT,
  email TEXT,
  business_type TEXT,
  products_services TEXT,
  vehicle_count INTEGER,
  vehicle_type TEXT,
  main_need TEXT,
  budget TEXT,
  implementation_date TEXT,
  requested_functions TEXT[],
  lead_score TEXT DEFAULT 'cold', -- cold, warm, hot
  channel TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'new', -- new, contacted, demo, quoted, closed, lost
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  whatsapp_number TEXT,
  current_flow TEXT DEFAULT 'WELCOME',
  current_step TEXT,
  flow_data JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  is_transferred BOOLEAN DEFAULT false,
  transferred_to TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  whatsapp_number TEXT,
  direction TEXT NOT NULL, -- 'inbound' | 'outbound'
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, button, list, template
  whatsapp_message_id TEXT,
  intent_detected TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  business_type TEXT,
  requirements TEXT,
  vehicle_count INTEGER,
  functions_needed TEXT[],
  summary TEXT,
  status TEXT DEFAULT 'pending', -- pending, sent, accepted, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);
