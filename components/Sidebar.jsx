"use client";

import { UserButton } from "@clerk/nextjs";
import {
  LayoutGrid,
  PiggyBank,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Settings,
  PieChart,
  CreditCard,
  Bell,
  HelpCircle,
  Leaf,
  SparkleIcon,
  HelpingHandIcon,
  TrendingUp,
  LineChart,
  BarChart4,
  Wallet,
  Activity
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function SidebarDemo({ onCollapseChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange && mounted) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange, mounted]);
  
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Transactions",
      icon: CreditCard,
      path: "/transaction/create",
      badge: "3",
    },
    {
      id: 3,
      name: "Carbon Tracker",
      icon: Leaf,
      path: "/tracker",
    },
    {
      id: 4,
      name: "Analytics",
      icon: BarChart4,
      path: "/analytics",
    },
    {
      id: 5,
      name: "Investments",
      icon: TrendingUp,
      path: "/investments",
    },
    {
      id: 6,
      name: "Budgets",
      icon: PiggyBank,
      path: "/budgets",
    },
    {
      id: 7,
      name: "Finance AI",
      icon: SparkleIcon,
      path: "/chatbot",
      badge: "New",
    },
    {
      id: 8,
      name: "Support",
      icon: HelpingHandIcon,
      path: "/support",
    },
  ];

  const bottomMenu = [
    {
      id: 1,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
    {
      id: 2,
      name: "Help Center",
      icon: HelpCircle,
      path: "/dashboard/help",
    },
    {
      id: 3,
      name: "Upgrade to Pro",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
      isPro: true,
    },
  ];

  const path = usePathname();

  return (
    <div 
      className={`fixed left-0 top-0 h-screen transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shadow-sm z-50 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo Section */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 14.5C5 16.5 9 18.5 11 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.5 9.5C19 7.5 15 5.5 13 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.5 6C8.34375 6.5 7.5 7.95625 7.5 9.5C7.5 11.0438 8.34375 12.5 9.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 18C15.6562 17.5 16.5 16.0438 16.5 14.5C16.5 12.9562 15.6562 11.5 14.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">EcoFinX</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Financial Insights</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className={`h-4 w-4 text-slate-500 dark:text-slate-400 ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pt-4">
        <div className="px-4 pb-4">
          {!collapsed && (
            <div className="mb-3 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Main Menu</p>
            </div>
          )}

          <div className="space-y-1">
            {menuList.slice(0, 6).map((menu) => (
              <Link href={menu.path} key={menu.id} className="block">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-3 cursor-pointer group transition-all
                    ${path === menu.path 
                      ? "bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${collapsed ? "mx-auto" : ""}`}>
                      <menu.icon className={`h-5 w-5 ${path === menu.path ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                    </div>
                    {!collapsed && <span className="text-sm font-medium">{menu.name}</span>}
                  </div>
                  
                  {!collapsed && menu.badge && (
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      menu.badge === 'New' 
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    }`}>
                      {menu.badge}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {!collapsed && (
            <div className="mt-8 mb-3 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tools</p>
            </div>
          )}

          <div className="space-y-1">
            {menuList.slice(6).map((menu) => (
              <Link href={menu.path} key={menu.id} className="block">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-3 cursor-pointer group transition-all
                    ${path === menu.path 
                      ? "bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${collapsed ? "mx-auto" : ""}`}>
                      <menu.icon className={`h-5 w-5 ${path === menu.path ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                    </div>
                    {!collapsed && <span className="text-sm font-medium">{menu.name}</span>}
                  </div>
                  
                  {!collapsed && menu.badge && (
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      menu.badge === 'New' 
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    }`}>
                      {menu.badge}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {!collapsed && (
            <div className="mt-8 mb-3 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Settings</p>
            </div>
          )}

          <div className="space-y-1">
            {bottomMenu.map((menu) => (
              <Link href={menu.path} key={menu.id} className="block">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-3 cursor-pointer group transition-all
                    ${menu.isPro 
                      ? "bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20" 
                      : ""
                    }
                    ${path === menu.path 
                      ? "bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${collapsed ? "mx-auto" : ""}`}>
                      <menu.icon className={`h-5 w-5 ${
                        menu.isPro 
                          ? "text-blue-600 dark:text-blue-400" 
                          : path === menu.path 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                      }`} />
                    </div>
                    {!collapsed && <span className={`text-sm font-medium ${menu.isPro ? "text-blue-600 dark:text-blue-400" : ""}`}>{menu.name}</span>}
                  </div>
                  
                  {!collapsed && menu.isPro && (
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Snapshot Card
      {!collapsed && (
        <div className="mx-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 shadow-xl shadow-blue-500/10">
          <div className="flex flex-col text-white">
            <h4 className="text-sm font-medium mb-1">Market Snapshot</h4>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-medium">S&P 500</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-100">
                <span className="text-xs font-bold">5,321.25</span>
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+1.2%</span>
              </div>
            </div>
            
            <div className="mt-3 h-12">
              <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                <path 
                  d="M0,10 L5,12 L10,8 L15,14 L20,11 L25,13 L30,9 L35,12 L40,10 L45,15 L50,8 L55,10 L60,12 L65,9 L70,11 L75,7 L80,13 L85,10 L90,8 L95,11 L100,9"
                  fill="none" 
                  stroke="rgba(255,255,255,0.5)" 
                  strokeWidth="1" 
                />
              </svg>
            </div>
            
            <button className="mt-2 text-xs font-medium text-white hover:text-emerald-100 flex items-center justify-center">
              <span>View Full Report</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      )} */}

      {/* User Profile */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className={`${collapsed ? "mx-auto" : ""}`}>
            <UserButton />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Priyadharshan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">priyan@example.com</p>
            </div>
          )}
          {!collapsed && (
            <button className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
              <LogOut className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarDemo;