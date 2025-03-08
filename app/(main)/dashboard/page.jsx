"use client"
import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Plus, TrendingUp, TrendingDown, DollarSign, Leaf, 
  BarChart2, CreditCard, AlertTriangle, Award, Activity
} from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

// Demo data
const creditScoreData = [
  { name: 'Jan', score: 720 },
  { name: 'Feb', score: 732 },
  { name: 'Mar', score: 745 },
  { name: 'Apr', score: 739 },
  { name: 'May', score: 752 },
  { name: 'Jun', score: 780 },
  { name: 'Jul', score: 803 },
];


const spendingByCategory = [
  { name: 'Housing', value: 35 },
  { name: 'Food', value: 20 },
  { name: 'Transport', value: 15 },
  { name: 'Entertainment', value: 10 },
  { name: 'Shopping', value: 12 },
  { name: 'Other', value: 8 },
];

const categoryColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C', '#8884d8'];

const co2EmissionsData = [
  { name: 'Jan', value: 152 },
  { name: 'Feb', value: 143 },
  { name: 'Mar', value: 137 },
  { name: 'Apr', value: 129 },
  { name: 'May', value: 118 },
  { name: 'Jun', value: 108 },
  { name: 'Jul', value: 95 },
];

const transactionActivity = [
  { date: 'Jul 1', amount: 250 },
  { date: 'Jul 3', amount: -75 },
  { date: 'Jul 5', amount: -120 },
  { date: 'Jul 8', amount: 1200 },
  { date: 'Jul 10', amount: -340 },
  { date: 'Jul 13', amount: -55 },
  { date: 'Jul 15', amount: -210 },
];

const DemoComponent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate the data from your server functions
  const accounts = [
    { id: 1, name: 'Main Checking', balance: 4280.42, type: 'checking', isDefault: true },
    { id: 2, name: 'Savings', balance: 12750.89, type: 'savings' },
    { id: 3, name: 'Investment', balance: 32154.67, type: 'investment' }
  ];
  
  const budgetData = { budget: 3500, currentExpenses: 2350 };
  
  // CO2 Score calculation (for demo purposes)
  const co2Score = 84;
  const co2Reduction = 12;

  return (
    <div className="space-y-8">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap mb-6 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
        {['overview', 'transactions', 'sustainability', 'analytics'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all 
            ${activeTab === tab 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credit Score Card */}
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              Credit Score
            </CardTitle>
            <CardDescription>Your credit health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">803</span>
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +23 pts
              </div>
            </div>
            
            <div className="h-36 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={creditScoreData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ fill: "#4F46E5", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Progress Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-emerald-600" />
              Budget Progress
            </CardTitle>
            <CardDescription>Monthly spending tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                ${budgetData.currentExpenses.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">
                of ${budgetData.budget.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mt-4">
              <div 
                className="h-full rounded-full bg-emerald-500" 
                style={{ width: `${(budgetData.currentExpenses / budgetData.budget) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">
                {Math.round((budgetData.currentExpenses / budgetData.budget) * 100)}% Used
              </span>
              <span className="text-gray-500">
                ${(budgetData.budget - budgetData.currentExpenses).toLocaleString()} Left
              </span>
            </div>
            
            <div className="h-28 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingByCategory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/40 dark:to-lime-900/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              CO₂ Footprint
            </CardTitle>
            <CardDescription>Your financial sustainability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">{co2Score}</span>
              <div className="text-sm font-medium">
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -{co2Reduction}% CO₂
                </div>
                <span className="text-gray-500">vs. last month</span>
              </div>
            </div>
            
            <div className="relative pt-1 mt-4">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Eco-Friendly
                  </span>
                </div>
              </div>
              <div className="h-3 flex rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-green-600" 
                  style={{ width: `${co2Score}%` }}
                ></div>
              </div>
            </div>
            
            <div className="h-28 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={co2EmissionsData}>
                  <defs>
                    <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#22C55E" fillOpacity={1} fill="url(#co2Gradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Activity */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Transaction Activity
            </CardTitle>
            <CardDescription>Recent financial movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionActivity}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8B5CF6" 
                    fill="url(#incomeGradient)" 
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spending by Category */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Spending Categories
            </CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          Your Accounts
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full py-8">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium">Add New Account</p>
                <p className="text-xs text-gray-500 mt-1">Connect bank or add manually</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          
          {accounts.length > 0 &&
            accounts?.map((account) => (
              <Card key={account.id} className="border-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/60 dark:to-blue-900/30 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium">{account.name}</h3>
                      <p className="text-xs text-gray-500 uppercase">{account.type}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-800/50">
                      <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <span className="text-xs text-gray-500">Available Balance</span>
                    <div className="text-2xl font-bold mt-1">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {account.isDefault && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                            Default
                          </span>
                        )}
                      </span>
                      <div className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline cursor-pointer">
                        View Details
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      
      {/* Sustainable Investment Opportunity Card */}
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20">
        <div className="p-6 md:p-8 md:flex items-center gap-8">
          <div className="md:flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">ECO-FRIENDLY OPPORTUNITY</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Green Investment Portfolio</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Invest in sustainable companies with 12% higher returns than standard portfolios, while reducing your carbon footprint.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-white dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                Low Minimum
              </span>
              <span className="px-3 py-1 bg-white dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                ESG Certified
              </span>
              <span className="px-3 py-1 bg-white dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                Carbon Negative
              </span>
            </div>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
              Learn More
            </button>
          </div>
          <div className="hidden md:block md:w-1/3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={co2EmissionsData}>
                <defs>
                  <linearGradient id="greenInvestmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DemoComponent;