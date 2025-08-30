export interface PersonName {
  title?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  suburb?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
}

export interface ContactDetails {
  phone?: string;
  mobile?: string;
  email?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
}

export interface Patient {
  nhi: string;
  name: PersonName;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  address?: Address;
  contactDetails?: ContactDetails;
  emergencyContact?: EmergencyContact;
  ethnicGroup?: string;
  preferredLanguage?: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  brandName?: string;
  dosage: string;
  frequency: string;
  route?: 'oral' | 'topical' | 'injection' | 'intravenous' | 'inhaled';
  startDate?: string;
  endDate?: string;
  prescribingDoctor?: string;
  prescriptionDate?: string;
  status: 'active' | 'discontinued' | 'completed' | 'on-hold';
  indication?: string;
  notes?: string;
}

export interface TestResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status?: 'normal' | 'abnormal' | 'critical' | 'pending';
  flags?: string[];
}

export interface BloodTest {
  id: string;
  testName: string;
  testCode?: string;
  testDate: string;
  orderingDoctor?: string;
  laboratory?: string;
  status: 'completed' | 'pending' | 'cancelled';
  results?: TestResult[];
  clinicalNotes?: string;
}

export interface Document {
  id: string;
  type: 'x-ray' | 'specialist-letter' | 'report' | 'lab-result' | 'discharge-summary' | 'referral' | 'consent-form';
  title: string;
  description?: string;
  date: string;
  author?: string;
  specialty?: string;
  facility?: string;
  contentType?: string;
  size?: number;
  tags?: string[];
}

export interface DocumentContent {
  id: string;
  content: string;
  contentType?: string;
  filename?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: string;
  timestamp: string;
}

export interface MedicationsResponse {
  medications: Medication[];
  total: number;
}

export interface BloodTestsResponse {
  bloodTests: BloodTest[];
  total: number;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
}