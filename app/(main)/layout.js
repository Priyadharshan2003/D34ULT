"use client";
import SidebarDemo from "@/components/Sidebar";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render sidebar on client side to avoid hydration errors
  if (!isMounted) {
    return (
      <div className="container mx-auto my-32">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar component */}
      <SidebarDemo className="sticky"/>
      
      {/* Main content area with container and margin */}
      <div className="flex-1 transition-all duration-300 max-w-7xl">
        <div className="container mx-auto my-8 md:my-16 px-4 md:px-6">
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;