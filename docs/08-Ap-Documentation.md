# API Documentation

## 🔌 File Upload API (`/api/upload`)

The upload API handles file processing and text extraction with a standardized response format.

### **Request Format**
```
POST /api/upload
Content-Type: multipart/form-data

FormData {
  file: File (PDF or DOCX, max 10MB)
}
```

### **Response Format**

#### **Success Response:**
```json
{
  "success": true,
  "text": "string",
  "wordCount": "number",
  "charCount": "number",
  
  "fileName": "string (optional)",
  "fileSize": "number (optional)",
  "fileType": "string (optional)",
  "processingTime": "number (optional)",
  "warnings": "array (optional)",
  "timestamp": "string (optional)"
}
```

#### **Error Response:**
```json
{
  "success": false,
  "error": "string",
  "statusCode": "number (optional)",
  "details": "array (optional)",
  "timestamp": "string (optional)"
}
```

### **Store Integration Requirements**

The Pinia store expects the exact response format above. Key field mappings:

- **success**: Must be exactly 'success' (boolean)
- **text**: Must be 'text' (not 'extractedText')
- **wordCount**: Must be 'wordCount' (number)
- **charCount**: Must be 'charCount' (not 'characterCount')
- **error**: Error message if success: false

### **Common API Response Issues**

#### **❌ Incorrect nested format:**
```json
{
  "success": true,
  "data": {
    "extractedText": "...",
    "wordCount": 350
  }
}
```

#### **✅ Correct flat format:**
```json
{
  "success": true,
  "text": "...",
  "wordCount": 350,
  "charCount": 2450
}
```

### **Error Handling Best Practices**

1. **Always return error responses** (don't throw for client errors)
2. **Use consistent error format** with `success: false`
3. **Provide helpful error messages** for debugging
4. **Include status codes** for different error types

#### **File Validation Error**
```json
{
  "success": false,
  "error": "File validation failed",
  "statusCode": 400,
  "details": ["File size exceeds 10MB limit", "Invalid file type"]
}
```

#### **Processing Error**
```json
{
  "success": false,
  "error": "Text extraction failed",
  "statusCode": 422,
  "details": ["Corrupted PDF file", "Unable to parse document structure"]
}
```

#### **Server Error**
```json
{
  "success": false,
  "error": "Internal server error",
  "statusCode": 500
}
```

## 🔮 Analysis APIs (Planned)

### **ATS Analysis** (`/api/analyze/ats`)

#### **Request Format**
```json
{
  "text": "string",
  "options": {
    "strictMode": "boolean (optional)",
    "includeWarnings": "boolean (optional)"
  }
}
```

#### **Response Format**
```json
{
  "success": "boolean",
  "score": "number (0-100)",
  "issues": "array of ATSIssue",
  "recommendations": "array of strings",
  "processingTime": "number (optional)"
}
```

### **Job Comparison** (`/api/analyze/comparison`)

#### **Request Format**
```json
{
  "resumeText": "string",
  "jobDescription": "string",
  "options": {
    "includeKeywordAnalysis": "boolean (optional)",
    "skillsMatching": "boolean (optional)"
  }
}
```

#### **Response Format**
```json
{
  "success": "boolean",
  "matchScore": "number (0-100)",
  "keywordMatches": "array of KeywordMatch",
  "skillsGap": "array of strings",
  "recommendations": "array of strings",
  "processingTime": "number (optional)"
}
```

## 🛠️ API Development Guidelines

### **Response Format Standards**
- Always use flat response structure (no nested `data` objects)
- Use consistent field naming across all endpoints
- Return errors as responses (don't throw for client errors)
- Include helpful error messages and status codes

### **Store Integration Requirements**
- API responses must match store interface expectations exactly
- Field names are case-sensitive and must be precise
- Boolean fields must be actual booleans, not strings
- Error responses must include `success: false`

### **Testing API Responses**
```bash
# Test upload endpoint
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-resume.pdf"

# Expected response format
{
  "success": true,
  "text": "Resume content...",
  "wordCount": 350,
  "charCount": 2450,
  "fileName": "test-resume.pdf",
  "processingTime": 150
}
```

## 🐛 Debugging File Upload Issues

If file upload shows "error" status but server logs show success:

### **Common Debugging Steps**
1. **Check API response format** matches store expectations
2. **Verify field names** are exact (`text` not `extractedText`)
3. **Ensure flat structure** (no nested objects)
4. **Test API directly** with curl or Postman
5. **Use browser dev tools** to inspect actual response

### **Debugging Commands**
```javascript
// In browser console after upload error:
const store = useResumeStore()
store.debugState() // Shows current store state

// Check network tab for actual API response format
// Compare with expected format in store interface
```

## 📝 API Status

### **Current APIs**
- **✅ File Upload API** - Fully implemented with standardized response format
- **🚧 ATS Analysis API** - Planned for Phase 6.4
- **🚧 Job Comparison API** - Planned for Phase 6.4
- **🚧 Health Check API** - Planned for monitoring

### **API Integration Notes**
- All APIs use consistent response formatting
- Error handling follows standard patterns
- Store integration requires exact field name matching
- Performance monitoring planned for production deployment