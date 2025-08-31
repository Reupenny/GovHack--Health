import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import type { 
  Patient, 
  Medication, 
  BloodTest, 
  Document,
  MedicationsResponse,
  BloodTestsResponse,
  DocumentsResponse
} from './types.js'

const app = new Hono({ strict: false })

// CORS middleware - add headers to all responses
app.use('*', (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
  return next()
})

const serviceProviders = new Map<string, string>()

// Auto-register known providers on startup
function initializeProviders() {
  // Only initialize if no providers are registered (cold start)
  if (serviceProviders.size === 0) {
    serviceProviders.set('toniq', 'https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/toniq/api/v1')
    serviceProviders.set('dhb', 'https://zq3vdip5sl.execute-api.ap-southeast-2.amazonaws.com/dhb/api/v1')
    console.log('Auto-registered providers on cold start:', serviceProviders.size)
  }
}

// Initialize providers immediately
initializeProviders()

// Create a sub-application for API routes
const api = new Hono()

async function makeRequest(url: string, timeoutMs = 5000): Promise<any> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP ${response.status}`)
    }
    
    return await response.json()
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

async function queryAllProviders(path: string): Promise<any[]> {
  const results = await Promise.allSettled(
    Array.from(serviceProviders.values()).map(baseUrl => 
      makeRequest(`${baseUrl}${path}`)
    )
  )
  
  return results
    .filter((result): result is PromiseFulfilledResult<any> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value)
}

function consolidatePatients(patients: Patient[]): Patient | null {
  if (patients.length === 0) return null
  
  const consolidated = patients.reduce((acc, patient) => {
    return {
      ...acc,
      ...patient,
      name: { ...acc.name, ...patient.name },
      address: patient.address || acc.address,
      contactDetails: patient.contactDetails || acc.contactDetails,
      emergencyContact: patient.emergencyContact || acc.emergencyContact
    }
  }, patients[0])
  
  return consolidated
}

function consolidateMedications(responses: any[]): MedicationsResponse {
  const allMedications: Medication[] = []
  
  responses.forEach(response => {
    if (response.medications) {
      allMedications.push(...response.medications)
    }
  })
  
  const uniqueMedications = allMedications.filter((med, index, arr) => 
    arr.findIndex(m => m.id === med.id) === index
  )
  
  return {
    medications: uniqueMedications,
    total: uniqueMedications.length
  }
}

function consolidateBloodTests(responses: any[]): BloodTestsResponse {
  const allBloodTests: BloodTest[] = []
  
  responses.forEach(response => {
    if (response.bloodTests) {
      allBloodTests.push(...response.bloodTests)
    }
  })
  
  const uniqueBloodTests = allBloodTests.filter((test, index, arr) => 
    arr.findIndex(t => t.id === test.id) === index
  )
  
  return {
    bloodTests: uniqueBloodTests,
    total: uniqueBloodTests.length
  }
}

function consolidateDocuments(responses: any[]): DocumentsResponse {
  const allDocuments: Document[] = []
  
  responses.forEach(response => {
    if (response.documents) {
      allDocuments.push(...response.documents)
    }
  })
  
  const uniqueDocuments = allDocuments.filter((doc, index, arr) => 
    arr.findIndex(d => d.id === doc.id) === index
  )
  
  return {
    documents: uniqueDocuments,
    total: uniqueDocuments.length
  }
}

app.get('/', (c) => {
  return c.json({ 
    message: 'OpenHealth Central API',
    version: '1.0.0',
    registeredProviders: serviceProviders.size
  })
})

// Add corresponding routes with /central prefix for API Gateway
app.get('/central', (c) => {
  return c.json({ 
    message: 'OpenHealth Central API',
    version: '1.0.0',
    registeredProviders: serviceProviders.size
  })
})

api.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { providerId, baseUrl } = body
    
    if (!providerId || !baseUrl) {
      return c.json({ 
        error: 'INVALID_REQUEST',
        message: 'Both providerId and baseUrl are required' 
      }, 400)
    }
    
    serviceProviders.set(providerId, baseUrl)
    
    return c.json({ 
      message: 'Service provider registered successfully',
      providerId,
      totalProviders: serviceProviders.size
    }, 201)
  } catch (error: any) {
    return c.json({
      error: 'INVALID_REQUEST',
      message: 'Invalid JSON body'
    }, 400)
  }
})

api.get('/providers', (c) => {
  return c.json({
    providers: Array.from(serviceProviders.entries()).map(([id, url]) => ({
      providerId: id,
      baseUrl: url
    })),
    total: serviceProviders.size
  })
})

api.delete('/providers', (c) => {
  const clearedCount = serviceProviders.size
  serviceProviders.clear()
  
  return c.json({
    message: 'All providers cleared successfully',
    clearedCount,
    totalProviders: serviceProviders.size
  })
})

api.get('/patients/:nhi', async (c) => {
  const nhi = c.req.param('nhi')
  
  if (serviceProviders.size === 0) {
    return c.json({
      error: 'NO_PROVIDERS',
      message: 'No service providers registered'
    }, 503)
  }
  
  try {
    const responses = await queryAllProviders(`/patients/${nhi}`)
    
    if (responses.length === 0) {
      return c.json({
        error: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in any registered provider'
      }, 404)
    }
    
    const consolidatedPatient = consolidatePatients(responses)
    return c.json(consolidatedPatient)
  } catch (error: any) {
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Error querying service providers'
    }, 500)
  }
})

api.get('/patients/:nhi/medications', async (c) => {
  const nhi = c.req.param('nhi')
  const queryParams = new URLSearchParams()
  
  const current = c.req.query('current')
  const limit = c.req.query('limit')
  
  if (current) queryParams.append('current', current)
  if (limit) queryParams.append('limit', limit)
  
  const queryString = queryParams.toString()
  const path = `/patients/${nhi}/medications${queryString ? `?${queryString}` : ''}`
  
  if (serviceProviders.size === 0) {
    return c.json({
      error: 'NO_PROVIDERS',
      message: 'No service providers registered'
    }, 503)
  }
  
  try {
    const responses = await queryAllProviders(path)
    
    if (responses.length === 0) {
      return c.json({
        error: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in any registered provider'
      }, 404)
    }
    
    const consolidatedMedications = consolidateMedications(responses)
    return c.json(consolidatedMedications)
  } catch (error: any) {
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Error querying service providers'
    }, 500)
  }
})

api.get('/patients/:nhi/blood-tests', async (c) => {
  const nhi = c.req.param('nhi')
  const queryParams = new URLSearchParams()
  
  const from = c.req.query('from')
  const to = c.req.query('to')
  const limit = c.req.query('limit')
  
  if (from) queryParams.append('from', from)
  if (to) queryParams.append('to', to)
  if (limit) queryParams.append('limit', limit)
  
  const queryString = queryParams.toString()
  const path = `/patients/${nhi}/blood-tests${queryString ? `?${queryString}` : ''}`
  
  if (serviceProviders.size === 0) {
    return c.json({
      error: 'NO_PROVIDERS',
      message: 'No service providers registered'
    }, 503)
  }
  
  try {
    const responses = await queryAllProviders(path)
    
    if (responses.length === 0) {
      return c.json({
        error: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in any registered provider'
      }, 404)
    }
    
    const consolidatedBloodTests = consolidateBloodTests(responses)
    return c.json(consolidatedBloodTests)
  } catch (error: any) {
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Error querying service providers'
    }, 500)
  }
})

api.get('/patients/:nhi/documents', async (c) => {
  const nhi = c.req.param('nhi')
  const queryParams = new URLSearchParams()
  
  const type = c.req.query('type')
  const from = c.req.query('from')
  const to = c.req.query('to')
  const limit = c.req.query('limit')
  
  if (type) queryParams.append('type', type)
  if (from) queryParams.append('from', from)
  if (to) queryParams.append('to', to)
  if (limit) queryParams.append('limit', limit)
  
  const queryString = queryParams.toString()
  const path = `/patients/${nhi}/documents${queryString ? `?${queryString}` : ''}`
  
  if (serviceProviders.size === 0) {
    return c.json({
      error: 'NO_PROVIDERS',
      message: 'No service providers registered'
    }, 503)
  }
  
  try {
    const responses = await queryAllProviders(path)
    
    if (responses.length === 0) {
      return c.json({
        error: 'PATIENT_NOT_FOUND',
        message: 'Patient not found in any registered provider'
      }, 404)
    }
    
    const consolidatedDocuments = consolidateDocuments(responses)
    return c.json(consolidatedDocuments)
  } catch (error: any) {
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Error querying service providers'
    }, 500)
  }
})

api.get('/patients/:nhi/documents/:documentId', async (c) => {
  const nhi = c.req.param('nhi')
  const documentId = c.req.param('documentId')
  
  if (serviceProviders.size === 0) {
    return c.json({
      error: 'NO_PROVIDERS',
      message: 'No service providers registered'
    }, 503)
  }
  
  try {
    const responses = await queryAllProviders(`/patients/${nhi}/documents/${documentId}`)
    
    if (responses.length === 0) {
      return c.json({
        error: 'DOCUMENT_NOT_FOUND',
        message: 'Document not found in any registered provider'
      }, 404)
    }
    
    return c.json(responses[0])
  } catch (error: any) {
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Error querying service providers'
    }, 500)
  }
})

// Handle OPTIONS at the app level first - must be before route mounting
app.options('*', (c) => {
  return c.text('', 200)
})

// Handle specific OPTIONS routes that might be needed
app.options('/central/*', (c) => {
  return c.text('', 200)
})

// Add OPTIONS handler for the API routes too
api.options('*', () => {
  return new Response('', { status: 200 })
})

// Mount the API routes at both root level and /central path
app.route('/', api)
app.route('/central', api)

if (process.env.NODE_ENV !== 'production') {
  serve({
    fetch: app.fetch,
    port: 3000
  }, (info) => {
    console.log(`OpenHealth Central API is running on http://localhost:${info.port}`)
    console.log('Endpoints:')
    console.log('  POST /register - Register a service provider')
    console.log('  GET /providers - List registered providers')
    console.log('  GET /patients/{nhi} - Get patient information')
    console.log('  GET /patients/{nhi}/medications - Get patient medications')
    console.log('  GET /patients/{nhi}/blood-tests - Get patient blood tests')
    console.log('  GET /patients/{nhi}/documents - Get patient documents')
    console.log('  GET /patients/{nhi}/documents/{documentId} - Get specific document')
  })
}

export default app
