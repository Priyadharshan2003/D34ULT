"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "user", message: "How can I improve my credit score?" },
    { role: "assistant", message: "Based on your spending habits, I recommend paying down credit card balances below 30% of your limit and making all payments on time. This could improve your score by 15-20 points within 60 days." },
    { role: "user", message: "Are there eco-friendly investment options?" },
  ]);
  
  const heroRef = useRef(null);
  const chatEndRef = useRef(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElement = heroRef.current;
      if (heroElement) {
        heroElement.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message
    setChatHistory([...chatHistory, { role: "user", message: chatMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "how are you": "I'm doing well! How can I help with your finances today?",
        "help": "I can help you manage your finances, track spending, or provide investment advice. What would you like to know?",
        "investment": "Based on your profile, I recommend considering our ESG (Environmental, Social, Governance) funds that align with your sustainability goals while targeting 7-9% annual returns.",
        "credit": "I've analyzed your accounts and found that reducing your credit utilization to below 30% could improve your score by up to 25 points within 2-3 months.",
        "sustainable": "EcoFinX offers carbon footprint tracking for all transactions and exclusive access to green investment opportunities with competitive returns.",
      };
      
      // Default response if no keywords match
      let aiResponse = "I'd be happy to help with your financial questions. For this specific inquiry, would you like me to connect you with one of our sustainability advisors?";
      
      // Check for keywords in the message
      const lowerMessage = chatMessage.toLowerCase();
      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
          aiResponse = response;
          break;
        }
      }
      
      setChatHistory(prev => [...prev, { role: "assistant", message: aiResponse }]);
    }, 800);
    
    setChatMessage("");
  };

  return (
    <>
      {/* Hero Section with Gradient Overlay */}
      <section 
        ref={heroRef} 
        className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-green-800 to-blue-900 flex items-center"
      >
        {/* Background Animation Effects */}
        <div className="absolute inset-0 bg-[url('/abstract-finance.svg')] opacity-20 bg-center bg-no-repeat bg-cover"></div>
        <div className="absolute w-64 h-64 rounded-full bg-green-400 filter blur-3xl opacity-20 top-0 right-0"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-400 filter blur-3xl opacity-10 bottom-0 left-0"></div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium backdrop-blur-sm border border-green-500/30 self-start">
                <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Sustainable Banking Revolution
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
                  SUSTAINABLE
                </span> <br />
                BANKING FOR A<br />
                <span className="text-green-400">GREENER FUTURE</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-[600px]">
                Join EcoFinX and experience AI-powered banking that helps you make eco-conscious financial decisions while building wealth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-grow max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/40 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                </div>
                <Button size="lg" className="px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-none shadow-lg shadow-green-700/30">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="flex items-center pt-2">
                <div className="flex -space-x-2">
                  <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/api/placeholder/40/40" width={40} height={40} alt="User" className="rounded-full object-cover" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/api/placeholder/40/40" width={40} height={40} alt="User" className="rounded-full object-cover" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/api/placeholder/40/40" width={40} height={40} alt="User" className="rounded-full object-cover" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-300">
                    <span className="font-bold text-green-400">11K+</span> people already trusted our service
                  </div>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#10B981" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Dashboard/Chatbot Toggle */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20">
              <div className="flex bg-gray-800/50 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === "dashboard" 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow" 
                    : "text-gray-300 hover:text-white"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("chatbot")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === "chatbot" 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow" 
                    : "text-gray-300 hover:text-white"
                  }`}
                >
                  AI Advisor
                </button>
              </div>
              
              {activeTab === "dashboard" ? (
                // Financial Dashboard
                <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50">
                  <div className="bg-gray-800/80 p-4 border-b border-gray-700/50 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                      <h3 className="font-medium text-white">EcoFinX Dashboard</h3>
                    </div>
                    <div className="text-xs text-gray-400">Last updated: Just now</div>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50">
                        <div className="text-xs text-gray-400">Total Balance</div>
                        <div className="text-xl font-bold text-white">$24,562</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                          +2.5%
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50">
                        <div className="text-xs text-gray-400">Carbon Offset</div>
                        <div className="text-xl font-bold text-white">125kg</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                          +12%
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50">
                        <div className="text-xs text-gray-400">Green Score</div>
                        <div className="text-xl font-bold text-white">84/100</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                          +5%
                        </div>
                      </div>
                    </div>
                    
                    {/* Spending Chart */}
                    <div className="h-32 mb-4 relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-20">
                        <svg viewBox="0 0 400 100" preserveAspectRatio="none" width="100%" height="100%">
                          <path 
                            d="M0,50 C50,30 100,60 150,40 C200,20 250,50 300,35 C350,20 400,40 400,50 L400,100 L0,100 Z" 
                            fill="url(#greenGradient)" 
                            fillOpacity="0.6"
                          />
                          <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="absolute top-2 left-2 text-xs text-white font-medium px-2 py-1 bg-gray-800/60 rounded-md">
                        Spending Analytics
                      </div>
                    </div>
                    
                    {/* Eco Impact */}
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-400 mb-1">Eco-Friendly Spending</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-xs text-gray-300">Green Purchases</span>
                        </div>
                        <span className="text-xs font-medium text-white">62%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button className="bg-gray-800 hover:bg-gray-700 text-white text-xs border border-gray-700 shadow-none">
                        View Transactions
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white text-xs shadow-lg shadow-green-700/20">
                        Sustainable Options
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // AI Chatbot
                <div className="h-96 bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 flex flex-col">
                  <div className="bg-gray-800/80 p-4 border-b border-gray-700/50">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                      <h3 className="font-medium text-white">EcoFinX AI Advisor</h3>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div 
                        key={index} 
                        className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            chat.role === "user" 
                              ? "bg-green-600 text-white" 
                              : "bg-gray-800 text-gray-200 border border-gray-700"
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700/50 bg-gray-800/50">
                    <div className="relative">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Ask about sustainability and finance..."
                        className="w-full p-3 pr-12 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder-gray-500 text-sm"
                      />
                      <button 
                        type="submit" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating element */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white opacity-60 animate-bounce">
          <span className="text-xs mb-1">Explore More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Making Banking <span className="text-green-600">Sustainable</span>
            </h2>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-10 bg-green-600 rounded-full"></div>
              <div className="h-1 w-20 bg-green-400 rounded-full"></div>
              <div className="h-1 w-10 bg-green-200 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Bank-Grade Security</h3>
              <p className="text-gray-600 dark:text-gray-400">Advanced encryption and multi-factor authentication to protect your assets and data.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Carbon Footprint Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor the environmental impact of your purchases and receive insights to reduce your carbon footprint.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">AI Financial Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">Advanced machine learning algorithms analyze your financial behavior to provide personalized advice.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Sustainable Investments</h3>
              <p className="text-gray-600 dark:text-gray-400">Access curated investment opportunities in renewable energy, sustainable agriculture, and clean technology.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;