# AI Continuity Guide

## 🤖 AI ASSISTANT: PROJECT CONTEXT SETUP

**When you see this file, follow these steps:**

---

## 📋 STEP 1: ASK THE USER

"Hi! I see you're working on the Resume ATS Analyzer project. To provide the best assistance, I need to understand what you want to work on.

**Please tell me:**

1. **What type of work do you need help with?**
   - 🔧 Continuing development work (components, stores, pages)
   - 🎨 Styling/UI improvements only (no logic changes)
   - 🆕 Adding new features or components
   - 🐛 Debugging or fixing issues
   - 📚 Documentation updates
   - ❓ Other (please specify)

2. **What specific task or problem do you want to address?**
   (Be as detailed as possible)

3. **What was the last thing you completed or were working on?**
   (This helps me understand where you left off)

Based on your answers, I'll request the specific documentation files I need to help you effectively."

---

## 📂 STEP 2: REQUEST REQUIRED FILES

**After the user responds, request files based on their work type:**

### **🔧 For Development Work, ask for:**
```
"Thanks! For development work, please provide these files:

**REQUIRED (Priority 1):**
- 06-CURRENT-PHASE-STATUS.md (shows current development focus)
- 04-PROJECT-STRUCTURE.md (shows what exists and status)
- 13-IMPLEMENTATION-GUIDE.md (step-by-step tasks)

**ALSO NEEDED (Priority 2) - based on your specific task:**
- If working on components: 09-COMPONENT-REFERENCE.md + 03-THEME-SYSTEM.md
- If working on stores: 11-STORE-MANAGEMENT.md + 08-API-DOCUMENTATION.md  
- If working on pages: 10-PAGE-REFERENCE.md + 07-NAVIGATION-SYSTEM.md

Please upload these files and I'll help you continue development following the established patterns."
```

### **🎨 For Styling Work, ask for:**
```
"Thanks! For styling work, please provide these files:

**REQUIRED:**
- 17-STYLING-GUIDELINES.md (styling rules and restrictions - CRITICAL!)
- 03-THEME-SYSTEM.md (semantic color system)
- 04-PROJECT-STRUCTURE.md (project overview)
- 09-COMPONENT-REFERENCE.md (component patterns)

**ALSO NEEDED - Tell me what you're styling:**
- If styling components: Just the files above are sufficient
- If styling pages: Also include 10-PAGE-REFERENCE.md (page patterns and structure)
- If styling navigation: Also include 07-NAVIGATION-SYSTEM.md (navigation components)

**IMPORTANT STYLING RULES:**
I can ONLY modify TailwindCSS classes and CANNOT change any logic, functionality, or component structure.

Please upload the appropriate files and tell me:
1. What specific component/page you want to style
2. What styling improvements you want to make"
```

### **🆕 For New Features, ask for:**
```
"Thanks! For new feature work, please provide these files:

**REQUIRED:**
- 06-CURRENT-PHASE-STATUS.md (current development focus)
- 04-PROJECT-STRUCTURE.md (existing structure) 
- 13-IMPLEMENTATION-GUIDE.md (development guidelines)
- 09-COMPONENT-REFERENCE.md (component patterns)
- 11-STORE-MANAGEMENT.md (store patterns)

**ALSO HELPFUL:**
- 10-PAGE-REFERENCE.md (if adding pages)
- 08-API-DOCUMENTATION.md (if working with APIs)

Please upload these files and describe the new feature you want to add. I'll help you implement it following established patterns and reusing existing components."
```

### **🐛 For Debugging, ask for:**
```
"Thanks! For debugging, please provide these files:

**REQUIRED:**
- 04-PROJECT-STRUCTURE.md (project structure)
- 12-DEVELOPMENT-GUIDELINES.md (debugging procedures)

**ALSO NEEDED (based on issue type):**
- If API/store issue: 08-API-DOCUMENTATION.md + 11-STORE-MANAGEMENT.md
- If component issue: 09-COMPONENT-REFERENCE.md + 03-THEME-SYSTEM.md
- If page issue: 10-PAGE-REFERENCE.md + 07-NAVIGATION-SYSTEM.md

Please upload these files and provide:
- Detailed description of the issue
- Expected vs actual behavior  
- Any error messages or console logs
- Steps to reproduce the problem"
```

### **📚 For Documentation Updates, ask for:**
```
"Thanks! For documentation updates, please provide:

**REQUIRED:**
- 16-DOCUMENTATION-UPDATES.md (update guidelines)
- The specific documentation file(s) you want to update

Please upload these files and tell me:
- What changes were made to the code/project
- Which documentation needs updating
- Any new components/pages/stores that were added"
```

---

## 🎯 STEP 3: PROVIDE CONTEXT-AWARE ASSISTANCE

**After receiving the files, always:**

1. **Acknowledge the current project state:**
   "I can see you're currently in [Phase X] working on [current focus]. Based on the project structure, [summary of status]."

2. **Confirm the specific task:**
   "You want to [restate their specific request]. I'll help you with this following the established [patterns/guidelines/restrictions]."

3. **Highlight any important constraints:**
   - For styling: "I'll only modify TailwindCSS classes and won't change any logic."
   - For development: "I'll reuse existing components and follow the established patterns."
   - For new features: "I'll check what components already exist before creating new ones."

4. **Ask clarifying questions if needed:**
   "Before we start, do you have any specific requirements or constraints for this task?"

---

## ⚠️ CRITICAL REMINDERS FOR AI

### **ALWAYS DO:**
- ✅ **Read the current phase status** - Understand what's being worked on
- ✅ **Check project structure** - Know what exists and what's in progress  
- ✅ **Follow established patterns** - Reuse components, follow conventions
- ✅ **Respect restrictions** - Especially for styling-only work
- ✅ **Ask for clarification** - If task or context is unclear

### **NEVER DO:**
- ❌ **Assume previous session knowledge** - Always work from provided files
- ❌ **Break core functionality** - Don't modify logic unless explicitly for development work
- ❌ **Add unauthorized features** - Only work on requested tasks
- ❌ **Ignore project conventions** - Follow the established patterns
- ❌ **Skip file requests** - Always get proper context first

---

## 📝 SAMPLE AI RESPONSE WHEN USER PROVIDES THIS FILE

"Hi! I see you're working on the Resume ATS Analyzer project. To provide the best assistance, I need to understand what you want to work on.

**Please tell me:**

1. **What type of work do you need help with?**
   - 🔧 Continuing development work (components, stores, pages)
   - 🎨 Styling/UI improvements only (no logic changes)  
   - 🆕 Adding new features or components
   - 🐛 Debugging or fixing issues
   - 📚 Documentation updates
   - ❓ Other (please specify)

2. **What specific task or problem do you want to address?**

3. **What was the last thing you completed or were working on?**

Based on your answers, I'll request the specific documentation files I need to help you effectively while following the project's established patterns and guidelines."

---

## 🎯 SUCCESS INDICATORS

**You'll know the AI setup worked when:**
- ✅ AI asks about work type before requesting files
- ✅ AI requests appropriate files for the task type
- ✅ AI acknowledges current project phase and status
- ✅ AI follows project patterns and restrictions
- ✅ AI provides relevant, context-aware assistance