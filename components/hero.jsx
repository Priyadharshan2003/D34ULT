"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section - Split Design */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                Experienced Banking Reinvented
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">
                BANKING MADE <br />
                <span className="text-green-600">SIMPLE, SECURE</span> <br />
                AND PERSONAL
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-[600px]">
                We offer innovative solutions to build systems tailored to your needs, with tools, dashboards, analytics, and personalized service.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                  Get Started Now
            </Button>
              </div>
              <div className="flex items-center mt-6">
                <div className="flex -space-x-2">
                  <Image src="/avatar-1.png" width={40} height={40} alt="User" className="rounded-full border-2 border-white" />
                  <Image src="/avatar-2.png" width={40} height={40} alt="User" className="rounded-full border-2 border-white" />
                  <Image src="/avatar-3.png" width={40} height={40} alt="User" className="rounded-full border-2 border-white" />
                </div>
                <p className="ml-4 text-sm text-gray-600">11K+ people trusted our service</p>
              </div>
        </div>
            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/banner.jpeg"
                  fill
                  style={{ objectFit: "cover" }}
              alt="Dashboard Preview"
                  className="rounded-lg"
              priority
            />
          </div>
              <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-md flex items-center">
                <span className="text-sm font-medium">Fast</span>
              </div>
              <div className="absolute top-1/3 right-4 bg-white rounded-full px-3 py-1 shadow-md flex items-center">
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="absolute bottom-4 left-1/4 bg-white rounded-full px-3 py-1 shadow-md flex items-center">
                <span className="text-sm font-medium">Simple</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
            Your trusted partner in <br />
            <span className="text-green-600">financial</span>
            <span className="inline-flex items-center justify-center mx-2 bg-green-100 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="text-green-600">growth</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-[800px] mx-auto mb-12">
            Our user-friendly platform leverages the latest technology, making banking seamless and efficient.
          </p>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image src="/wallet.jpg" fill style={{ objectFit: "cover" }} alt="Digital Wallet" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Digital Wallet</h3>
                <p className="text-gray-600">Manage all your cards and accounts in one secure place</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image src="/card.jpg" fill style={{ objectFit: "cover" }} alt="Smart Cards" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Smart Cards</h3>
                <p className="text-gray-600">Virtual and physical cards with advanced security features</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image src="/mobile.jpg" fill style={{ objectFit: "cover" }} alt="Mobile Banking" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Mobile Banking</h3>
                <p className="text-gray-600">Complete financial control from your smartphone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EcoFinX Features - Bento Grid */}
      <section className="w-full py-16 bg-green-900 text-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-2">There's a lot to love</h2>
          <h3 className="text-4xl font-bold text-yellow-300 mb-12">about EcoFinX</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-800 p-6 rounded-xl hover:bg-green-700 transition-colors">
              <div className="text-xs uppercase tracking-wide mb-2">Cyber Security</div>
              <h3 className="text-xl font-bold mb-4">Advanced Security</h3>
              <p className="text-sm text-gray-300">Bank-grade encryption and multi-factor authentication keep your data safe</p>
            </div>

            <div className="bg-green-800 p-6 rounded-xl hover:bg-green-700 transition-colors">
              <div className="text-xs uppercase tracking-wide mb-2">App Development</div>
              <h3 className="text-xl font-bold mb-4">Obvious Practices</h3>
              <p className="text-sm text-gray-300">Intuitive interface designed with user experience as a priority</p>
            </div>

            <div className="bg-green-800 p-6 rounded-xl hover:bg-green-700 transition-colors">
              <div className="text-xs uppercase tracking-wide mb-2">AI Chatbot</div>
              <h3 className="text-xl font-bold mb-4">Financial Assistant</h3>
              <p className="text-sm text-gray-300">24/7 AI support to answer questions and provide financial insights</p>
            </div>

            <div className="bg-green-800 p-6 rounded-xl hover:bg-green-700 transition-colors">
              <div className="text-xs uppercase tracking-wide mb-2">Eco Friendly</div>
              <h3 className="text-xl font-bold mb-4">Sustainable Finance</h3>
              <p className="text-sm text-gray-300">Track the environmental impact of your spending and investments</p>
        </div>
      </div>

          <div className="flex justify-between mt-8">
            <button className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* AI Chatbot and Dashboard Section */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                AI-Powered Support
              </div>
              <h2 className="text-4xl font-bold tracking-tighter">Get Instant Financial Insights</h2>
              <p className="text-xl text-gray-600">
                Our AI chatbot analyzes your spending patterns, suggests saving opportunities, and answers your financial questions in real-time.
              </p>
              <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
                <div className="flex flex-col space-y-3">
                  <div className="bg-white p-3 rounded-lg self-start max-w-[80%] shadow-sm">
                    <p className="text-sm">How can I improve my credit score?</p>
                  </div>
                  <div className="bg-blue-600 p-3 rounded-lg text-white self-end max-w-[80%] shadow-sm">
                    <p className="text-sm">Based on your spending history, I recommend paying down your credit card balances to below 30% of your limit. This could improve your score by approximately 15-20 points within 60 days.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg self-start max-w-[80%] shadow-sm">
                    <p className="text-sm">Can you analyze my subscription services?</p>
                  </div>
                </div>
                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Ask about your finances..."
                    className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
              <Button size="lg" className="mt-4">
                Chat with Financial AI
            </Button>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                Smart Dashboard
              </div>
              <h2 className="text-4xl font-bold tracking-tighter">Visualize Your Financial Health</h2>
              <p className="text-xl text-gray-600">
                Our intuitive dashboard gives you a complete overview of your accounts, spending patterns, and financial goals.
              </p>
              <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
                <div className="bg-gray-50 p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Financial Overview</h3>
                    <div className="text-sm text-gray-500">Last updated: Today</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Total Balance</div>
                      <div className="text-2xl font-bold text-blue-600">$24,562</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +2.5%
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Income</div>
                      <div className="text-2xl font-bold text-green-600">$4,652</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +12%
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Expenses</div>
                      <div className="text-2xl font-bold text-red-600">$2,345</div>
                      <div className="text-xs text-red-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                          <polyline points="17 18 23 18 23 12"></polyline>
                        </svg>
                        -5%
                      </div>
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    {/* Placeholder for chart */}
                    <div className="text-gray-400 text-sm">Spending Trends Chart</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Housing</span>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Food</span>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Transportation</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-4">
                View Full Dashboard
            </Button>
            </div>
          </div>
        </div>
    </section>
    </>
  );
};

export default HeroSection;
