# Tech Stack

## 🏗️ Technology Overview

- **Frontend**: Nuxt 3 + TypeScript
- **Styling**: TailwindCSS v4 (CSS-first theme configuration)
- **State Management**: Pinia (for cross-page data persistence)
- **AI Integration**: Google Gemini API (`@google/genai`)
- **File Processing**: mammoth (DOCX) + pdf-parse (PDF)
- **Backend**: Nuxt server API routes
- **Icons**: Nuxt Icon module

## 📦 Dependencies

### Core Dependencies
```bash
npm install @pinia/nuxt          # State management
npm install @nuxt/icon           # Icon components
npm install mammoth              # DOCX processing
npm install pdf-parse            # PDF processing
npm install @google/genai        # Google Gemini AI
```

### Framework Details
- **Nuxt 3**: Full-stack Vue.js framework with server-side rendering
- **TypeScript**: Type safety and enhanced developer experience
- **TailwindCSS v4**: Revolutionary CSS-first theme configuration
- **Pinia**: Vue state management with TypeScript support

### File Processing Stack
- **mammoth**: Microsoft Word (.docx) document processing
- **pdf-parse**: PDF text extraction and parsing
- **Server-side processing**: Secure file handling via Nuxt API routes

### AI Integration
- **Google Gemini API**: Advanced language model for resume analysis
- **Research-based prompts**: Modern ATS analysis approach
- **Contextual understanding**: Beyond simple keyword matching

### Development Tools
- **Nuxt Icon**: Comprehensive icon system
- **TypeScript**: Enhanced code quality and IDE support
- **Server API Routes**: Built-in backend functionality

## 🔧 Environment Requirements

### Environment Variables
```bash
# .env
GOOGLE_API_KEY=your_gemini_api_key_here
NUXT_SECRET_KEY=your_app_secret_key
```

### Node.js Requirements
- **Node.js**: Version 18+ recommended
- **npm**: Package management
- **TypeScript**: Built-in Nuxt 3 support

## 🎨 Styling Architecture

### TailwindCSS v4 Features
- **CSS-first configuration**: Using `@theme` directive
- **Semantic color naming**: Content-based color utilities
- **Multi-theme support**: Automatic theme switching
- **Responsive design**: Mobile-first approach
- **Custom utilities**: Theme-aware component styling