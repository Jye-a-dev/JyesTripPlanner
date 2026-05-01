-- =========================================================
-- Travel Planner Database Schema
-- PostgreSQL
-- Roles: admin, user
-- No AI tables
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- ENUMS
-- =========================================================

CREATE TYPE user_role AS ENUM (
  'admin',
  'user'
);

CREATE TYPE trip_status AS ENUM (
  'draft',
  'planning',
  'active',
  'completed',
  'cancelled'
);

CREATE TYPE place_type AS ENUM (
  'attraction',
  'restaurant',
  'hotel',
  'airport',
  'station',
  'shopping',
  'nature',
  'museum',
  'entertainment',
  'other'
);

CREATE TYPE itinerary_status AS ENUM (
  'planned',
  'done',
  'skipped',
  'cancelled'
);

CREATE TYPE expense_category AS ENUM (
  'food',
  'transport',
  'hotel',
  'ticket',
  'shopping',
  'entertainment',
  'other'
);

CREATE TYPE report_status AS ENUM (
  'pending',
  'reviewing',
  'resolved',
  'rejected'
);

CREATE TYPE log_action AS ENUM (
  'create',
  'update',
  'delete',
  'login',
  'logout',
  'ban',
  'unban',
  'other'
);

-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,

  role user_role DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  is_banned BOOLEAN DEFAULT FALSE,

  last_login_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- TRIPS
-- =========================================================

CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(150) NOT NULL,
  destination VARCHAR(150) NOT NULL,

  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  total_budget NUMERIC(12,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'VND',

  status trip_status DEFAULT 'draft',

  description TEXT,
  travel_style VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_trip_date CHECK (end_date >= start_date)
);

-- =========================================================
-- PLACES
-- =========================================================

CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,

  name VARCHAR(150) NOT NULL,
  type place_type DEFAULT 'other',

  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),

  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),

  opening_hours TEXT,
  ticket_price NUMERIC(12,2) DEFAULT 0,
  estimated_duration_minutes INT DEFAULT 60,

  priority INT DEFAULT 3,

  description TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- ITINERARY
-- =========================================================

CREATE TABLE itinerary_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,

  day_number INT NOT NULL,
  visit_date DATE,

  start_time TIME,
  end_time TIME,

  title VARCHAR(150) NOT NULL,
  activity TEXT,

  transport_method VARCHAR(100),
  estimated_cost NUMERIC(12,2) DEFAULT 0,

  order_index INT DEFAULT 0,

  status itinerary_status DEFAULT 'planned',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_itinerary_day CHECK (day_number > 0),
  CONSTRAINT check_itinerary_time CHECK (
    end_time IS NULL
    OR start_time IS NULL
    OR end_time >= start_time
  )
);

-- =========================================================
-- EXPENSES
-- =========================================================

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  itinerary_item_id UUID REFERENCES itinerary_items(id) ON DELETE SET NULL,

  category expense_category DEFAULT 'other',

  title VARCHAR(150) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'VND',

  expense_date DATE,
  note TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_expense_amount CHECK (amount >= 0)
);

-- =========================================================
-- NOTES
-- =========================================================

CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  itinerary_item_id UUID REFERENCES itinerary_items(id) ON DELETE SET NULL,

  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- USER REPORTS
-- user báo cáo lỗi/chuyến đi/nội dung
-- admin xử lý
-- =========================================================

CREATE TABLE user_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,

  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,

  status report_status DEFAULT 'pending',

  handled_by UUID REFERENCES users(id) ON DELETE SET NULL,
  handled_note TEXT,
  handled_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- USER BANS
-- admin khóa user
-- =========================================================

CREATE TABLE user_bans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,

  reason TEXT NOT NULL,

  banned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expired_at TIMESTAMP,

  is_active BOOLEAN DEFAULT TRUE
);

-- =========================================================
-- SYSTEM SETTINGS
-- admin cấu hình hệ thống
-- =========================================================

CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  setting_key VARCHAR(150) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,

  description TEXT,

  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- SYSTEM LOGS
-- log hành động admin/user
-- =========================================================

CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  action log_action NOT NULL,

  target_table VARCHAR(100),
  target_id UUID,

  description TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_is_banned ON users(is_banned);

CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_date ON trips(start_date, end_date);

CREATE INDEX idx_places_trip_id ON places(trip_id);
CREATE INDEX idx_places_type ON places(type);

CREATE INDEX idx_itinerary_trip_id ON itinerary_items(trip_id);
CREATE INDEX idx_itinerary_place_id ON itinerary_items(place_id);
CREATE INDEX idx_itinerary_day ON itinerary_items(trip_id, day_number);
CREATE INDEX idx_itinerary_order ON itinerary_items(trip_id, day_number, order_index);

CREATE INDEX idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_date ON expenses(expense_date);

CREATE INDEX idx_notes_trip_id ON notes(trip_id);

CREATE INDEX idx_user_reports_user_id ON user_reports(user_id);
CREATE INDEX idx_user_reports_trip_id ON user_reports(trip_id);
CREATE INDEX idx_user_reports_status ON user_reports(status);
CREATE INDEX idx_user_reports_handled_by ON user_reports(handled_by);

CREATE INDEX idx_user_bans_user_id ON user_bans(user_id);
CREATE INDEX idx_user_bans_admin_id ON user_bans(admin_id);
CREATE INDEX idx_user_bans_is_active ON user_bans(is_active);

CREATE INDEX idx_system_settings_key ON system_settings(setting_key);

CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
CREATE INDEX idx_system_logs_action ON system_logs(action);
CREATE INDEX idx_system_logs_target ON system_logs(target_table, target_id);

-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_places_updated_at
BEFORE UPDATE ON places
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itinerary_items_updated_at
BEFORE UPDATE ON itinerary_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON expenses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reports_updated_at
BEFORE UPDATE ON user_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON system_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();