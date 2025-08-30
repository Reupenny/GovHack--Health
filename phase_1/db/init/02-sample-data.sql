-- Sample data for OpenHealth system
-- This script populates the database with sample data for testing

-- Insert sample patients
INSERT INTO patients (nhi, first_name, last_name, date_of_birth, gender, address, phone, email) VALUES 
('ABC1234', 'John', 'Doe', '1985-03-15', 'Male', '{"street": "123 Main St", "city": "Auckland", "postcode": "1010"}', '+64-9-123-4567', 'john.doe@email.com'),
('DEF5678', 'Maria', 'Garcia', '1978-07-22', 'Female', '{"street": "456 Queen St", "city": "Wellington", "postcode": "6011"}', '+64-4-987-6543', 'maria.garcia@email.com'),
('GHI9012', 'Priya', 'Patel', '1982-11-08', 'Female', '{"street": "789 King St", "city": "Christchurch", "postcode": "8011"}', '+64-3-555-0123', 'priya.patel@email.com');

-- Note: Providers will be inserted dynamically when services register
-- But we can pre-populate some expected providers
INSERT INTO providers (provider_id, name, base_url, status) VALUES 
('dhb-auckland', 'Auckland DHB', 'http://localhost:3001/api/v1', 'pending'),
('toniq-medications', 'Toniq Medication Services', 'http://localhost:3003/api/v1', 'pending');

-- Sample medications (these would normally come from the Toniq service)
INSERT INTO medications (patient_nhi, provider_id, medication_name, dosage, frequency, status, prescribed_date, prescribed_by, notes) VALUES 
('ABC1234', 'toniq-medications', 'Lisinopril', '10mg', 'Once daily', 'active', '2024-01-15', 'Dr. Smith', 'For blood pressure management'),
('ABC1234', 'toniq-medications', 'Metformin', '500mg', 'Twice daily', 'active', '2024-02-01', 'Dr. Johnson', 'For diabetes management'),
('DEF5678', 'toniq-medications', 'Levothyroxine', '75mcg', 'Once daily', 'active', '2024-01-20', 'Dr. Brown', 'For thyroid condition'),
('GHI9012', 'toniq-medications', 'Amlodipine', '5mg', 'Once daily', 'active', '2024-02-10', 'Dr. Wilson', 'For hypertension');

-- Sample blood tests (these would normally come from the DHB service)
INSERT INTO blood_tests (patient_nhi, provider_id, test_name, test_date, results, status, ordered_by, lab, notes) VALUES 
('ABC1234', 'dhb-auckland', 'Full Blood Count', '2024-08-15', '{"hemoglobin": "14.5 g/dL", "hematocrit": "42%", "white_cells": "6.8 x10^9/L", "platelets": "280 x10^9/L"}', 'completed', 'Dr. Smith', 'Auckland City Hospital Lab', 'Normal results'),
('ABC1234', 'dhb-auckland', 'HbA1c', '2024-08-15', '{"value": "7.2%", "range": "<7% target"}', 'completed', 'Dr. Johnson', 'Auckland City Hospital Lab', 'Slightly elevated, adjust medication'),
('DEF5678', 'dhb-auckland', 'Thyroid Function', '2024-08-20', '{"TSH": "2.1 mIU/L", "T4": "12.5 pmol/L", "T3": "4.8 pmol/L"}', 'completed', 'Dr. Brown', 'Wellington Hospital Lab', 'Within normal range'),
('GHI9012', 'dhb-auckland', 'Lipid Panel', '2024-08-25', '{"total_cholesterol": "5.8 mmol/L", "HDL": "1.2 mmol/L", "LDL": "3.8 mmol/L", "triglycerides": "1.9 mmol/L"}', 'completed', 'Dr. Wilson', 'Christchurch Hospital Lab', 'Elevated LDL, dietary counseling advised');

-- Sample documents
INSERT INTO documents (patient_nhi, provider_id, document_type, title, content, document_date, created_by, status) VALUES 
('ABC1234', 'dhb-auckland', 'consultation', 'Annual Health Check', 'Patient presented for routine annual health assessment. Overall health good, managing diabetes and hypertension well with current medications.', '2024-08-15', 'Dr. Smith', 'active'),
('DEF5678', 'dhb-auckland', 'consultation', 'Thyroid Follow-up', 'Patient reports feeling well on current thyroid medication. No symptoms of hyper/hypothyroidism. Continue current dose.', '2024-08-20', 'Dr. Brown', 'active'),
('GHI9012', 'dhb-auckland', 'consultation', 'Hypertension Review', 'Blood pressure well controlled on current medication. Patient advised on lifestyle modifications for cholesterol management.', '2024-08-25', 'Dr. Wilson', 'active');