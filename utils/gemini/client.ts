// GeminiClient - utils/gemini/client.ts
import { GoogleGenAI } from "@google/genai";

export interface GeminiRequest {
  model: string;
  contents: string;
  systemInstruction: string;
}

export interface GeminiResult {
  success: boolean;
  text?: string;
  error?: string;
}

export async function generateContent(apiKey: string, request: GeminiRequest): Promise<GeminiResult> {
    console.log(apiKey)
  try {
    const ai = new GoogleGenAI({ apiKey:apiKey });
    
    const response = await ai.models.generateContent({
      model: request.model,
      contents: request.contents,
      config: {
        systemInstruction: request.systemInstruction,
      },
    });

    return {
      success: true,
      text: response.text,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Request failed',
    };
  }
}