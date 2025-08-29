import React, { useState, useEffect } from 'react';
import {
    fetchPatientData,
    fetchMedications,
    fetchBloodTests,
    registerProvider
} from './api';
import type {
    Patient,
    Medication,
    BloodTest,
    Provider,
    Document
} from './types';
import './App.css';

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
            <h3>{patient.name.first} {patient.name.last}</h3>
            <p>NHI: {patient.nhi}</p>
            <p>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            {patient.address && (
                <p>
                    {patient.address.street}<br />
                    {patient.address.city}, {patient.address.postcode}
                </p>
            )}
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

function DocumentList({ documents }: { documents: Document[] }) {
    return (
        <div className="document-list">
            {documents.map(doc => (
                <div key={doc.id} className="document-item">
                    <h4>{doc.title}</h4>
                    <p>Type: {doc.type}</p>
                    <p>Date: {new Date(doc.date).toLocaleDateString()}</p>
                    <p>Provider: {doc.provider}</p>
                </div>
            ))}
        </div>
    );
}

const PatientDashboard: React.FC = () => {
    const [nhi, setNhi] = useState(DEMO_NHI);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [bloodTests, setBloodTests] = useState<BloodTest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [patientData, medicationsData, bloodTestsData] = await Promise.all([
                    fetchPatientData(nhi),
                    fetchMedications(nhi, true),
                    fetchBloodTests(nhi)
                ]);

                setPatient(patientData);
                setMedications(medicationsData.medications);
                setBloodTests(bloodTestsData.bloodTests);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nhi]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="error-container">
                <h2>Not Found</h2>
                <p>Could not find patient with NHI: {nhi}</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter NHI number"
                    value={nhi}
                    onChange={(e) => setNhi(e.target.value.toUpperCase())}
                />
            </div>

            <div className="data-container">
                <PatientInfo patient={patient} />

                <div className="section">
                    <h2>Medications</h2>
                    <MedicationList medications={medications} />
                </div>

                <div className="section">
                    <h2>Blood Tests</h2>
                    <BloodTestList tests={bloodTests} />
                </div>
            </div>
        </div>
    );
};

interface DashboardProps {
    nhi: string;
    patient: Patient | null;
    medications: Medication[];
    bloodTests: BloodTest[];
    loading: boolean;
    error: string | null;
    onNhiChange: (nhi: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    nhi,
    patient,
    medications,
    bloodTests,
    loading,
    error,
    onNhiChange
}) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="error-container">
                <h2>Not Found</h2>
                <p>Could not find patient with NHI: {nhi}</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter NHI number"
                    value={nhi}
                    onChange={(e) => onNhiChange(e.target.value.toUpperCase())}
                />
            </div>

            <div className="data-container">
                <PatientInfo patient={patient} />

                <div className="section">
                    <h2>Medications</h2>
                    <MedicationList medications={medications} />
                </div>

                <div className="section">
                    <h2>Blood Tests</h2>
                    <BloodTestList tests={bloodTests} />
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [patientData, medicationsData, bloodTestsData] = await Promise.all([
                    fetchPatientData(nhi),
                    fetchMedications(nhi, true),
                    fetchBloodTests(nhi)
                ]);

                setPatient(patientData);
                setMedications(medicationsData.medications || []);
                setBloodTests(bloodTestsData.bloodTests || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nhi]);

    return (
        <Dashboard
            nhi={nhi}
            patient={patient}
            medications={medications}
            bloodTests={bloodTests}
            loading={loading}
            error={error}
            onNhiChange={setNhi}
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
                {!providerRegistered && (
                    <button
                        className="register-dhb-button"
                        onClick={registerDHB}
                    >
                        Register DHB Provider
                    </button>
                )}
            </header>
            <PatientDashboardContainer />
        </div>
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all data in parallel
            const [
                patientData,
                medicationsData,
                bloodTestsData,
            ] = await Promise.all([
                fetchPatientData(nhi),
                fetchMedications(nhi, true),
                fetchBloodTests(nhi)
            ]);

            setPatient(patientData);
            setMedications(medicationsData.medications);
            setBloodTests(bloodTestsData.bloodTests);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [nhi]);

    const renderContent = () => {
        if (loading) {
            return <div className="loading">Loading patient data...</div>;
        }

        if (error) {
            return (
                <div className="error-container">
                    <div className="error">
                        <h3>Error Loading Data</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        if (!patient) {
            return (
                <div className="error-container">
                    <div className="error">
                        <h3>No Patient Found</h3>
                        <p>Could not find patient with NHI: {nhi}</p>
                        <p>Please check the NHI number and try again.</p>
                    </div>
                </div>
            );
        }

        return null;
    };

    const content = renderContent();
    if (content) return content;

    return (
        <div className="App">
            <h1>OpenHealth API Frontend</h1>

            <div className="search-bar">
                <input
                    type="text"
                    value={nhi}
                    onChange={(e) => setNhi(e.target.value.toUpperCase())}
                    placeholder="Enter NHI number"
                    pattern="^[A-Z]{3}\d{4}$"
                />
            </div>

            <div className="container">
                <div className="column">
                    <h2>Add Provider</h2>
                    {showProviderForm ? (
                        <ProviderRegistrationForm
                            onRegister={async (providerData: Provider) => {
                                try {
                                    await registerProvider(providerData);
                                    setProviderRegistered(true);
                                    setShowProviderForm(false);
                                    void fetchData();
                                } catch (err) {
                                    setError(err instanceof Error ? err.message : 'Failed to register provider');
                                }
                            }}
                            onCancel={() => setShowProviderForm(false)}
                        />
                    ) : (
                        <div className="provider-actions">
                            <p>Register a healthcare provider to access patient data.</p>
                            <button onClick={() => setShowProviderForm(true)}>
                                Register New Provider
                            </button>
                        </div>
                    )}
                </div>

                <div className="column">
                    <h2>Health Information</h2>
                    {patient && (
                        <div className="health-info">
                            <PatientInfo patient={patient} />
                            <div className="blood-tests">
                                <h3>Recent Blood Tests</h3>
                                <BloodTestList tests={bloodTests} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="column">
                    <h2>Medications</h2>
                    <MedicationList medications={medications} />
                </div>
            </div>
        </div>
    );
}

export default App;
