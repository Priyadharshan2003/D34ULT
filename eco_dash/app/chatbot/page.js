// frontend/components/Chatbot.tsx
import { useState } from "react";
import { sendMessageToGemini } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const reply = await sendMessageToGemini(message);
      setResponse(reply);
      setMessage("");
    } catch (error) {
      console.error("Chatbot error:", error);
      setResponse("Sorry, something went wrong!");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <p>{response || "Ask me anything about your finances!"}</p>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}