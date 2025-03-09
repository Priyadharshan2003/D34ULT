"use client";

import SidebarDemo from "@/components/Sidebar";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handler for sidebar collapse state
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Only render sidebar on client side to avoid hydration errors
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar component */}
      <SidebarDemo onCollapseChange={handleSidebarCollapse} />
      
      {/* Main content area with dynamic margin based on sidebar state */}
      <main className={`flex-1 p-6 transition-all duration-300 ${
        sidebarCollapsed ? "ml-20" : "ml-72"
      }`}>
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;