# Implementation Guide

## 🎯 Phase 6: ATS Scanner Implementation

### **Current Development Focus**
Building the ATS Scanner page with analysis interface, loading states, and results display using existing components and semantic theme system.

## 📋 Sprint 1: ATS Scanner Foundation

### **1.1 Analysis Store Creation**
Create the analysis store to manage analysis state and results.

**Task**: Create `stores/analysis.ts`
**Requirements**:
- Analysis loading states (isAnalyzing, hasResults)
- ATS results storage and management
- Error handling for analysis failures
- Integration with existing resume store

**Store Interface**:
```typescript
interface AnalysisState {
  isAnalyzing: boolean
  atsResults: ATSResults | null
  analysisError: string | null
  analysisId: string | null
}
```

### **1.2 ATS Scanner Page Structure**
Build the main ATS Scanner page with conditional rendering.

**Task**: Update `pages/ats-scanner.vue`
**Requirements**:
- Use existing components (ResumeUploader, ResumePreview)
- Implement conditional rendering based on file and analysis state
- Integrate with resume store and new analysis store
- Use semantic theme classes throughout

**Page States**:
- No file uploaded → Show upload prompt
- File ready → Show analysis interface
- Analyzing → Show loading state
- Results ready → Show results display

### **1.3 Analysis Interface Component**
Create component that shows file info and starts analysis.

**Task**: Create `components/analysis/AnalysisInterface.vue`
**Requirements**:
- Display current file information using ResumePreview
- "Start Analysis" button with proper state management
- Integration with analysis store
- Theme-aware styling with semantic colors

## 📋 Sprint 2: Loading States and UI Components

### **2.1 Analysis Loading Component**
Create loading animation with progress indicators.

**Task**: Create `components/analysis/AnalysisLoading.vue`
**Requirements**:
- Animated loading spinner using existing LoadingSpinner component
- Progress indication text
- Semantic theme integration
- Responsive design for mobile/desktop

### **2.2 Upload Prompt Component**
Create component to prompt file upload when no file exists.

**Task**: Create `components/analysis/UploadPrompt.vue`
**Requirements**:
- Link back to home page for file upload
- Clear messaging about file requirement
- Use existing Button and navigation components
- Semantic theme styling

### **2.3 Score Visualization Components**
Build components for displaying analysis scores.

**Task**: Create `components/analysis/ScoreCard.vue`
**Requirements**:
- Circular progress ring for scores (0-100)
- Color coding based on score ranges
- Animated score counting
- Semantic theme color integration

**Score Color Ranges**:
- 80-100: `bg-success-light` + `text-success-dark`
- 60-79: `bg-warning-light` + `text-warning-dark`
- 0-59: `bg-error-light` + `text-error-dark`

## 📋 Sprint 3: Results Display

### **3.1 ATS Results Container**
Build main results display component.

**Task**: Create `components/analysis/ATSResults.vue`
**Requirements**:
- Grid layout for score cards and recommendations
- Responsive design (desktop sidebar aware)
- Use existing Card components for sections
- Semantic theme integration throughout

### **3.2 Recommendations List**
Create component for displaying actionable recommendations.

**Task**: Create `components/analysis/RecommendationsList.vue`
**Requirements**:
- Priority-based list display
- Expandable detail cards using existing Card component
- Implementation difficulty indicators
- Semantic theme styling

### **3.3 Keyword Analysis Display**
Build component for keyword matching results.

**Task**: Create `components/analysis/KeywordAnalysis.vue`
**Requirements**:
- Matched keywords (green Badge components)
- Missing keywords (red Badge components)
- Match percentage visualization
- Keyword density analysis display

## 📋 Sprint 4: API Integration

### **4.1 ATS Analysis Endpoint**
Create server endpoint for ATS analysis.

**Task**: Create `server/api/analyze/ats.post.ts`
**Requirements**:
- Accept resume text from request body
- Integration with Gemini AI API
- Standardized response format matching store expectations
- Comprehensive error handling

**Response Format**:
```json
{
  "success": boolean,
  "score": number,
  "issues": array,
  "recommendations": array,
  "processingTime": number
}
```

### **4.2 Gemini AI Integration**
Implement AI analysis logic with research-based prompts.

**Task**: Create `utils/gemini/atsPrompts.ts`
**Requirements**:
- Research-based ATS analysis prompts
- JSON response parsing
- Error handling for AI API failures
- Retry logic for failed requests

### **4.3 Analysis Store Actions**
Implement store actions for triggering analysis.

**Task**: Add analysis actions to `stores/analysis.ts`
**Requirements**:
- `analyzeATS()` method with loading state management
- Error handling and user feedback
- Result caching and storage
- Integration with API endpoint

## 🔧 Implementation Checklist

### **Before Starting Development**
- [ ] **Component Audit**: Review existing components for reuse opportunities
- [ ] **Store Review**: Examine resume store integration points
- [ ] **API Planning**: Plan Gemini AI integration approach
- [ ] **Theme Verification**: Ensure all new components use semantic colors

### **Development Standards**
- [ ] **Use Existing Components**: Reuse Button, Card, Badge, LoadingSpinner
- [ ] **Semantic Theme Classes**: Never use direct colors, always semantic
- [ ] **Store Integration**: Connect to resumeStore and analysisStore
- [ ] **TypeScript Interfaces**: Define clear interfaces for all data
- [ ] **Error Handling**: Implement comprehensive error states
- [ ] **Responsive Design**: Test desktop sidebar and mobile bottom sheet

### **Testing Requirements**
- [ ] **Theme Testing**: Verify components across all themes
- [ ] **State Management**: Test store integration and persistence
- [ ] **API Integration**: Test analysis endpoint with real data
- [ ] **Error States**: Test error handling and recovery
- [ ] **Mobile Experience**: Verify mobile bottom sheet integration

## 🎯 Success Criteria

### **Functional Goals**
- User can navigate to ATS Scanner page
- Page shows appropriate state based on file upload status
- Analysis can be triggered and shows loading state
- Results display with score visualization and recommendations
- Error states are handled gracefully

### **Technical Goals**
- All components use semantic theme system
- Proper integration with existing stores
- Responsive design works with navigation system
- API integration follows established patterns
- Code follows project conventions and standards

## 🚀 Next Steps After Phase 6

### **Phase 7 Preparation**
- Enhanced results visualization with interactive elements
- Export functionality for analysis results
- Results history and comparison features
- Advanced animations and micro-interactions

### **Future Enhancements**
- Job comparison page following similar patterns
- Advanced analysis features and insights
- Performance optimizations and caching
- User analytics and feedback collection

## 📝 Implementation Notes

### **Component Reuse Strategy**
- Maximize use of existing UI components
- Extend existing components rather than creating new ones
- Follow established component patterns and conventions
- Maintain consistency with existing design system

### **Store Integration Pattern**
- Always connect to appropriate Pinia stores
- Use computed properties for reactive state
- Handle loading and error states consistently
- Follow established store patterns

### **API Development Approach**
- Use standardized response formats
- Implement comprehensive error handling
- Follow security best practices
- Ensure proper validation and sanitization