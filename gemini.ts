
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini with process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCaption = async (topic: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a premium, aesthetic, short Instagram caption for a post about: ${topic}. Include 3 relevant premium hashtags.`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.8,
      }
    });
    return response.text?.trim() || "Stay aesthetic. ✨ #lumina #premium #lifestyle";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Elegance in every pixel. 🌙 #lumina #aesthetic #vibe";
  }
};

export const getChatResponse = async (history: { role: string, parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are James, a friendly and helpful person on a premium social media app called Obryxen. Keep responses concise, helpful, and matching a casual, high-end social vibe.",
      }
    });
    
    // We send message directly if no history or just the text
    const response = await chat.sendMessage({ message });
    return response.text || "That's interesting! Tell me more.";
  } catch (error) {
    console.error("Chat Gemini Error:", error);
    return "I'm having a bit of trouble connecting right now, but I'll get back to you soon!";
  }
};
