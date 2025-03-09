"use client"
import React, { useState, useEffect } from 'react';

// Main Dashboard Component
function CO2FinTechDashboard() {
  // State management
  const [userData, setUserData] = useState({
    transactions: [],
    carbonFootprint: { total: 0, categories: {} },
    monthlyTrends: [],
    aiInsights: [],
    goals: { current: 0, target: 100 }
  });
  
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Simulate API call to fetch user data
  const fetchUserData = () => {
    setIsLoading(true);
    
    // Mock data - in a real application, this would be an API call
    setTimeout(() => {
      const mockData = generateMockData(timeRange);
      setUserData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  // Generate mock data based on time range
  const generateMockData = (range) => {
    // Categories for transactions
    const categories = ['Transport', 'Food', 'Shopping', 'Utilities', 'Entertainment'];
    
    // Generate random transactions
    const transactions = Array(30).fill().map((_, i) => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const amount = Math.floor(Math.random() * 200) + 10;
      const co2Impact = (amount * (Math.random() * 0.5 + 0.1)).toFixed(2);
      
      return {
        id: i,
        date: new Date(2025, 2, i + 1).toISOString(),
        merchant: `${category} Provider ${Math.floor(Math.random() * 10) + 1}`,
        category,
        amount,
        co2Impact: parseFloat(co2Impact)
      };
    });

    // Calculate total carbon footprint and by category
    const carbonFootprint = transactions.reduce((acc, transaction) => {
      acc.total += transaction.co2Impact;
      
      if (!acc.categories[transaction.category]) {
        acc.categories[transaction.category] = 0;
      }
      
      acc.categories[transaction.category] += transaction.co2Impact;
      
      return acc;
    }, { total: 0, categories: {} });

    // Generate monthly trends
    const monthlyTrends = Array(6).fill().map((_, i) => {
      const month = new Date(2025, 2 - i, 1);
      return {
        month: month.toLocaleString('default', { month: 'short' }),
        co2: Math.floor(Math.random() * 500) + 200
      };
    }).reverse();

    // Generate AI insights
    const insights = [
      "Your carbon footprint from ride-sharing services increased by 15% this month.",
      "Switching to local grocery stores could reduce your food-related emissions by 20%.",
      "Your recent online shopping resulted in higher transport emissions due to multiple deliveries.",
      "You're in the top 30% of eco-friendly users in your region.",
      "Consider consolidating your online purchases to reduce delivery emissions."
    ];

    const selectedInsights = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * insights.length);
      selectedInsights.push(insights[randomIndex]);
      insights.splice(randomIndex, 1);
    }

    // Goal progress
    const goalProgress = {
      current: Math.floor(carbonFootprint.total),
      target: Math.floor(carbonFootprint.total * 0.8) // Target is 20% reduction
    };

    return {
      transactions,
      carbonFootprint,
      monthlyTrends,
      aiInsights: selectedInsights,
      goals: goalProgress
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">CO₂ Impact Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </button>
              </div>
              <button
                className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center"
                onClick={fetchUserData}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <CarbonSummaryCard carbon={userData.carbonFootprint.total} />
              <GoalProgressCard goals={userData.goals} />
              <AIInsightCard insights={userData.aiInsights[0]} />
            </div>

            <div className="bg-white rounded-lg shadow mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'transactions'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('transactions')}
                  >
                    Transactions
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'insights'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('insights')}
                  >
                    AI Insights
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && <OverviewTab userData={userData} />}
                {activeTab === 'transactions' && <TransactionsTab transactions={userData.transactions} />}
                {activeTab === 'insights' && <InsightsTab insights={userData.aiInsights} />}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Tips to Reduce Your Carbon Footprint</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TipCard 
                    title="Consolidate Online Orders" 
                    description="Try to bundle your online purchases to reduce delivery trips and packaging waste."
                  />
                  <TipCard 
                    title="Local Food Choices" 
                    description="Buying locally produced food can significantly reduce transportation emissions."
                  />
                  <TipCard 
                    title="Public Transportation" 
                    description="Using public transit once a week can reduce your transport emissions by up to 10%."
                  />
                  <TipCard 
                    title="Digital Statements" 
                    description="Switch to paperless statements for all your financial services."
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ userData }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Carbon Footprint by Category</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {Object.entries(userData.carbonFootprint.categories).map(([category, amount]) => (
              <div key={category} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-600">{category}</span>
                  <span className="text-sm font-medium text-gray-900">{amount.toFixed(2)} kg CO₂</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(amount / userData.carbonFootprint.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
          <div className="bg-gray-50 p-4 rounded-lg h-64">
            <div className="flex h-48 items-end space-x-2">
              {userData.monthlyTrends.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-green-400 rounded-t"
                    style={{ 
                      height: `${(data.co2 / Math.max(...userData.monthlyTrends.map(d => d.co2))) * 100}%`,
                      minHeight: '10%'
                    }}
                  ></div>
                  <div className="text-xs mt-2 text-gray-600">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Transactions Tab Component
function TransactionsTab({ transactions }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Impact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.merchant}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.co2Impact > 20 
                      ? 'bg-red-100 text-red-800' 
                      : transaction.co2Impact > 10 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {transaction.co2Impact.toFixed(2)} kg
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Insights Tab Component
function InsightsTab({ insights }) {
  return (
    <div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">{insight}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered Recommendations</h3>
          <p className="text-sm text-gray-600 mb-4">
            Based on your transaction patterns, here are personalized recommendations to reduce your carbon footprint:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
              <span className="ml-2 text-sm text-gray-600">Set a budget for online shopping to reduce frequent deliveries</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
              <span className="ml-2 text-sm text-gray-600">Consider walking or cycling for trips under 2 miles</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
              <span className="ml-2 text-sm text-gray-600">Try meat-free meals once a week to reduce food emissions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Card Components
function CarbonSummaryCard({ carbon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium text-gray-900">Total Carbon Footprint</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{carbon.toFixed(2)} kg</p>
            <p className="ml-2 text-sm text-gray-600">CO₂ equivalent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalProgressCard({ goals }) {
  const progressPercentage = Math.min(100, Math.round((goals.current / goals.target) * 100));
  const remaining = Math.max(0, goals.target - goals.current);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">Carbon Reduction Goal</h3>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${progressPercentage >= 100 ? 'bg-green-600' : 'bg-blue-600'}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {remaining > 0 
            ? `${remaining.toFixed(2)} kg remaining to reach your target`
            : 'Youve reached your carbon reduction goal!'}
        </p>
      </div>
    </div>
  );
}

function AIInsightCard({ insights }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 p-1 bg-blue-100 rounded-full">
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="ml-2 text-lg font-medium text-gray-900">AI Insight</h3>
      </div>
      <p className="text-sm text-gray-600">{insights}</p>
    </div>
  );
}

function TipCard({ title, description }) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-green-800 mb-1">{title}</h4>
      <p className="text-xs text-green-700">{description}</p>
    </div>
  );
}

export default CO2FinTechDashboard;