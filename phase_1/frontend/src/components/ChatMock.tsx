import React from 'react';
import type { Patient, Medication, BloodTest, Provider } from '../types';

interface ChatMockProps {
    getPatient: () => Patient | null;
    getMedications: () => Medication[];
    getBloodTests: () => BloodTest[];
    getProviders: () => Provider[];
    getDocuments: () => any[];
}

// This mock just displays the data endpoints for demonstration
export const ChatMock: React.FC<ChatMockProps> = ({
    getPatient,
    getMedications,
    getBloodTests,
    getProviders,
    getDocuments
}) => {
    return (
        <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e0e0e0' }}>
            <h3>ChatMock Data Endpoints</h3>
            <pre style={{ fontSize: 12, background: '#fff', padding: 8, borderRadius: 4, overflow: 'auto' }}>
                {JSON.stringify({
                    patient: getPatient(),
                    medications: getMedications(),
                    bloodTests: getBloodTests(),
                    providers: getProviders(),
                    documents: getDocuments()
                }, null, 2)}
            </pre>
            <p style={{ color: '#888', fontSize: 13 }}>This is a mock. The real Chat component would use these endpoints.</p>
        </div>
    );
};
