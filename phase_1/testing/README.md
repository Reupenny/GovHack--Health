# OpenHealth API Testing

This directory contains comprehensive testing tools for the OpenHealth API.

## 🚀 Quick Start

### Option 1: Postman Collection (Recommended)

1. **Import the Collection**
   - Open Postman
   - Click "Import" → "Upload Files"
   - Select `OpenHealth_API.postman_collection.json`
   - Select `OpenHealth_API.postman_environment.json`

2. **Set Environment**
   - Click the environment dropdown (top-right)
   - Select "OpenHealth API Environment"

3. **Start the API Server**
   ```bash
   cd ../DHB
   npm run dev
   ```

4. **Run Tests**
   - Individual requests: Click any request and hit "Send"
   - Full test suite: Click "Run collection" button

### Option 2: cURL Commands

```bash
# Start the API server first
cd ../DHB && npm run dev

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3001/api/v1/patients/ABC1234
curl http://localhost:3001/api/v1/patients/ABC1234/medications
curl http://localhost:3001/api/v1/patients/ABC1234/medications?current=true
curl http://localhost:3001/api/v1/patients/ABC1234/blood-tests
curl http://localhost:3001/api/v1/patients/ABC1234/documents
curl http://localhost:3001/api/v1/patients/ABC1234/documents/doc1
```

## 📋 Test Coverage

### **Endpoints Tested:**
- ✅ Health check
- ✅ Patient information (all 3 sample patients)
- ✅ Medications (all + current only)
- ✅ Blood tests (all + date filtering)
- ✅ Documents (all + type filtering)
- ✅ Document content retrieval
- ✅ Error handling (invalid NHI, non-existent patient)

### **Sample Test Patients:**
- **ABC1234** - John Doe (comprehensive medical history)
- **DEF5678** - Maria Garcia (thyroid condition)  
- **GHI9012** - Dr. Priya Patel (hypertension)

### **Automated Tests Include:**
- ✅ Response status code validation
- ✅ Response structure validation
- ✅ Data type validation
- ✅ Business logic validation (filtering, date ranges)
- ✅ Error response format validation
- ✅ Performance testing (response time < 500ms)

## 🔧 Environment Variables

The Postman environment includes these variables:
- `base_url`: http://localhost:3001
- `api_version`: v1
- `sample_nhi_1`: ABC1234
- `sample_nhi_2`: DEF5678  
- `sample_nhi_3`: GHI9012

## 📊 Expected Test Results

When running the full collection, you should see:
- **13 requests** executed
- **40+ assertions** passed
- **0 failures** (if API is working correctly)
- All response times < 500ms

## 🐛 Troubleshooting

**Issue: Connection refused**
- Solution: Make sure the API server is running on port 3001

**Issue: Test failures**
- Check that sample data exists in mockData.ts
- Verify NHI format validation is working
- Ensure all endpoints return expected data structure

**Issue: Slow response times**
- Check if TypeScript compilation is causing delays
- Consider using production build for performance testing

## 🔄 Running Continuous Tests

For automated testing, you can use Newman (Postman CLI):

```bash
# Install Newman globally
npm install -g newman

# Run collection from command line
newman run OpenHealth_API.postman_collection.json -e OpenHealth_API.postman_environment.json
```

This allows integration with CI/CD pipelines for automated API testing.