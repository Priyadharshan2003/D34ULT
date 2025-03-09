"use client";
import {
    Bot,
    ChevronUp,
    CircleDollarSign,
    Globe,
    HelpCircle,
    Loader,
    MessageSquare,
    Mic,
    PieChart,
    Send,
    Shield,
    Volume,
    Volume2,
    X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const chatbotFAQs = [
    {
        question: "How does EcoFinX help with financial management?",
        answer: "EcoFinX uses AI to analyze your spending patterns, create personalized budgets, and provide actionable insights to improve your financial health. Our platform automatically categorizes transactions and identifies saving opportunities."
    },
    {
        question: "Is my financial data secure?",
        answer: "Yes, security is our priority. EcoFinX uses bank-level encryption (256-bit SSL), two-factor authentication, and never stores your banking credentials. We're compliant with all financial data regulations and undergo regular security audits."
    },
    {
        question: "How much does EcoFinX cost?",
        answer: "EcoFinX offers three pricing tiers: Free (basic budgeting and expense tracking), Pro (₹9.99/month with AI insights and automated savings), and Enterprise (₹29.99/month with advanced features and dedicated support). You can start with a 14-day free trial of any paid plan."
    },
    {
        question: "Can I connect multiple bank accounts?",
        answer: "Absolutely! EcoFinX supports connections with over 10,000 financial institutions. You can link checking accounts, savings accounts, credit cards, investment accounts, and loans for a comprehensive view of your finances."
    },
    {
        question: "How does the AI-powered assistant work?",
        answer: "Our AI assistant leverages advanced machine learning to analyze your financial data, identify patterns, and provide personalized recommendations. It can answer questions about your spending, suggest budget adjustments, and help you plan for financial goals."
    },
    // New sustainability-focused FAQs
    {
        question: "How can I make my finances more sustainable?",
        answer: "EcoFinX offers several ways to make your finances more sustainable: 1) Our ESG investment screener helps you find environmentally responsible investments, 2) Our carbon footprint tracker shows the environmental impact of your purchases, 3) We offer suggestions for eco-friendly alternatives to high-carbon spending patterns, and 4) You can set up automatic donations to environmental causes."
    },
    {
        question: "What are green investment options?",
        answer: "EcoFinX can help you identify green investment options including: ESG (Environmental, Social, Governance) funds, renewable energy stocks and ETFs, green bonds that fund environmental projects, and sustainable real estate investments. Our platform provides ESG ratings and impact metrics so you can align your investments with your environmental values."
    },
    {
        question: "How does EcoFinX help reduce my carbon footprint?",
        answer: "EcoFinX estimates the carbon footprint of your transactions based on merchant category and spending patterns. We provide a monthly sustainability report with actionable suggestions to reduce your environmental impact, such as identifying high-carbon spending categories and suggesting alternatives. Our Green Goals feature also helps you set and track sustainability targets."
    }
];

// Customer support common issues and responses
const customerSupportResponses = {
    account: {
        login: "If you're having trouble logging in, please try resetting your password using the 'Forgot Password' link. If that doesn't work, ensure you're using the correct email address associated with your account. For persistent issues, I can help you contact our technical support team.",
        signup: "I'd be happy to help you set up your EcoFinX account. To get started, click the 'Sign Up' button on our homepage and follow the prompts. You'll need to provide a valid email address, create a password, and verify your identity. Is there a specific part of the signup process you need help with?",
        verification: "Account verification usually takes 1-2 business days. If it's been longer, I can check the status for you. Could you please provide your email address associated with your account?"
    },
    billing: {
        subscription: "I can help with your subscription concerns. EcoFinX offers three plans: Free, Pro (₹9.99/month), and Enterprise (₹29.99/month). Would you like to upgrade, downgrade, or cancel your current subscription?",
        payment: "For payment issues, please check that your card details are up-to-date in your account settings. If you're seeing an unexpected charge, I can help investigate that for you. Could you provide more details about the specific payment issue?",
        refund: "Our refund policy allows for refunds within 14 days of subscription payment. I'd be happy to process a refund request for you. Could you confirm when you made the payment and why you're requesting a refund?"
    },
    technical: {
        app: "I'm sorry you're experiencing issues with our app. Let's troubleshoot together. First, try updating to the latest version and restarting the app. If the problem persists, could you describe exactly what happens when the issue occurs?",
        website: "For website issues, please try clearing your browser cache and cookies, or try using a different browser. If you're still experiencing problems, could you tell me what specifically is happening and which browser you're using?",
        connection: "Connection problems often resolve by checking your internet connection, refreshing the page, or logging out and back in. If you're still having trouble, let me know what device and network you're using."
    }
};

// Sustainable finance tips that can be included in responses
const sustainabilityTips = [
    "💡 Tip: Consider switching to paperless statements for all your accounts to reduce paper waste and save trees.",
    "💡 Tip: Many banks offer eco-friendly credit cards made from recycled materials or that contribute to environmental causes.",
    "💡 Tip: Setting up automatic transfers to a dedicated 'green fund' can help you save for energy-efficient home upgrades.",
    "💡 Tip: Look for the ESG (Environmental, Social, Governance) ratings when choosing investments to align with sustainable values.",
    "💡 Tip: Buying locally not only supports your community but reduces the carbon footprint associated with shipping and transportation.",
    "💡 Tip: Consider energy usage when making purchasing decisions - energy-efficient appliances often save money long-term.",
    "💡 Tip: Many utility companies offer green energy options that may cost slightly more but support renewable energy development.",
    "💡 Tip: Carpooling, public transit, or cycling can significantly reduce both your transportation costs and carbon footprint."
];

// Supported languages for voice chat
const supportedLanguages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
    { code: 'ml-IN', name: 'Malayalam', flag: '🇮🇳' }
];

// Common phrases in multiple languages
const languagePhrases = {
    'en-US': {
        welcome: "Hello! I'm EcoFinX's AI assistant. What can I help you with today?",
        options: "\n\n1️⃣ Financial Insights & Advice\n2️⃣ Customer Support & Assistance\n\nPlease select an option or type your query.",
        listeningPrompt: "Listening...",
        speakNow: "Speak now...",
        processingVoice: "Processing your voice...",
        voiceError: "Sorry, I couldn't understand. Please try again.",
        financialModeSwitch: "I've switched to financial advisor mode. How can I help with your financial questions today?",
        supportModeSwitch: "I've switched to customer support mode. What issue can I help you resolve today?"
    },
    'ta-IN': {
        welcome: "வணக்கம்! நான் EcoFinX AI உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        options: "\n\n1️⃣ நிதி அறிவுரைகள் & ஆலோசனை\n2️⃣ வாடிக்கையாளர் ஆதரவு & உதவி\n\nஒரு விருப்பத்தை தேர்ந்தெடுக்கவும் அல்லது உங்கள் கேள்வியை தட்டச்சு செய்யவும்.",
        listeningPrompt: "கேட்கிறேன்...",
        speakNow: "இப்போது பேசுங்கள்...",
        processingVoice: "உங்கள் குரலை செயலாக்குகிறேன்...",
        voiceError: "மன்னிக்கவும், எனக்கு புரியவில்லை. மீண்டும் முயற்சிக்கவும்.",
        financialModeSwitch: "நான் நிதி ஆலோசகர் பயன்முறைக்கு மாறியுள்ளேன். உங்கள் நிதி கேள்விகளுக்கு எப்படி உதவ முடியும்?",
        supportModeSwitch: "நான் வாடிக்கையாளர் ஆதரவு பயன்முறைக்கு மாறியுள்ளேன். எந்த பிரச்சினையை நான் தீர்க்க உதவ முடியும்?"
    },
    'ml-IN': {
        welcome: "ഹലോ! ഞാൻ EcoFinX AI അസിസ്റ്റന്റ് ആണ്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?",
        options: "\n\n1️⃣ ധനകാര്യ ഉൾക്കാഴ്ചകളും ഉപദേശവും\n2️⃣ കസ്റ്റമർ സപ്പോർട്ട് & സഹായം\n\nദയവായി ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക.",
        listeningPrompt: "കേൾക്കുന്നു...",
        speakNow: "ഇപ്പോൾ സംസാരിക്കുക...",
        processingVoice: "നിങ്ങളുടെ ശബ്ദം പ്രോസസ് ചെയ്യുന്നു...",
        voiceError: "ക്ഷമിക്കണം, എനിക്ക് മനസ്സിലായില്ല. വീണ്ടും ശ്രമിക്കുക.",
        financialModeSwitch: "ഞാൻ ഫിനാൻഷ്യൽ അഡ്വൈസർ മോഡിലേക്ക് മാറിയിരിക്കുന്നു. നിങ്ങളുടെ സാമ്പത്തിക ചോദ്യങ്ങളിൽ എങ്ങനെ സഹായിക്കാൻ കഴിയും?",
        supportModeSwitch: "ഞാൻ കസ്റ്റമർ സപ്പോർട്ട് മോഡിലേക്ക് മാറിയിരിക്കുന്നു. ഏത് പ്രശ്നമാണ് ഞാൻ പരിഹരിക്കേണ്ടത്?"
    }
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [assistantMode, setAssistantMode] = useState("initial");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Voice chat state
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState('en-US');
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const [availableVoices, setAvailableVoices] = useState([]);

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = synthRef.current.getVoices();
            setAvailableVoices(voices);
        };

        loadVoices();
        synthRef.current.onvoiceschanged = loadVoices; // Update voices when they change
    }, []);

    // Initialize welcome message with selected language
    useEffect(() => {
        setMessages([{
            role: "assistant",
            content: `₹{languagePhrases[currentLanguage].welcome}₹{languagePhrases[currentLanguage].options}`
        }]);
    }, [currentLanguage]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                handleSendMessage(null, transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
                addAssistantMessage(languagePhrases[currentLanguage].voiceError);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, [currentLanguage]);

    // Helper to add assistant message
    const addAssistantMessage = (content) => {
        setMessages(prev => [...prev, { role: "assistant", content }]);
    };

    // Function to start listening
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            try {
                setIsListening(true);
                recognitionRef.current.lang = currentLanguage;
                recognitionRef.current.start();
                addAssistantMessage(languagePhrases[currentLanguage].listeningPrompt);
            } catch (error) {
                console.error('Speech recognition start error', error);
                setIsListening(false);
            }
        }
    };

    // Function to stop listening
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    // Function to speak text
    const speakText = (text) => {
        if (synthRef.current && voiceEnabled && !isSpeaking) {
            // Cancel any ongoing speech
            synthRef.current.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLanguage;

            // Find appropriate voice
            const languageVoice = availableVoices.find(voice => voice.lang.includes(currentLanguage.split('-')[0]));
            if (languageVoice) {
                utterance.voice = languageVoice;
            } else {
                console.warn(`No voice available for language: ₹{currentLanguage}`);
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (event) => {
                console.error('Speech synthesis error', event);
                setIsSpeaking(false);
            };

            synthRef.current.speak(utterance);
        }
    };

    // Scroll to bottom of messages when new ones are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // Speak the last assistant message if voice is enabled
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === "assistant" && voiceEnabled) {
            speakText(lastMessage.content);
        }
    }, [messages, voiceEnabled]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Function to detect user intent from input
    const detectUserIntent = (input) => {
        const financialKeywords = ["invest", "budget", "save", "spend", "money", "financial", "finance", "loan", "mortgage", "credit", "debt", "sustainable investing", "green investment"];
        const supportKeywords = ["help", "issue", "problem", "error", "trouble", "can't", "cannot", "login", "account", "subscription", "billing", "payment", "refund", "technical", "bug"];

        input = input.toLowerCase();

        // Check for explicit mode selection
        if (input.includes("1") || financialKeywords.some(keyword => input.includes(keyword))) {
            return "financial";
        } else if (input.includes("2") || supportKeywords.some(keyword => input.includes(keyword))) {
            return "support";
        }

        // If no clear intent, stay in current mode or default to financial
        return assistantMode !== "initial" ? assistantMode : "financial";
    };

    // Function to handle sending a message
    const handleSendMessage = async (e, voiceInput = null) => {
        e?.preventDefault();

        const messageText = voiceInput || input;
        if (!messageText.trim() && !e?.target?.dataset?.faq) return;

        // Get question from input or FAQ
        const question = e?.target?.dataset?.faq || messageText;

        // Add user message to chat
        const userMessage = { role: "user", content: question };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            let response;

            // If in initial mode, detect intent from first user message
            if (assistantMode === "initial") {
                const detectedMode = detectUserIntent(question);
                setAssistantMode(detectedMode);

                if (detectedMode === "financial") {
                    response = languagePhrases[currentLanguage].financialModeSwitch;
                } else {
                    response = languagePhrases[currentLanguage].supportModeSwitch;
                }
            } else if (assistantMode === "financial") {
                // Financial advisor mode - use Gemini API
                response = await generateResponseWithGemini(question);
            } else {
                // Customer support mode
                response = await generateCustomerSupportResponse(question);
            }

            // Add assistant response to chat
            const assistantMessage = { role: "assistant", content: response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error generating response:", error);
            const errorMessage = {
                role: "assistant",
                content: "I'm having trouble connecting right now. Please try again later or contact our support team."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle FAQ selection
    const handleFAQClick = (faq) => {
        const userMessage = { role: "user", content: faq.question };
        const assistantMessage = { role: "assistant", content: faq.answer };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
    };

    // Customer support response generation
    const generateCustomerSupportResponse = async (query) => {
        query = query.toLowerCase();

        // Detect customer support category
        let category = "general";
        let subCategory = "general";

        if (query.includes("login") || query.includes("sign in") || query.includes("can't access")) {
            category = "account";
            subCategory = "login";
        } else if (query.includes("sign up") || query.includes("register") || query.includes("create account")) {
            category = "account";
            subCategory = "signup";
        } else if (query.includes("verify") || query.includes("verification")) {
            category = "account";
            subCategory = "verification";
        } else if (query.includes("subscription") || query.includes("plan") || query.includes("upgrade") || query.includes("downgrade")) {
            category = "billing";
            subCategory = "subscription";
        } else if (query.includes("payment") || query.includes("charge") || query.includes("card")) {
            category = "billing";
            subCategory = "payment";
        } else if (query.includes("refund") || query.includes("money back")) {
            category = "billing";
            subCategory = "refund";
        } else if (query.includes("app") || query.includes("mobile")) {
            category = "technical";
            subCategory = "app";
        } else if (query.includes("website") || query.includes("site")) {
            category = "technical";
            subCategory = "website";
        } else if (query.includes("connect") || query.includes("connection")) {
            category = "technical";
            subCategory = "connection";
        }

        // Retrieve appropriate response
        let response = "I'd be happy to help with your question. Could you provide a bit more detail about what you're experiencing?";

        if (customerSupportResponses[category] && customerSupportResponses[category][subCategory]) {
            response = customerSupportResponses[category][subCategory];
        }

        // Add follow-up for personalized assistance
        response += "\n\nIf you need more personalized assistance, I can connect you with one of our customer support specialists. Would you like me to do that?";

        // Simulate API delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        return response;
    };

    // Gemini API integration for financial insights
    const generateResponseWithGemini = async (prompt) => {
        // Using the provided Gemini API key
        const GEMINI_API_KEY = "AIzaSyAtwZHArmcfnuxiblAKsk1OwQxp-j1JxKM";

        try {
            // Enhance the prompt with EcoFinX context and sustainability focus
            const enhancedPrompt = `As the EcoFinX AI assistant focusing on financial insights, provide a helpful response about ₹{prompt}. Include information about sustainable finance when relevant. Remember you are a financial assistant with a focus on both financial health and environmental sustainability.`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=₹{GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: enhancedPrompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                }),
            });

            // Improved error handling
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Gemini API HTTP error:", response.status, errorData);
                throw new Error(`API returned ₹{response.status}: ₹{JSON.stringify(errorData)}`);
            }

            const data = await response.json();

            // Updated response parsing for Gemini API structure
            if (data.candidates && data.candidates[0]?.content?.parts) {
                let responseText = "";

                // Extract text from all parts
                for (const part of data.candidates[0].content.parts) {
                    if (part.text) {
                        responseText += part.text;
                    }
                }

                if (responseText) {
                    // Add a random sustainability tip 30% of the time if response doesn't already contain sustainability content
                    if (!responseText.toLowerCase().includes('sustain') && Math.random() < 0.3) {
                        const randomTip = sustainabilityTips[Math.floor(Math.random() * sustainabilityTips.length)];
                        responseText = `₹{responseText}\n\n₹{randomTip}`;
                    }

                    return responseText;
                }
            }

            console.log("Full Gemini response:", JSON.stringify(data));
            throw new Error("Unexpected response format from Gemini API");
        } catch (error) {
            console.error("Gemini API error:", error.message || error);

            // Fallback to local responses if API fails
            const matchingFAQ = chatbotFAQs.find(faq =>
                faq.question.toLowerCase().includes(prompt.toLowerCase()) ||
                prompt.toLowerCase().includes(faq.question.toLowerCase().split(" ").slice(1, 4).join(" "))
            );

            if (matchingFAQ) {
                return matchingFAQ.answer;
            }

            // Add a sustainability tip to the fallback response
            const randomTip = sustainabilityTips[Math.floor(Math.random() * sustainabilityTips.length)];
            return `I'm your AI financial assistant focused on sustainable finance. I can help with budgeting, expense tracking, eco-friendly investments, and reducing your financial carbon footprint. What specific question can I help you with today?\n\n₹{randomTip}`;
        }
    };

    // Function to switch between assistance modes
    const switchAssistanceMode = (mode) => {
        setAssistantMode(mode);

        const modeMessage = {
            role: "assistant",
            content: mode === "financial"
                ? languagePhrases[currentLanguage].financialModeSwitch
                : languagePhrases[currentLanguage].supportModeSwitch
        };

        setMessages(prev => [...prev, modeMessage]);
    };

    // Function to switch language
    const changeLanguage = (langCode) => {
        setCurrentLanguage(langCode);

        // Stop any active voice functions
        stopListening();
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }

        // Notify about language change
        const langInfo = supportedLanguages.find(lang => lang.code === langCode);
        addAssistantMessage(`Language changed to ₹{langInfo.name} ₹{langInfo.flag}`);
    };

    return (
        <>
            {/* Chatbot Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ₹{isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-700 hover:bg-blue-800"
                    } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chatbot Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-xl shadow-2xl transition-all duration-300 transform ₹{isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    } overflow-hidden flex flex-col border border-gray-200`}
                style={{ maxHeight: "calc(100vh - 150px)" }}
            >
                {/* Chatbot Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Bot size={24} className="mr-2" />
                        <div>
                            <h3 className="font-bold">EcoFinX Assistant</h3>
                            <p className="text-xs text-blue-100">
                                {assistantMode === "financial" ? "Financial Advisor" :
                                    assistantMode === "support" ? "Customer Support" : "AI Assistant"}
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        {/* Language selector */}
                        <div className="relative mr-2">
                            <button
                                className="flex items-center text-xs px-2 py-1 rounded bg-blue-800 text-blue-200 hover:bg-blue-700"
                                onClick={() => document.getElementById('language-dropdown').classList.toggle('hidden')}
                            >
                                <Globe size={14} className="mr-1" />
                                {supportedLanguages.find(lang => lang.code === currentLanguage)?.flag}
                            </button>
                            <div id="language-dropdown" className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 hidden">
                                {supportedLanguages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            changeLanguage(lang.code);
                                            document.getElementById('language-dropdown').classList.add('hidden');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {lang.flag} {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Voice toggle */}
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            className={`text-xs mr-2 px-2 py-1 rounded flex items-center ₹{voiceEnabled
                                ? "bg-blue-600 text-white"
                                : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                                }`}
                        >
                            {voiceEnabled ? <Volume2 size={14} className="mr-1" /> : <Volume size={14} className="mr-1" />}
                            {voiceEnabled ? "Mute" : "Unmute"}
                        </button>

                        {/* Mode switchers */}
                        {assistantMode !== "initial" && (
                            <div className="flex mr-2">
                                <button
                                    onClick={() => switchAssistanceMode("financial")}
                                    className={`text-xs mr-2 px-2 py-1 rounded ₹{assistantMode === "financial"
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                                        }`}
                                >
                                    Financial
                                </button>
                                <button
                                    onClick={() => switchAssistanceMode("support")}
                                    className={`text-xs px-2 py-1 rounded ₹{assistantMode === "support"
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                                        }`}
                                >
                                    Support
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-blue-100 hover:text-white focus:outline-none"
                        >
                            <ChevronUp size={20} />
                        </button>
                    </div>
                </div>

                {/* Chatbot Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ₹{message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0">
                                    <Bot size={16} className="text-white" />
                                </div>
                            )}
                            <div
                                className={`rounded-lg px-4 py-3 max-w-[75%] ₹{message.role === "user"
                                    ? "bg-blue-700 text-white rounded-br-none"
                                    : "bg-white border border-gray-200 rounded-bl-none"
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.role === "assistant" && (
                                    <button
                                        onClick={() => speakText(message.content)}
                                        className="mt-2 text-xs text-gray-500 hover:text-blue-700 flex items-center"
                                        disabled={isSpeaking}
                                    >
                                        <Volume2 size={12} className="mr-1" />
                                        Listen
                                    </button>
                                )}
                            </div>
                            {message.role === "user" && (
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-600">You</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="mb-4 flex justify-start">
                            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="rounded-lg px-4 py-3 bg-white border border-gray-200 rounded-bl-none">
                                <div className="flex items-center">
                                    <Loader className="h-4 w-4 animate-spin text-blue-700 mr-2" />
                                    <p className="text-sm text-gray-500">Thinking...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isListening && (
                        <div className="mb-4 flex justify-start">
                            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="rounded-lg px-4 py-3 bg-white border border-gray-200 rounded-bl-none">
                                <div className="flex items-center">
                                    <div className="flex space-x-1 mr-2">
                                        <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                                        <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                    <p className="text-sm text-gray-500">{languagePhrases[currentLanguage].listeningPrompt}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Mode Selection Buttons - visible only in initial mode */}
                {assistantMode === "initial" && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    setAssistantMode("financial");
                                    const userMessage = { role: "user", content: "I need financial insights" };
                                    const assistantMessage = {
                                        role: "assistant",
                                        content: languagePhrases[currentLanguage].financialModeSwitch
                                    };
                                    setMessages(prev => [...prev, userMessage, assistantMessage]);
                                }}
                                className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center"
                            >
                                <CircleDollarSign size={24} className="text-blue-700 mb-2" />
                                <span className="font-medium">Financial Insights</span>
                                <span className="text-xs text-gray-500 mt-1">AI-powered financial advice</span>
                            </button>
                            <button
                                onClick={() => {
                                    setAssistantMode("support");
                                    const userMessage = { role: "user", content: "I need customer support" };
                                    const assistantMessage = {
                                        role: "assistant",
                                        content: languagePhrases[currentLanguage].supportModeSwitch
                                    };
                                    setMessages(prev => [...prev, userMessage, assistantMessage]);
                                }}
                                className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center"
                            >
                                <HelpCircle size={24} className="text-green-700 mb-2" />
                                <span className="font-medium">Customer Support</span>
                                <span className="text-xs text-gray-500 mt-1">Get help with issues</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Suggested Questions/FAQs - show only in relevant modes */}
                {assistantMode !== "initial" && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">
                            {assistantMode === "financial" ? "POPULAR FINANCIAL QUESTIONS" : "COMMON SUPPORT ISSUES"}
                        </h4>
                        <div className="flex overflow-x-auto pb-2 space-x-2 -mx-1 px-1">
                            {assistantMode === "financial" ? (
                                chatbotFAQs.map((faq, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFAQClick(faq)}
                                        className="px-3 py-2 rounded-full border border-gray-200 text-xs whitespace-nowrap flex-shrink-0 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {faq.question.length > 30 ? faq.question.substring(0, 30) + '...' : faq.question}
                                    </button>
                                ))
                            ) : (
                                // Support FAQs
                                <>
                                    <button onClick={() => setInput("I can't log into my account")} className="px-3 py-2 rounded-full border border-gray-200 text-xs whitespace-nowrap flex-shrink-0 hover:bg-gray-50">
                                        Login issues
                                    </button>
                                    <button onClick={() => setInput("How do I change my subscription plan?")} className="px-3 py-2 rounded-full border border-gray-200 text-xs whitespace-nowrap flex-shrink-0 hover:bg-gray-50">
                                        Subscription changes
                                    </button>
                                    <button onClick={() => setInput("I need a refund")} className="px-3 py-2 rounded-full border border-gray-200 text-xs whitespace-nowrap flex-shrink-0 hover:bg-gray-50">
                                        Refund request
                                    </button>
                                    <button onClick={() => setInput("App is crashing")} className="px-3 py-2 rounded-full border border-gray-200 text-xs whitespace-nowrap flex-shrink-0 hover:bg-gray-50">
                                        Technical issues
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Quick Help Buttons - show only if not in initial mode */}
                {assistantMode !== "initial" && (
                    <div className="px-4 py-3 border-t border-gray-200 grid grid-cols-3 gap-2">
                        {assistantMode === "financial" ? (
                            <>
                                <button
                                    onClick={() => handleFAQClick(chatbotFAQs[2])}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <CircleDollarSign size={20} className="text-blue-700 mb-1" />
                                    <span className="text-xs text-gray-600">Pricing</span>
                                </button>
                                <button
                                    onClick={() => handleFAQClick(chatbotFAQs[0])}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <PieChart size={20} className="text-green-600 mb-1" />
                                    <span className="text-xs text-gray-600">Features</span>
                                </button>
                                <button
                                    onClick={() => handleFAQClick(chatbotFAQs[1])}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <Shield size={20} className="text-red-600 mb-1" />
                                    <span className="text-xs text-gray-600">Security</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setInput("Account issues")}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <Shield size={20} className="text-blue-700 mb-1" />
                                    <span className="text-xs text-gray-600">Account</span>
                                </button>
                                <button
                                    onClick={() => setInput("Billing questions")}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <CircleDollarSign size={20} className="text-green-600 mb-1" />
                                    <span className="text-xs text-gray-600">Billing</span>
                                </button>
                                <button
                                    onClick={() => setInput("Technical support")}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <HelpCircle size={20} className="text-red-600 mb-1" />
                                    <span className="text-xs text-gray-600">Technical</span>
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={assistantMode === "financial"
                                ? "Ask about financial advice..."
                                : assistantMode === "support"
                                    ? "Describe your issue..."
                                    : "Type your message here..."
                            }
                            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoading || isListening}
                        />
                        {/* Voice input button */}
                        <button
                            type="button"
                            onClick={isListening ? stopListening : startListening}
                            className={`p-2 ₹{isListening
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-100 hover:bg-blue-200"
                                } text-₹{isListening ? "white" : "blue-700"} border-t border-b border-gray-300`}
                            disabled={isLoading}
                        >
                            <Mic size={20} className={isListening ? "animate-pulse" : ""} />
                        </button>
                        <button
                            type="submit"
                            className={`bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-r-lg ₹{(isLoading || isListening) ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading || isListening}
                        >
                            <Send size={20} />
                        </button>
                    </div>

                    {/* Voice support notice */}
                    <div className="flex justify-center mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                            <Globe size={12} className="mr-1" />
                            Voice support: English, Tamil & Malayalam
                            {isSpeaking && (
                                <span className="ml-2 flex items-center text-blue-600">
                                    <Volume2 size={12} className="mr-1 animate-pulse" />
                                    Speaking...
                                </span>
                            )}
                        </span>
                    </div>
                </form>
            </div>

            {/* Voice Commands Help Modal */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform translate-y-[-120%]">
                    <h4 className="font-medium text-sm mb-2 text-blue-700">Voice Commands</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                        <li>• Say "switch to financial" to change mode</li>
                        <li>• Say "switch to support" to change mode</li>
                        <li>• Say "mute" or "unmute" to toggle voice</li>
                        <li>• Say "English", "Tamil" or "Malayalam" to change language</li>
                    </ul>
                </div>
            )}
        </>
    );
}