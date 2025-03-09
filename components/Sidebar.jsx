"use client";

import { UserButton } from "@clerk/nextjs";
import {
  CircleDollarSign,
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Settings,
  PieChart,
  CreditCard,
  Bell,
  HelpCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  
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
      path: "/dashboard/transactions",
      badge: 12,
    },
    {
      id: 3,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 6,
      name: "Analytics",
      icon: PieChart,
      path: "/dashboard/analytics",
      badge: "New",
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
      name: "Help & Support",
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
      className={`h-screen transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col ₹{
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 14.5C5 16.5 9 18.5 11 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.5 9.5C19 7.5 15 5.5 13 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.5 6C8.34375 6.5 7.5 7.95625 7.5 9.5C7.5 11.0438 8.34375 12.5 9.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 18C15.6562 17.5 16.5 16.0438 16.5 14.5C16.5 12.9562 15.6562 11.5 14.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">Fintrack</span>
            </div>
          )}
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="ml-2 h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(true)}
              className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-slate-500 dark:text-slate-400 rotate-180" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pt-2">
        <div className="px-4 pb-2">
          {!collapsed && (
            <div className="mb-4 px-3">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">MENU</p>
            </div>
          )}

          <div className="space-y-1.5">
            {menuList.map((menu) => (
              <Link href={menu.path} key={menu.id} className="block">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer group transition-colors
                    ₹{path === menu.path 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`₹{collapsed ? "mx-auto" : ""}`}>
                      <menu.icon className={`h-5 w-5 ₹{path === menu.path ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
                    </div>
                    {!collapsed && <span className="text-sm">{menu.name}</span>}
                  </div>
                  
                  {!collapsed && menu.badge && (
                    <div className={`px-2 py-0.5 rounded-full text-xs ₹{
                      typeof menu.badge === 'string' 
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
            <div className="mt-8 mb-4 px-3">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">SETTINGS</p>
            </div>
          )}

          <div className="space-y-1.5 mt-4">
            {bottomMenu.map((menu) => (
              <Link href={menu.path} key={menu.id} className="block">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer group transition-colors
                    ₹{menu.isPro 
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" 
                      : ""
                    }
                    ₹{path === menu.path 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`₹{collapsed ? "mx-auto" : ""}`}>
                      <menu.icon className={`h-5 w-5 ₹{
                        menu.isPro 
                          ? "text-indigo-600 dark:text-indigo-400" 
                          : path === menu.path 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                      }`} />
                    </div>
                    {!collapsed && <span className={`text-sm ₹{menu.isPro ? "text-indigo-600 dark:text-indigo-400 font-medium" : ""}`}>{menu.name}</span>}
                  </div>
                  
                  {!collapsed && menu.isPro && (
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
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

      {/* Alert/Notification Banner */}
      {!collapsed && (
        <div className="mx-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">Activity Alert</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Your monthly report is ready to view</p>
              <button className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                View Report →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <UserButton />
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