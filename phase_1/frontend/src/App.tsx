import React, { useState, useEffect } from 'react';
import {
    fetchPatientData,
    fetchMedications,
    fetchBloodTests,
    registerProvider,
    fetchDocuments
} from './api';
import { Chat } from './components/Chat';
import type {
    Medication,
    BloodTest,
    Provider
} from './types';

interface Patient {
    nhi: string;
    name: {
        title: string;
        firstName: string;
        lastName: string;
    };
    dateOfBirth: string;
    gender: string;
    address: {
        line1: string;
        line2?: string;
        suburb: string;
        city: string;
        region: string;
        postcode: string;
        country: string;
    };
    contactDetails: {
        phone: string;
        mobile: string;
        email: string;
    };
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    ethnicGroup: string;
    preferredLanguage: string;
};
import './App.css';
import './components/DocumentList.css';
import './components/PatientInfo.css';
import './components/ProviderList.css';

// Add styles
const styles = {
    nav: {
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        marginBottom: '2rem'
    },
    navLink: {
        margin: '0 1rem',
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold'
    }
} as const;

const DEMO_NHI = 'ABC1234'; // Demo NHI for testing

function PatientInfo({ patient }: { patient: Patient }) {
    return (
        <div className="patient-info">
            <div className="info-section">
                <h3>{patient.name.title} {patient.name.firstName} {patient.name.lastName}</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>NHI: </label>
                        <span>{patient.nhi}</span>
                    </div>
                    <div className="info-item">
                        <label>D.O.B: </label>
                        <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender: </label>
                        <span>{patient.gender}</span>
                    </div>
                    <div className="info-item">
                        <label>Ethnicit: y</label>
                        <span>{patient.ethnicGroup}</span>
                    </div>
                    <div className="info-item">
                        <label>Preferred Language: </label>
                        <span>{patient.preferredLanguage}</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h4>Contact Details</h4>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Phone: </label>
                        <span>{patient.contactDetails.phone}</span>
                    </div>
                    <div className="info-item">
                        <label>Mobile: </label>
                        <span>{patient.contactDetails.mobile}</span>
                    </div>
                    <div className="info-item">
                        <label>Email: </label>
                        <span>{patient.contactDetails.email}</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h4>Address</h4>
                <div className="info-grid">
                    <div className="info-item full-width">
                        <span>
                            {patient.address.line1}
                            {patient.address.line2 && <>, {patient.address.line2}</>}<br />
                            {patient.address.suburb}, {patient.address.city}<br />
                            {patient.address.region} {patient.address.postcode}<br />
                            {patient.address.country}
                        </span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h4>Emergency Contact</h4>
                <div className="info-grid">
                    <div className="info-item">
                        <span>{patient.emergencyContact.name}</span>
                    </div>
                    <div className="info-item">
                        <label>Relationship: </label>
                        <span>{patient.emergencyContact.relationship}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone: </label>
                        <span>{patient.emergencyContact.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MedicationList({ medications }: { medications: Medication[] }) {
    return (
        <div className="medication-list">
            {medications.map(med => (
                <div key={med.id} className="medication-item">
                    <h4>{med.name}</h4>
                    <p>Dosage: {med.dosage}</p>
                    <p>Frequency: {med.frequency}</p>
                    <p>Status: {med.status}</p>
                </div>
            ))}
        </div>
    );
}

function BloodTestList({ tests }: { tests: BloodTest[] }) {
    return (
        <div className="blood-test-list">
            {tests.map(test => (
                <div key={test.id} className="blood-test-item">
                    <h4>{test.type}</h4>
                    <p>Result: {test.result} {test.unit}</p>
                    <p>Reference Range: {test.referenceRange}</p>
                    <p>Date: {new Date(test.testDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

interface Document {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    author: string;
    specialty: string;
    facility: string;
    contentType: string;
    size: number;
    tags: string[];
}

function formatFileSize(bytes: number): string {
    const kb = bytes / 1024;
    if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
}

function DocumentList({ documents, nhi }: { documents: Document[], nhi: string }) {
    const handleDownload = async (documentId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/patients/${nhi}/documents/${documentId}`);
            if (!response.ok) {
                throw new Error('Failed to download document');
            }

            // Get the document content
            const blob = await response.blob();

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and click it to trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${documentId}`; // You might want to use a better filename
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading document:', error);
            alert('Failed to download document. Please try again.');
        }
    };

    return (
        <div className="document-list">
            {documents.map(doc => (
                <div key={doc.id} className="document-item">
                    <div className="document-header">
                        <h4>{doc.title}</h4>
                        <span className="document-type">{doc.type}</span>
                    </div>
                    <p className="document-description">{doc.description}</p>
                    <div className="document-details">
                        <div className="detail-item">
                            <label>Date</label>
                            <span>{new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                        <div className="detail-item">
                            <label>Author</label>
                            <span>{doc.author}</span>
                        </div>
                        <div className="detail-item">
                            <label>Specialty</label>
                            <span>{doc.specialty}</span>
                        </div>
                        <div className="detail-item">
                            <label>Facility</label>
                            <span>{doc.facility}</span>
                        </div>
                        <div className="detail-item">
                            <label>Size</label>
                            <span>{formatFileSize(doc.size)}</span>
                        </div>
                    </div>
                    <div className="document-tags">
                        {doc.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                    <button
                        className="document-download"
                        onClick={() => handleDownload(doc.id)}
                    >
                        View {doc.contentType.split('/')[1].toUpperCase()}
                    </button>
                </div>
            ))}
        </div>
    );
}

// Removed duplicate PatientDashboard component as it's replaced by Dashboard

interface DashboardProps {
    nhi: string;
    patient: Patient | null;
    medications: Medication[];
    bloodTests: BloodTest[];
    documents: Document[];
    loading: boolean;
    error: string | null;
    onNhiChange: (nhi: string) => void;
    providerRegistered: boolean;
    onRegisterProvider: () => Promise<void>;
    onRegisterToniq: () => Promise<void>;
    providers: Provider[];
}

const Dashboard: React.FC<DashboardProps> = ({
    nhi,
    patient,
    medications,
    bloodTests,
    documents,
    loading,
    error,
    onNhiChange,
    providerRegistered,
    onRegisterProvider,
    onRegisterToniq,
    providers
}) => {
    return (
        <div className="dashboard">
            {/* Left Column */}
            <div className="left-sidebar">
                <div className="left-column">
                    {!providerRegistered && (
                        <button
                            className="register-provider-btn"
                            onClick={onRegisterProvider}
                        >
                            Register DHB
                        </button>
                    )}
                    <button
                        className="register-provider-btn"
                        style={{ marginTop: 8, background: '#6c63ff', color: 'white' }}
                        onClick={onRegisterToniq}
                    >
                        Register Toniq
                    </button>
                    <input
                        type="text"
                        placeholder="Search NHI"
                        value={nhi}
                        onChange={(e) => onNhiChange(e.target.value.toUpperCase())}
                    />
                    {!patient && !loading && (
                        <p className="hint">Try: ABC1234, DEF5678, GHI9012</p>
                    )}
                    <div className="providers-list">
                        <h3>Registered providers</h3>
                        {providers.length === 0 ? (
                            <p className="no-providers">No providers registered</p>
                        ) : (
                            <ul>
                                {providers.map(provider => (
                                    <li key={provider.providerId} className="provider-item">
                                        <span className="provider-name">{provider.name}</span>
                                        <span className="provider-id">ID: {provider.providerId}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {patient && (
                        <div className="patient-sidebar-info">
                            <PatientInfo patient={patient} />
                        </div>
                    )}
                </div>
            </div>            {/* Main Content Area */}
            <div className="main-content">
                <div className="dashboard-grid">
                    {/* Middle Column */}
                    <div className="middle-column">
                        {loading ? (
                            <div className="status-container">
                                <p>Loading...</p>
                            </div>
                        ) : error ? (
                            <div className="error-container">
                                <h2>Error</h2>
                                <p>{error}</p>
                            </div>
                        ) : patient ? (
                            <div className="health-content">
                                <div className="section">
                                    <h2>Documents</h2>
                                    <DocumentList documents={documents} nhi={nhi} />
                                </div>
                                <div className="section">
                                    <h3>Tests</h3>
                                    <BloodTestList tests={bloodTests} />
                                </div>
                            </div>
                        ) : (
                            <div className="error-container">
                                <p>No patient selected</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <h2>Medications</h2>
                        {patient && <MedicationList medications={medications} />}
                    </div>
                </div>

                <div className="chat-area">
                    <Chat />
                </div>
            </div>
        </div>
    );
};

const PatientDashboardContainer: React.FC = () => {
    const [nhi, setNhi] = useState(DEMO_NHI);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [bloodTests, setBloodTests] = useState<BloodTest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [providerRegistered, setProviderRegistered] = useState(false);

    const registerDHB = async () => {
        try {
            const newProvider = {
                providerId: 'DHB_1',
                name: 'Local DHB',
                baseUrl: 'http://localhost:3001/api/v1'
            };
            await registerProvider(newProvider);
            setProviders(prev => [...prev, newProvider]);
            setProviderRegistered(true);
        } catch (error) {
            setError('Failed to register DHB provider: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [patientData, medicationsData, bloodTestsData, documentsData] = await Promise.all([
                    fetchPatientData(nhi),
                    fetchMedications(nhi, true),
                    fetchBloodTests(nhi),
                    fetch(`http://localhost:3000/patients/${nhi}/documents`).then(res => res.json())
                ]);

                setPatient(patientData);
                setMedications(medicationsData.medications || []);
                setBloodTests(bloodTestsData.bloodTests || []);
                setDocuments(documentsData.documents || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nhi]);

    const registerToniq = async () => {
        try {
            const newProvider = {
                providerId: 'TONIQ_1',
                name: 'Toniq',
                baseUrl: 'http://localhost:3002/api/v1'
            };
            await registerProvider(newProvider);
            setProviders(prev => [...prev, newProvider]);
        } catch (error) {
            setError('Failed to register Toniq provider: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };
    return (
        <Dashboard
            nhi={nhi}
            patient={patient}
            medications={medications}
            bloodTests={bloodTests}
            documents={documents}
            loading={loading}
            error={error}
            onNhiChange={setNhi}
            providerRegistered={providerRegistered}
            onRegisterProvider={registerDHB}
            onRegisterToniq={registerToniq}
            providers={providers}
        />
    );
};

const App: React.FC = () => {
    const [providerRegistered, setProviderRegistered] = useState(false);

    const registerDHB = async () => {
        try {
            await registerProvider({
                providerId: 'DHB_1',
                name: 'Local DHB',
                baseUrl: 'http://localhost:3001'
            });
            alert('DHB provider registered successfully!');
            setProviderRegistered(true);
        } catch (error) {
            alert('Failed to register DHB provider: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>OpenHealth Patient Portal</h1>
            </header>
            <PatientDashboardContainer />
        </div>
    );
}

export default App;
