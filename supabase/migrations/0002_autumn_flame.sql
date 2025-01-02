/*
  # Schema update for maintenance system

  1. Tables
    - Enable UUID extension
    - Create tables for users, documents, maintenance requests, and request_documents
  
  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
  
  3. Performance
    - Add indexes for frequently queried columns
    - Add updated_at trigger functionality
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('technician', 'supervisor', 'admin')),
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('pdf', 'text', 'image')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  equipment text NOT NULL,
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  requested_by uuid REFERENCES users(id) NOT NULL,
  assigned_to uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS request_documents (
  request_id uuid REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (request_id, document_id)
);

-- Enable Row Level Security
DO $$ 
BEGIN
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
  ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
  ALTER TABLE request_documents ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Supervisors and admins can view all users" ON users;
DROP POLICY IF EXISTS "Users can view documents" ON documents;
DROP POLICY IF EXISTS "Users can create documents" ON documents;
DROP POLICY IF EXISTS "Users can update their own documents" ON documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON documents;
DROP POLICY IF EXISTS "Users can view maintenance requests" ON maintenance_requests;
DROP POLICY IF EXISTS "Users can create maintenance requests" ON maintenance_requests;
DROP POLICY IF EXISTS "Users can update their own requests or assigned requests" ON maintenance_requests;
DROP POLICY IF EXISTS "Users can view request documents" ON request_documents;
DROP POLICY IF EXISTS "Users can link documents to their requests" ON request_documents;

-- Create new policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Supervisors and admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('supervisor', 'admin'));

CREATE POLICY "Users can view documents"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Admins can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view maintenance requests"
  ON maintenance_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create maintenance requests"
  ON maintenance_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = requested_by);

CREATE POLICY "Users can update their own requests or assigned requests"
  ON maintenance_requests FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = requested_by OR 
    auth.uid() = assigned_to OR
    auth.jwt() ->> 'role' IN ('supervisor', 'admin')
  );

CREATE POLICY "Users can view request documents"
  ON request_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can link documents to their requests"
  ON request_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM maintenance_requests
      WHERE id = request_id AND requested_by = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_priority ON maintenance_requests(priority);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
DO $$ 
BEGIN
  CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
EXCEPTION
  WHEN others THEN NULL;
END $$;

DO $$ 
BEGIN
  CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
EXCEPTION
  WHEN others THEN NULL;
END $$;

DO $$ 
BEGIN
  CREATE TRIGGER update_maintenance_requests_updated_at
    BEFORE UPDATE ON maintenance_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
EXCEPTION
  WHEN others THEN NULL;
END $$;