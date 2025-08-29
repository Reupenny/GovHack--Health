import type { Patient, Medication, BloodTest, Document } from './types.js';

export const mockPatients: Record<string, Patient> = {
  'ABC1234': {
    nhi: 'ABC1234',
    name: {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe'
    },
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: {
      line1: '123 Main Street',
      line2: 'Apartment 4B',
      suburb: 'Newmarket',
      city: 'Auckland',
      region: 'Auckland',
      postcode: '1023',
      country: 'NZ'
    },
    contactDetails: {
      phone: '+64 9 123 4567',
      mobile: '+64 21 987 6543',
      email: 'john.doe@example.com'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Wife',
      phone: '+64 21 555 0123'
    },
    ethnicGroup: 'NZ European',
    preferredLanguage: 'English'
  },
  'DEF5678': {
    nhi: 'DEF5678',
    name: {
      title: 'Ms',
      firstName: 'Maria',
      lastName: 'Garcia'
    },
    dateOfBirth: '1990-03-22',
    gender: 'female',
    address: {
      line1: '456 Queen Street',
      city: 'Wellington',
      region: 'Wellington',
      postcode: '6011',
      country: 'NZ'
    },
    contactDetails: {
      phone: '+64 4 456 7890',
      email: 'maria.garcia@example.com'
    },
    ethnicGroup: 'Latin American',
    preferredLanguage: 'Spanish'
  },
  'GHI9012': {
    nhi: 'GHI9012',
    name: {
      title: 'Dr',
      firstName: 'Priya',
      lastName: 'Patel'
    },
    dateOfBirth: '1978-11-08',
    gender: 'female',
    address: {
      line1: '789 Papanui Road',
      suburb: 'Papanui',
      city: 'Christchurch',
      region: 'Canterbury',
      postcode: '8052',
      country: 'NZ'
    },
    contactDetails: {
      phone: '+64 3 789 0123',
      mobile: '+64 27 111 2233',
      email: 'priya.patel@example.com'
    },
    ethnicGroup: 'Indian',
    preferredLanguage: 'English'
  }
};

export const mockMedications: Record<string, Medication[]> = {
  'ABC1234': [
    {
      id: 'med1',
      name: 'Aspirin',
      genericName: 'Acetylsalicylic acid',
      brandName: 'Disprin',
      dosage: '100mg',
      frequency: 'once daily',
      route: 'oral',
      startDate: '2024-01-01',
      prescribingDoctor: 'Dr. Smith',
      prescriptionDate: '2024-01-01',
      status: 'active',
      indication: 'Cardiovascular protection'
    },
    {
      id: 'med2',
      name: 'Metformin',
      genericName: 'Metformin hydrochloride',
      dosage: '500mg',
      frequency: 'twice daily',
      route: 'oral',
      startDate: '2023-06-15',
      prescribingDoctor: 'Dr. Jones',
      prescriptionDate: '2023-06-15',
      status: 'active',
      indication: 'Type 2 diabetes'
    },
    {
      id: 'med3',
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      dosage: '500mg',
      frequency: 'as needed',
      route: 'oral',
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      prescribingDoctor: 'Dr. Brown',
      prescriptionDate: '2023-12-01',
      status: 'discontinued',
      indication: 'Pain relief'
    }
  ],
  'DEF5678': [
    {
      id: 'med4',
      name: 'Levothyroxine',
      dosage: '75mcg',
      frequency: 'once daily',
      route: 'oral',
      startDate: '2023-03-01',
      prescribingDoctor: 'Dr. Wilson',
      prescriptionDate: '2023-03-01',
      status: 'active',
      indication: 'Hypothyroidism'
    }
  ],
  'GHI9012': [
    {
      id: 'med5',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'once daily',
      route: 'oral',
      startDate: '2023-08-01',
      prescribingDoctor: 'Dr. Taylor',
      prescriptionDate: '2023-08-01',
      status: 'active',
      indication: 'Hypertension'
    }
  ]
};

export const mockBloodTests: Record<string, BloodTest[]> = {
  'ABC1234': [
    {
      id: 'bt1',
      testName: 'Full Blood Count',
      testCode: 'FBC',
      testDate: '2024-01-15T10:30:00Z',
      orderingDoctor: 'Dr. Smith',
      laboratory: 'Auckland City Hospital Lab',
      status: 'completed',
      results: [
        {
          parameter: 'Hemoglobin',
          value: '14.2',
          unit: 'g/dL',
          referenceRange: '12.0-15.5',
          status: 'normal'
        },
        {
          parameter: 'White Blood Cell Count',
          value: '6.8',
          unit: '10^9/L',
          referenceRange: '4.0-10.0',
          status: 'normal'
        },
        {
          parameter: 'Platelet Count',
          value: '280',
          unit: '10^9/L',
          referenceRange: '150-400',
          status: 'normal'
        }
      ],
      clinicalNotes: 'Normal results. Continue current medication.'
    },
    {
      id: 'bt2',
      testName: 'Lipid Profile',
      testCode: 'LIPIDS',
      testDate: '2024-01-15T10:35:00Z',
      orderingDoctor: 'Dr. Smith',
      laboratory: 'Auckland City Hospital Lab',
      status: 'completed',
      results: [
        {
          parameter: 'Total Cholesterol',
          value: '5.8',
          unit: 'mmol/L',
          referenceRange: '<5.2',
          status: 'abnormal',
          flags: ['high']
        },
        {
          parameter: 'HDL Cholesterol',
          value: '1.2',
          unit: 'mmol/L',
          referenceRange: '>1.0',
          status: 'normal'
        },
        {
          parameter: 'LDL Cholesterol',
          value: '3.8',
          unit: 'mmol/L',
          referenceRange: '<3.5',
          status: 'abnormal',
          flags: ['high']
        }
      ],
      clinicalNotes: 'Elevated cholesterol levels. Recommend dietary changes and follow-up in 3 months.'
    }
  ],
  'DEF5678': [
    {
      id: 'bt3',
      testName: 'Thyroid Function Tests',
      testCode: 'TFT',
      testDate: '2024-01-10T09:00:00Z',
      orderingDoctor: 'Dr. Wilson',
      laboratory: 'Wellington Hospital Lab',
      status: 'completed',
      results: [
        {
          parameter: 'TSH',
          value: '2.5',
          unit: 'mIU/L',
          referenceRange: '0.5-4.0',
          status: 'normal'
        },
        {
          parameter: 'Free T4',
          value: '15.2',
          unit: 'pmol/L',
          referenceRange: '10.0-22.0',
          status: 'normal'
        }
      ]
    }
  ],
  'GHI9012': [
    {
      id: 'bt4',
      testName: 'Basic Metabolic Panel',
      testCode: 'BMP',
      testDate: '2024-01-12T08:15:00Z',
      orderingDoctor: 'Dr. Taylor',
      laboratory: 'Christchurch Hospital Lab',
      status: 'completed',
      results: [
        {
          parameter: 'Glucose',
          value: '5.2',
          unit: 'mmol/L',
          referenceRange: '3.9-6.1',
          status: 'normal'
        },
        {
          parameter: 'Creatinine',
          value: '75',
          unit: 'umol/L',
          referenceRange: '60-110',
          status: 'normal'
        }
      ]
    }
  ]
};

export const mockDocuments: Record<string, Document[]> = {
  'ABC1234': [
    {
      id: 'doc1',
      type: 'x-ray',
      title: 'Chest X-Ray Report',
      description: 'Routine chest X-ray examination',
      date: '2024-01-10T09:00:00Z',
      author: 'Dr. Johnson (Radiologist)',
      specialty: 'Radiology',
      facility: 'Auckland City Hospital',
      contentType: 'application/pdf',
      size: 1024768,
      tags: ['chest', 'routine', 'normal']
    },
    {
      id: 'doc2',
      type: 'specialist-letter',
      title: 'Cardiology Consultation Report',
      description: 'Follow-up consultation for cardiovascular risk assessment',
      date: '2024-01-08T14:30:00Z',
      author: 'Dr. Anderson (Cardiologist)',
      specialty: 'Cardiology',
      facility: 'Auckland City Hospital',
      contentType: 'application/pdf',
      size: 512384,
      tags: ['cardiology', 'consultation', 'risk-assessment']
    },
    {
      id: 'doc3',
      type: 'lab-result',
      title: 'Blood Test Results - January 2024',
      description: 'Complete blood count and lipid profile results',
      date: '2024-01-15T16:00:00Z',
      author: 'Auckland City Hospital Lab',
      specialty: 'Pathology',
      facility: 'Auckland City Hospital',
      contentType: 'application/pdf',
      size: 256192,
      tags: ['blood-test', 'lipids', 'fbc']
    }
  ],
  'DEF5678': [
    {
      id: 'doc4',
      type: 'discharge-summary',
      title: 'Emergency Department Discharge Summary',
      description: 'Treatment summary for acute appendicitis',
      date: '2023-12-20T22:15:00Z',
      author: 'Dr. Martinez (Emergency Medicine)',
      specialty: 'Emergency Medicine',
      facility: 'Wellington Hospital',
      contentType: 'application/pdf',
      size: 384576,
      tags: ['emergency', 'appendicitis', 'discharge']
    },
    {
      id: 'doc5',
      type: 'specialist-letter',
      title: 'Endocrinology Follow-up Letter',
      description: 'Thyroid function monitoring and medication adjustment',
      date: '2024-01-05T11:00:00Z',
      author: 'Dr. Kim (Endocrinologist)',
      specialty: 'Endocrinology',
      facility: 'Wellington Hospital',
      contentType: 'application/pdf',
      size: 298752,
      tags: ['endocrinology', 'thyroid', 'follow-up']
    }
  ],
  'GHI9012': [
    {
      id: 'doc6',
      type: 'report',
      title: 'Annual Health Check Report',
      description: 'Comprehensive annual health assessment',
      date: '2024-01-03T10:00:00Z',
      author: 'Dr. Taylor',
      specialty: 'General Practice',
      facility: 'Christchurch Medical Centre',
      contentType: 'application/pdf',
      size: 675840,
      tags: ['annual-check', 'comprehensive', 'general-practice']
    }
  ]
};

export const mockDocumentContent: Record<string, string> = {
  'doc1': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==',
  'doc2': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==',
  'doc3': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==',
  'doc4': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==',
  'doc5': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==',
  'doc6': 'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg=='
};