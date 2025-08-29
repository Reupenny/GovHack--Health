export interface Patient {
    nhi: string;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    dateOfBirth: string;
    gender: string;
    address?: {
        street: string;
        city: string;
        postcode: string;
    };
    contactDetails?: {
        phone?: string;
        email?: string;
    };
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    status: 'active' | 'discontinued';
    prescribedBy: string;
}

export interface BloodTest {
    id: string;
    testDate: string;
    type: string;
    result: string;
    unit: string;
    referenceRange: string;
    orderedBy: string;
    status: 'final' | 'preliminary';
}

export interface Document {
    id: string;
    type: 'x-ray' | 'specialist-letter' | 'report' | 'lab-result' | 'discharge-summary';
    title: string;
    date: string;
    provider: string;
    contentType: string;
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

export interface ErrorResponse {
    error: string;
    message: string;
    timestamp: string;
}

export interface Provider {
    providerId: string;
    name: string;
    baseUrl: string;
}
