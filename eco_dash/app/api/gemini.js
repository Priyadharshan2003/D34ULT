// frontend/app/api/gemini/route.js (App Router) or frontend/pages/api/gemini.js (Pages Router)
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client (move outside handler for performance)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  // Ensure POST request
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Only POST requests allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse the request body
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ message: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Use the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate a response
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ message: "Failed to generate response", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// For Pages Router, export as default
// export default handler;