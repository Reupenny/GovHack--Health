import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import api from './routes.js';
import { errorHandler } from './middleware.js';

const app = new Hono();

// No CORS middleware needed - this API is only called server-to-server by Central API
app.use('*', errorHandler);

app.route('/api/v1', api);
app.route('/dhb/api/v1', api);

app.get('/', (c) => {
  return c.json({
    message: 'OpenHealth API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      patients: '/api/v1/patients/{nhi}',
      medications: '/api/v1/patients/{nhi}/medications',
      bloodTests: '/api/v1/patients/{nhi}/blood-tests',
      documents: '/api/v1/patients/{nhi}/documents',
      documentContent: '/api/v1/patients/{nhi}/documents/{documentId}'
    },
    baseUrl: 'http://localhost:3001',
    sampleNHI: ['ABC1234', 'DEF5678', 'GHI9012']
  });
});

app.get('/dhb', (c) => {
  return c.json({
    message: 'OpenHealth API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      patients: '/dhb/api/v1/patients/{nhi}',
      medications: '/dhb/api/v1/patients/{nhi}/medications',
      bloodTests: '/dhb/api/v1/patients/{nhi}/blood-tests',
      documents: '/dhb/api/v1/patients/{nhi}/documents',
      documentContent: '/dhb/api/v1/patients/{nhi}/documents/{documentId}'
    },
    baseUrl: 'http://localhost:3001',
    sampleNHI: ['ABC1234', 'DEF5678', 'GHI9012']
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/docs', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OpenHealth API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui.css" />
      <style>
        body { margin: 0; padding: 0; }
        .swagger-ui .topbar { display: none; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: 'https://raw.githubusercontent.com/swagger-api/swagger-petstore/master/src/main/resources/openapi.yaml',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.presets.standalone
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
          });
        };
      </script>
      <div style="padding: 20px; background: #f5f5f5;">
        <h2>OpenHealth API</h2>
        <p>Use one of these sample NHI numbers to test the API:</p>
        <ul>
          <li><strong>ABC1234</strong> - John Doe (Male, extensive medical history)</li>
          <li><strong>DEF5678</strong> - Maria Garcia (Female, thyroid condition)</li>
          <li><strong>GHI9012</strong> - Dr. Priya Patel (Female, hypertension)</li>
        </ul>
        <h3>Example API Calls:</h3>
        <ul>
          <li><a href="/api/v1/patients/ABC1234" target="_blank">/api/v1/patients/ABC1234</a></li>
          <li><a href="/api/v1/patients/ABC1234/medications" target="_blank">/api/v1/patients/ABC1234/medications</a></li>
          <li><a href="/api/v1/patients/ABC1234/blood-tests" target="_blank">/api/v1/patients/ABC1234/blood-tests</a></li>
          <li><a href="/api/v1/patients/ABC1234/documents" target="_blank">/api/v1/patients/ABC1234/documents</a></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.notFound((c) => {
  return c.json({
    error: 'NOT_FOUND',
    message: 'The requested resource was not found',
    timestamp: new Date().toISOString()
  }, 404);
});

if (process.env.NODE_ENV !== 'production') {
  serve({
    fetch: app.fetch,
    port: 3001
  }, (info) => {
    console.log(`🚀 OpenHealth API running on http://localhost:${info.port}`);
    console.log(`📚 API Documentation: http://localhost:${info.port}/docs`);
    console.log(`❤️  Health Check: http://localhost:${info.port}/health`);
    console.log(`\n📋 Sample endpoints:`);
    console.log(`   http://localhost:${info.port}/api/v1/patients/ABC1234`);
    console.log(`   http://localhost:${info.port}/api/v1/patients/ABC1234/medications`);
    console.log(`   http://localhost:${info.port}/api/v1/patients/ABC1234/blood-tests`);
    console.log(`   http://localhost:${info.port}/api/v1/patients/ABC1234/documents`);
  });
}

export default app
