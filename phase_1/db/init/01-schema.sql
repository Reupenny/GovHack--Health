-- OpenHealth Database Schema
-- This script initializes the database for the OpenHealth system

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create providers table
CREATE TABLE providers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    provider_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    base_url VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE patients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nhi VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    address JSONB,
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create medications table
CREATE TABLE medications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_nhi VARCHAR(20) REFERENCES patients(nhi),
    provider_id VARCHAR(100) REFERENCES providers(provider_id),
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    prescribed_date DATE,
    prescribed_by VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blood_tests table
CREATE TABLE blood_tests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_nhi VARCHAR(20) REFERENCES patients(nhi),
    provider_id VARCHAR(100) REFERENCES providers(provider_id),
    test_name VARCHAR(255) NOT NULL,
    test_date DATE NOT NULL,
    results JSONB,
    status VARCHAR(50) DEFAULT 'completed',
    ordered_by VARCHAR(255),
    lab VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_nhi VARCHAR(20) REFERENCES patients(nhi),
    provider_id VARCHAR(100) REFERENCES providers(provider_id),
    document_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_url VARCHAR(500),
    document_date DATE,
    created_by VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_patients_nhi ON patients(nhi);
CREATE INDEX idx_medications_patient_nhi ON medications(patient_nhi);
CREATE INDEX idx_medications_status ON medications(status);
CREATE INDEX idx_blood_tests_patient_nhi ON blood_tests(patient_nhi);
CREATE INDEX idx_blood_tests_date ON blood_tests(test_date);
CREATE INDEX idx_documents_patient_nhi ON documents(patient_nhi);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_providers_provider_id ON providers(provider_id);
CREATE INDEX idx_providers_status ON providers(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blood_tests_updated_at BEFORE UPDATE ON blood_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();