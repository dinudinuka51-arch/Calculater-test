import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk, GeminiSearchResult } from '../types';

export const getGroundedAnswer = async (prompt: string): Promise<GeminiSearchResult> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    
    // Filter out any potential empty or malformed chunks
    const validSources = sources.filter(s => s?.web?.uri && s?.web?.title) as GroundingChunk[];

    return { text, sources: validSources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get answer from Gemini: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting Gemini.");
  }
};
