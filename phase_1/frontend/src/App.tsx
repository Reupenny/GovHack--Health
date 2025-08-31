import React, { useState, useEffect } from "react"
import Logo from "./resources/Logo.png"
import {
  fetchPatientData,
  fetchMedications,
  fetchBloodTests,
  registerProvider,
  fetchDocuments,
  fetchProviders,
  clearAllProviders,
} from "./api"
import { Chat } from "./components/ChatMock"
import type { Medication, Provider } from "./types"

interface BloodTestResult {
  parameter: string
  value: string
  unit: string
  referenceRange: string
  status: "normal" | "abnormal"
  flags?: string[]
}

interface BloodTest {
  id: string
  testName: string
  testCode: string
  testDate: string
  orderingDoctor: string
  laboratory: string
  status: string
  results: BloodTestResult[]
  clinicalNotes: string
}

interface Name {
  title: string
  firstName: string
  lastName: string
}

interface Address {
  line1: string
  line2?: string
  suburb: string
  city: string
  region: string
  postcode: string
  country: string
}

interface ContactDetails {
  phone: string
  mobile: string
  email: string
}

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

interface Patient {
  nhi: string
  name: Name
  dateOfBirth: string
  gender: string
  address: Address
  contactDetails: ContactDetails
  emergencyContact: EmergencyContact
  ethnicGroup: string
  preferredLanguage: string
}
import "./App.css"
import "./components/DocumentList.css"
import "./components/PatientInfo.css"
import "./components/ProviderList.css"

// Add styles
const styles = {
  nav: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    marginBottom: "2rem",
  },
  navLink: {
    margin: "0 1rem",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
} as const

function PatientInfo({ patient }: { patient: Patient }) {
  if (!patient) return null
  const { name, contactDetails, address, emergencyContact } = patient
  return (
    <div className="patient-info">
      <div className="info-section">
        <h3>
          {name.title} {name.firstName} {name.lastName}
        </h3>
        <div className="info-grid">
          <div className="info-item">
            <label>NHI: </label>
            <span>{patient.nhi || ""}</span>
          </div>
          <div className="info-item">
            <label>D.O.B: </label>
            <span>
              {patient.dateOfBirth
                ? new Date(patient.dateOfBirth).toLocaleDateString()
                : ""}
            </span>
          </div>
          <div className="info-item">
            <label>Gender: </label>
            <span>{patient.gender || ""}</span>
          </div>
          <div className="info-item">
            <label>Ethnicity:</label>
            <span>{patient.ethnicGroup || ""}</span>
          </div>
          <div className="info-item">
            <label>Preferred Language: </label>
            <span>{patient.preferredLanguage || ""}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h4>Contact Details</h4>
        <div className="info-grid">
          <div className="info-item">
            <label>Phone: </label>
            <span>{contactDetails.phone || ""}</span>
          </div>
          <div className="info-item">
            <label>Mobile: </label>
            <span>{contactDetails.mobile || ""}</span>
          </div>
          <div className="info-item">
            <label>Email: </label>
            <span>{contactDetails.email || ""}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h4>Address</h4>
        <div className="info-grid">
          <div className="info-item full-width">
            <span>
              {address.line1 || ""}
              {address.line2 ? <>, {address.line2}</> : null}
              <br />
              {[address.suburb, address.city].filter(Boolean).join(", ")}
              <br />
              {[address.region, address.postcode].filter(Boolean).join(" ")}
              <br />
              {address.country || ""}
            </span>
          </div>
        </div>
      </div>

      {emergencyContact &&
        (emergencyContact.name ||
          emergencyContact.relationship ||
          emergencyContact.phone) && (
          <div className="info-section">
            <h4>Emergency Contact</h4>
            <div className="info-grid">
              {emergencyContact.name && (
                <div className="info-item">
                  <span>{emergencyContact.name}</span>
                </div>
              )}
              {emergencyContact.relationship && (
                <div className="info-item">
                  <label>Relationship: </label>
                  <span>{emergencyContact.relationship}</span>
                </div>
              )}
              {emergencyContact.phone && (
                <div className="info-item">
                  <label>Phone: </label>
                  <span>{emergencyContact.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  )
}

function MedicationList({ medications }: { medications: Medication[] }) {
  if (!medications || medications.length === 0) {
    return (
      <div className="medication-list">
        <p className="no-data">No medications found</p>
      </div>
    )
  }

  return (
    <div className="medication-list">
      {medications.map((med) => (
        <div key={med.id} className="medication-item">
          <h4>{med.name}</h4>
          <div className="medication-details">
            <p>
              <strong>Dosage:</strong> {med.dosage}
            </p>
            <p>
              <strong>Frequency:</strong> {med.frequency}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-${med.status.toLowerCase()}`}>
                {med.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function BloodTestList({ tests }: { tests: BloodTest[] }) {
  if (!tests || tests.length === 0) {
    return (
      <div className="blood-test-list">
        <p className="no-data">No test results found</p>
      </div>
    )
  }

  return (
    <div className="blood-test-list">
      {tests.map((test) => (
        <div key={test.id} className="blood-test-item">
          <div className="test-header">
            <div>
              <h4>{test.testName}</h4>
              <span className="test-code">{test.testCode}</span>
            </div>
            <span className={`test-status status-${test.status.toLowerCase()}`}>
              {test.status}
            </span>
          </div>
          <div className="test-meta">
            <p>
              <strong>Date:</strong>{" "}
              <time dateTime={test.testDate}>
                {new Date(test.testDate).toLocaleDateString()}
              </time>
            </p>
            <p>
              <strong>Doctor:</strong> {test.orderingDoctor}
            </p>
            <p>
              <strong>Laboratory:</strong> {test.laboratory}
            </p>
          </div>
          <div className="test-results">
            {test.results.map((result, index) => (
              <div
                key={index}
                className={`test-result status-${result.status}`}
              >
                <div className="result-header">
                  <span className="parameter">{result.parameter}</span>
                  {result.flags && result.flags.length > 0 && (
                    <div className="flags">
                      {result.flags.map((flag) => (
                        <span
                          key={flag}
                          className={`flag flag-${flag.toLowerCase()}`}
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="result-details">
                  <span className="value">{result.value}</span>
                  <span className="unit">{result.unit}</span>
                  <span className="reference">({result.referenceRange})</span>
                </div>
              </div>
            ))}
          </div>
          {test.clinicalNotes && (
            <div className="clinical-notes">
              <h5>Clinical Notes</h5>
              <p>{test.clinicalNotes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface Document {
  id: string
  type: string
  title: string
  description: string
  date: string
  author: string
  specialty: string
  facility: string
  contentType: string
  size: number
  tags: string[]
}

function formatFileSize(bytes: number): string {
  const kb = bytes / 1024
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`
  }
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

function DocumentList({
  documents,
  nhi,
}: {
  documents: Document[]
  nhi: string
}) {
  const handleDownload = async (documentId: string) => {
    try {
      const response = await fetch(
        `https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/central/patients/${nhi}/documents/${documentId}`,
      )
      if (!response.ok) {
        throw new Error("Failed to download document")
      }

      // Get the document content
      const blob = await response.blob()

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a temporary link and click it to trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `document-${documentId}` // You might want to use a better filename
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading document:", error)
      alert("Failed to download document. Please try again.")
    }
  }

  return (
    <div className="document-list">
      {documents.map((doc) => (
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
            {doc.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <button
            className="document-download"
            onClick={() => handleDownload(doc.id)}
          >
            View {doc.contentType.split("/")[1].toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  )
}

// Removed duplicate PatientDashboard component as it's replaced by Dashboard

interface DashboardProps {
  nhi: string
  patient: Patient | null
  medications: Medication[]
  bloodTests: BloodTest[]
  documents: Document[]
  loading: boolean
  error: string | null
  onNhiChange: (nhi: string) => void
  onRegisterProvider: () => Promise<void>
  onRegisterToniq: () => Promise<void>
  onClearProviders: () => Promise<void>
  providers: Provider[]
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
  onRegisterProvider,
  onRegisterToniq,
  onClearProviders,
  providers,
}) => {
  return (
    <div className="dashboard">
      {/* Left Column */}
      <div className="left-sidebar">
        <div className="left-column">
          {!providers.some(
            (p) => p.providerId === "South_Island_Health_Service",
          ) && (
            <button
              className="register-provider-btn"
              onClick={onRegisterProvider}
            >
              Register Regional Health Service
            </button>
          )}
          {!providers.some((p) => p.providerId === "GovHack_Pharmacy") && (
            <button className="register-provider-btn" onClick={onRegisterToniq}>
              Register Pharmacy Service
            </button>
          )}
          <button
            className="register-provider-btn clear-providers-btn"
            onClick={onClearProviders}
          >
            Clear All Providers
          </button>
          <input
            className="search-bar"
            type="text"
            placeholder="Search NHI"
            value={nhi}
            onChange={(e) => onNhiChange(e.target.value.toUpperCase())}
          />
          <p className="hint">Try: ABC1234, DEF5678, GHI9012</p>
          <div className="providers-list">
            <h3>Registered providers</h3>
            {providers.length === 0 ? (
              <p className="no-providers">No providers registered</p>
            ) : (
              <ul>
                {providers.map((provider) => (
                  <li key={provider.providerId} className="provider-item">
                    <span className="provider-id">
                      {provider.providerId.replace(/_/g, " ")}
                    </span>
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
      </div>{" "}
      {/* Main Content Area */}
      <div className="main-content">
        <div className="chat-area">
          <Chat
            getPatient={() => patient || null}
            getMedications={() =>
              Array.isArray(medications) ? medications : []
            }
            getBloodTests={() => (Array.isArray(bloodTests) ? bloodTests : [])}
            getProviders={() => (Array.isArray(providers) ? providers : [])}
            getDocuments={() => (Array.isArray(documents) ? documents : [])}
          />
        </div>
        <div className="dashboard-grid">
          {/* Middle Column */}
          <div className="middle-column">
            {loading ? (
              <div className="status-container">
                <p>Loading...</p>
              </div>
            ) : patient ? (
              <div className="health-content">
                <div className="section">
                  <h2>Documents</h2>
                  <DocumentList documents={documents} nhi={nhi} />
                </div>
                <div className="section">
                  <h2>Tests</h2>
                  <BloodTestList tests={bloodTests} />
                </div>
              </div>
            ) : (
              <div className="error-container">
                <p>Please enter a patient NHI number to view their data</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="right-column">
            <h2>Medications</h2>
            <MedicationList medications={medications} />
          </div>
        </div>
      </div>
    </div>
  )
}

const PatientDashboardContainer: React.FC = () => {
  const [nhi, setNhi] = useState("")
  const [patient, setPatient] = useState<Patient | null>(null)
  const [medications, setMedications] = useState<Medication[]>([])
  const [bloodTests, setBloodTests] = useState<BloodTest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [providers, setProviders] = useState<Provider[]>([])

  // Load providers on component mount
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const providersData = await fetchProviders()
        setProviders(providersData)
      } catch (error) {
        console.error("Failed to load providers:", error)
      }
    }
    loadProviders()
  }, [])

  const registerDHB = async () => {
    try {
      const newProvider = {
        providerId: "South_Island_Health_Service",
        name: "South Island Health Service",
        baseUrl:
          "https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/dhb/api/v1",
      }
      await registerProvider(newProvider)
      // Refresh providers from API after registration
      const providersData = await fetchProviders()
      setProviders(providersData)
    } catch (error) {
      setError(
        "Failed to register Regional Health Service provider: " +
          (error instanceof Error ? error.message : "Unknown error"),
      )
    }
  }

  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!nhi.trim()) {
        setPatient(null)
        setMedications([])
        setBloodTests([])
        setDocuments([])
        setLoading(false)
        setError(null)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const results = await Promise.allSettled([
          fetchPatientData(nhi),
          fetchMedications(nhi, true),
          fetchBloodTests(nhi),
          fetch(
            `https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/central/patients/${nhi}/documents`,
          ).then((res) => res.json()),
        ])

        const errors: string[] = []

        // Handle patient data
        if (results[0].status === "fulfilled") {
          setPatient(results[0].value)
        } else {
          setPatient(null)
          errors.push(
            `Patient data: ${results[0].reason?.message || "Failed to load"}`,
          )
        }

        // Handle medications data
        if (results[1].status === "fulfilled") {
          setMedications(results[1].value.medications || [])
        } else {
          setMedications([])
          errors.push(
            `Medications: ${results[1].reason?.message || "Failed to load"}`,
          )
        }

        // Handle blood tests data
        if (results[2].status === "fulfilled") {
          setBloodTests(results[2].value.bloodTests || [])
        } else {
          setBloodTests([])
          errors.push(
            `Blood tests: ${results[2].reason?.message || "Failed to load"}`,
          )
        }

        // Handle documents data
        if (results[3].status === "fulfilled") {
          setDocuments(results[3].value.documents || [])
        } else {
          setDocuments([])
          errors.push(
            `Documents: ${results[3].reason?.message || "Failed to load"}`,
          )
        }

        // Set error message if any requests failed
        if (errors.length > 0) {
          setError(`Some data failed to load: ${errors.join(", ")}`)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [nhi])

  const registerToniq = async () => {
    try {
      const newProvider = {
        providerId: "GovHack_Pharmacy",
        name: "GovHack Pharmacy",
        baseUrl:
          "https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/toniq/api/v1",
      }
      await registerProvider(newProvider)
      // Refresh providers from API after registration
      const providersData = await fetchProviders()
      setProviders(providersData)
    } catch (error) {
      setError(
        "Failed to register Pharmacy Service provider: " +
          (error instanceof Error ? error.message : "Unknown error"),
      )
    }
  }

  const clearProviders = async () => {
    try {
      const result = await clearAllProviders()
      // Refresh providers from API after clearing
      const providersData = await fetchProviders()
      setProviders(providersData)
      alert(
        `All providers cleared successfully! Cleared ${result.clearedCount} providers.`,
      )
    } catch (error) {
      setError(
        "Failed to clear providers: " +
          (error instanceof Error ? error.message : "Unknown error"),
      )
    }
  }
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
      onRegisterProvider={registerDHB}
      onRegisterToniq={registerToniq}
      onClearProviders={clearProviders}
      providers={providers}
    />
  )
}

const App: React.FC = () => {
  const [providerRegistered, setProviderRegistered] = useState(false)

  const registerDHB = async () => {
    try {
      await registerProvider({
        providerId: "South_Island_Health_Service",
        name: "South Island Health Service",
        baseUrl:
          "https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/dhb",
      })
      alert("Regional Health Service provider registered successfully!")
      setProviderRegistered(true)
    } catch (error) {
      alert(
        "Failed to register Regional Health Service provider: " +
          (error instanceof Error ? error.message : "Unknown error"),
      )
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={Logo} className="app-logo" alt="logo" />
        <h1>Patient Portal</h1>
      </header>
      <PatientDashboardContainer />
    </div>
  )
}

export default App
