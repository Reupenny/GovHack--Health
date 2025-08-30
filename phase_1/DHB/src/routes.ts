import { Hono } from 'hono';
import {
  mockPatients,
  // mockMedications, 
  mockBloodTests,
  mockDocuments,
  mockDocumentContent
} from './mockData.js';
import type {
  Patient,
  Medication,
  BloodTest,
  Document,
  DocumentContent,
  ErrorResponse,
  MedicationsResponse,
  BloodTestsResponse,
  DocumentsResponse
} from './types.js';
import { validateNHI, validateQueryParams } from './middleware.js';

const api = new Hono();

api.get('/patients/:nhi', validateNHI, (c) => {
  const nhi = c.req.param('nhi');
  const patient = mockPatients[nhi];

  if (!patient) {
    const error: ErrorResponse = {
      error: 'PATIENT_NOT_FOUND',
      message: `Patient with NHI ${nhi} not found`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  return c.json(patient);
});

// api.get('/patients/:nhi/medications', validateNHI, (c) => {
//   const nhi = c.req.param('nhi');
//   const current = c.req.query('current') === 'true';

//   const validation = validateQueryParams(c);
//   if (validation.error) {
//     return c.json(validation.error, 400);
//   }
//   const limit = validation.parsedLimit!;

//   if (!mockPatients[nhi]) {
//     const error: ErrorResponse = {
//       error: 'PATIENT_NOT_FOUND',
//       message: `Patient with NHI ${nhi} not found`,
//       timestamp: new Date().toISOString()
//     };
//     return c.json(error, 404);
//   }

//   // let medications = mockMedications[nhi] || [];

//   if (current) {
//     medications = medications.filter((med: Medication) => med.status === 'active');
//   }

//   const total = medications.length;
//   medications = medications.slice(0, limit);

//   const response: MedicationsResponse = {
//     medications,
//     total
//   };

//   return c.json(response);
// });

api.get('/patients/:nhi/blood-tests', validateNHI, (c) => {
  const nhi = c.req.param('nhi');
  const from = c.req.query('from');
  const to = c.req.query('to');

  const validation = validateQueryParams(c);
  if (validation.error) {
    return c.json(validation.error, 400);
  }
  const limit = validation.parsedLimit!;

  if (!mockPatients[nhi]) {
    const error: ErrorResponse = {
      error: 'PATIENT_NOT_FOUND',
      message: `Patient with NHI ${nhi} not found`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  let bloodTests = mockBloodTests[nhi] || [];

  if (from) {
    bloodTests = bloodTests.filter((test: BloodTest) => test.testDate >= from);
  }
  if (to) {
    const toDateTime = `${to}T23:59:59Z`;
    bloodTests = bloodTests.filter((test: BloodTest) => test.testDate <= toDateTime);
  }

  const total = bloodTests.length;
  bloodTests = bloodTests.slice(0, limit);

  const response: BloodTestsResponse = {
    bloodTests,
    total
  };

  return c.json(response);
});

api.get('/patients/:nhi/documents', validateNHI, (c) => {
  const nhi = c.req.param('nhi');
  const type = c.req.query('type');
  const from = c.req.query('from');
  const to = c.req.query('to');

  const validation = validateQueryParams(c);
  if (validation.error) {
    return c.json(validation.error, 400);
  }
  const limit = validation.parsedLimit!;

  if (!mockPatients[nhi]) {
    const error: ErrorResponse = {
      error: 'PATIENT_NOT_FOUND',
      message: `Patient with NHI ${nhi} not found`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  let documents = mockDocuments[nhi] || [];

  if (type) {
    documents = documents.filter((doc: Document) => doc.type === type);
  }
  if (from) {
    documents = documents.filter((doc: Document) => doc.date >= from);
  }
  if (to) {
    const toDateTime = `${to}T23:59:59Z`;
    documents = documents.filter((doc: Document) => doc.date <= toDateTime);
  }

  const total = documents.length;
  documents = documents.slice(0, limit);

  const response: DocumentsResponse = {
    documents,
    total
  };

  return c.json(response);
});

api.get('/patients/:nhi/documents/:documentId', validateNHI, (c) => {
  const nhi = c.req.param('nhi');
  const documentId = c.req.param('documentId');

  if (!mockPatients[nhi]) {
    const error: ErrorResponse = {
      error: 'PATIENT_NOT_FOUND',
      message: `Patient with NHI ${nhi} not found`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  const documents = mockDocuments[nhi] || [];
  const document = documents.find((doc: Document) => doc.id === documentId);

  if (!document) {
    const error: ErrorResponse = {
      error: 'DOCUMENT_NOT_FOUND',
      message: `Document with ID ${documentId} not found`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  const content = mockDocumentContent[documentId];
  if (!content) {
    const error: ErrorResponse = {
      error: 'DOCUMENT_CONTENT_NOT_FOUND',
      message: `Content for document ${documentId} not available`,
      timestamp: new Date().toISOString()
    };
    return c.json(error, 404);
  }

  const response: DocumentContent = {
    id: document.id,
    content: content,
    contentType: document.contentType || 'application/pdf',
    filename: `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
  };

  return c.json(response);
});

export default api;