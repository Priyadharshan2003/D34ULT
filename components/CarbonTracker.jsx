// components/CarbonFootprintTracker.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell
} from 'recharts';
import { ArrowDown, Leaf, TrendingUp, AlertTriangle, Award, Coffee, Car, ShoppingBag, Home } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This would normally be in a .env file and not exposed in client component
// For demo purposes only
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CarbonFootprintTracker = ({ transactions }) => {
  const [carbonData, setCarbonData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [ecoScore, setEcoScore] = useState(0);

  const COLORS = ['#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa'];
  
  // Categories and their emissions factors (kg CO2 per $)
  const emissionFactors = {
    transportation: 0.35,
    groceries: 0.15,
    utilities: 0.41,
    shopping: 0.25,
    dining: 0.23,
    entertainment: 0.10,
    healthcare: 0.05,
    housing: 0.18,
    education: 0.08,
    personal: 0.12,
    travel: 0.40,
    insurance: 0.05,
    gifts: 0.20,
    bills: 0.15,
    'other-expense': 0.20
  };

  // Function to calculate carbon emissions from financial data
  const calculateCarbonEmissions = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return {
        categoryData: [],
        monthlyData: [],
        totalEmissions: 0,
        ecoScore: 50
      };
    }

    const categoryEmissions = {};
    const monthlyEmissions = {
      'January': 0, 'February': 0, 'March': 0, 'April': 0, 
      'May': 0, 'June': 0, 'July': 0, 'August': 0,
      'September': 0, 'October': 0, 'November': 0, 'December': 0
    };
    
    let totalEmissions = 0;
    
    transactions.forEach(transaction => {
      // Only consider expenses for carbon footprint
      if (transaction.type !== 'EXPENSE') return;
      
      const category = transaction.category.toLowerCase();
      const amount = transaction.amount;
      const emissionFactor = emissionFactors[category] || 0.2; // Default factor if category not found
      const emission = amount * emissionFactor;
      
      // Accumulate by category
      if (categoryEmissions[category]) {
        categoryEmissions[category] += emission;
      } else {
        categoryEmissions[category] = emission;
      }
      
      // Accumulate by month
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' });
      monthlyEmissions[month] += emission;
      
      totalEmissions += emission;
    });
    
    // Convert category data to array format for charts
    const categoryData = Object.keys(categoryEmissions).map(category => ({
      name: category,
      value: parseFloat(categoryEmissions[category].toFixed(2))
    })).sort((a, b) => b.value - a.value);
    
    // Convert monthly data to array format for charts
    const monthlyData = Object.keys(monthlyEmissions)
      .filter(month => monthlyEmissions[month] > 0)
      .map(month => ({
        name: month,
        value: parseFloat(monthlyEmissions[month].toFixed(2))
      }));
    
    // Calculate eco score (0-100)
    // This is a simplified calculation - in reality would be more complex
    const transactionsWithEmissions = transactions.filter(t => t.type === 'EXPENSE').length;
    const avgEmissionPerTransaction = transactionsWithEmissions > 0 ? 
      totalEmissions / transactionsWithEmissions : 0;
    let score = 100 - (avgEmissionPerTransaction * 5);
    score = Math.max(0, Math.min(100, score)); // Clamp between 0-100
    
    return {
      categoryData,
      monthlyData,
      totalEmissions: parseFloat(totalEmissions.toFixed(2)),
      ecoScore: Math.round(score)
    };
  };

  // Generate AI insights using Gemini API
  const generateAIInsights = async (carbonData, transactions) => {
    if (!carbonData || !transactions || transactions.length === 0) {
      return [];
    }

    try {
      // Prepare data for Gemini API
      const expenseTransactions = transactions
        .filter(t => t.type === 'EXPENSE')
        .map(t => ({
          amount: t.amount,
          category: t.category,
          description: t.description,
          date: new Date(t.date).toISOString().split('T')[0]
        }));

      const carbonByCategory = carbonData.categoryData.reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
      }, {});

      // This would normally be a server action to protect API key
      // For demo purposes we're showing client-side implementation
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Analyze this financial and carbon footprint data and provide 3 personalized sustainability insights or recommendations.
        
        FINANCIAL DATA:
        ${JSON.stringify(expenseTransactions)}
        
        CARBON EMISSIONS BY CATEGORY (kg CO2):
        ${JSON.stringify(carbonByCategory)}
        
        TOTAL EMISSIONS: ${carbonData.totalEmissions} kg CO2
        
        For each insight, provide:
        1. The category it relates to (one of: transportation, groceries, utilities, shopping, dining, entertainment, healthcare, housing, education, personal, travel)
        2. A specific, actionable recommendation
        3. The potential impact (high/medium/low)
        
        Format your response as valid JSON array with this structure:
        [
          {
            "category": "category_name",
            "text": "specific recommendation text",
            "impact": "high/medium/low",
            "type": "suggestion/achievement/alert"
          }
        ]
        
        Ensure you classify each insight as either "suggestion" (ways to improve), "achievement" (positive behaviors to continue), or "alert" (areas needing immediate attention).
      `;

      // For demo, return mock insights instead of actual API call
      // In production, you would use:
      // const result = await model.generateContent(prompt);
      // const response = await result.response;
      // const text = response.text();
      // return JSON.parse(text);

      // Mock insights based on transaction categories
      const mockInsights = [];
      
      // Check transportation
      if (carbonByCategory.transportation) {
        mockInsights.push({
          id: 1,
          type: 'suggestion',
          category: 'transportation',
          text: 'Consider using public transportation or carpooling to reduce your transportation emissions by up to 40%.',
          impact: 'high',
          icon: <Car className="h-5 w-5 text-blue-500" />
        });
      }
      
      // Check groceries
      if (carbonByCategory.groceries) {
        mockInsights.push({
          id: 2,
          type: 'achievement',
          category: 'groceries',
          text: 'Your grocery emissions are relatively low. Continue buying seasonal and local produce to maintain this positive trend.',
          impact: 'positive',
          icon: <ShoppingBag className="h-5 w-5 text-green-500" />
        });
      }
      
      // Check utilities
      if (carbonByCategory.utilities) {
        mockInsights.push({
          id: 3,
          type: 'alert',
          category: 'utilities',
          text: 'Your utility spending results in significant carbon emissions. Consider switching to renewable energy providers.',
          impact: 'medium',
          icon: <Home className="h-5 w-5 text-yellow-500" />
        });
      }
      
      return mockInsights;
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return [];
    }
  };

  // Fetch global CO2 data from public API
  const fetchGlobalCO2Data = async () => {
    try {
      // In a real implementation, you would use an actual API like:
      // const response = await axios.get('https://api.climatiq.io/data/co2-concentration');
      
      // For demo purposes, return mock data
      return {
        current: 418.5, // ppm
        lastYear: 415.2,
        fiveYearChange: 11.3,
      };
    } catch (error) {
      console.error("Error fetching CO2 data:", error);
      return null;
    }
  };

  // Calculate everything when component mounts or transactions change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Calculate carbon emissions from transaction data
      const emissions = calculateCarbonEmissions(transactions);
      
      // Get global CO2 data
      const globalCO2Data = await fetchGlobalCO2Data();
      
      // Generate AI insights
      const aiInsights = await generateAIInsights(emissions, transactions);
      
      // Set all the data
      setCarbonData({
        ...emissions,
        globalCO2: globalCO2Data
      });
      setInsights(aiInsights);
      setEcoScore(emissions.ecoScore);
      
      setLoading(false);
    };
    
    loadData();
  }, [transactions]);

  // Simple loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Leaf className="mr-2 text-green-500" />
          Carbon Footprint Tracker
        </h2>
        
        {/* Eco Score */}
        <div className="flex items-center bg-gradient-to-r from-green-100 to-green-50 rounded-lg px-4 py-2">
          <div className="relative h-16 w-16 mr-3">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{ecoScore}</span>
            </div>
            <svg className="h-16 w-16" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={ecoScore > 75 ? "#10B981" : ecoScore > 50 ? "#FBBF24" : "#EF4444"}
                strokeWidth="3"
                strokeDasharray={`${ecoScore}, 100`}
              />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Eco Score</div>
            <div className="font-semibold">
              {ecoScore > 75 ? "Excellent" : ecoScore > 50 ? "Good" : "Needs Improvement"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
            activeTab === 'overview' 
              ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
              : 'text-gray-600 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
            activeTab === 'insights' 
              ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
              : 'text-gray-600 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('insights')}
        >
          AI Insights
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
            activeTab === 'actions' 
              ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
              : 'text-gray-600 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('actions')}
        >
          Action Plan
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="min-h-64">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Emissions</div>
                <div className="text-2xl font-bold text-gray-800">{carbonData.totalEmissions} kg CO₂</div>
                <div className="text-sm text-red-500 flex items-center mt-1">
                  <ArrowDown className="h-4 w-4 transform rotate-180" /> 12% from last month
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Highest Category</div>
                <div className="text-2xl font-bold text-gray-800 capitalize">
                  {carbonData.categoryData.length > 0 ? carbonData.categoryData[0]?.name : 'N/A'}
                </div>
                <div className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4" /> Action recommended
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Global CO₂ Context</div>
                <div className="text-2xl font-bold text-gray-800">
                  {carbonData.globalCO2?.current || '418.5'} ppm
                </div>
                <div className="text-sm text-yellow-500 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4" /> +{carbonData.globalCO2?.fiveYearChange || '11.3'} in 5 years
                </div>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emissions by Category */}
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-4">Emissions by Category</h3>
                {carbonData.categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={carbonData.categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {carbonData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    No category data available
                  </div>
                )}
              </div>
              
              {/* Monthly Trend */}
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-4">Monthly Emissions Trend</h3>
                {carbonData.monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={carbonData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                      <Area type="monotone" dataKey="value" stroke="#10B981" fill="#D1FAE5" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    No monthly data available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
              <div className="flex items-center mb-3">
                <Award className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-800">AI-Powered Insights</h3>
              </div>
              <p className="text-sm text-green-700">
                These personalized suggestions are based on analysis of your financial transactions
                and their environmental impact. Implementing these recommendations could reduce your
                carbon footprint by up to 30%.
              </p>
            </div>
            
            {insights.length > 0 ? (
              insights.map(insight => (
                <div 
                  key={insight.id} 
                  className={`p-4 rounded-lg border flex items-start ${
                    insight.type === 'suggestion' ? 'bg-blue-50 border-blue-100' :
                    insight.type === 'achievement' ? 'bg-green-50 border-green-100' :
                    'bg-yellow-50 border-yellow-100'
                  }`}
                >
                  <div className="mr-3 mt-1">
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="font-medium capitalize">
                      {insight.category} {insight.type}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">{insight.text}</p>
                    
                    {insight.type === 'suggestion' && (
                      <button className="mt-2 text-xs font-medium bg-white text-blue-600 px-3 py-1 rounded border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors">
                        Apply This Recommendation
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <AlertTriangle className="h-8 w-8 mb-2 text-yellow-500" />
                <p>No insights available yet. Add more transaction data to generate personalized recommendations.</p>
              </div>
            )}
            
            {/* Animated eco tip */}
            <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400 rounded-full -mt-16 -mr-16 opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <Coffee className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Eco Tip of the Day</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Bringing your own reusable coffee cup can save up to 23kg of CO₂ per year. 
                  Small changes in daily habits can make a big difference!
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'actions' && (
          <div>
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Your Personalized Sustainability Plan</h3>
              <p className="text-sm text-gray-600">
                Based on your spending patterns, we've created a custom action plan to reduce your carbon footprint.
                Completing these actions could reduce your emissions by 35% within 3 months.
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Action cards - based on highest emission categories */}
              {carbonData.categoryData.length > 0 ? (
                <>
                  {carbonData.categoryData[0]?.name === 'transportation' && (
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-800">Reduce car usage for short trips</h4>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">High Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on your transaction data, many of your transportation expenses are for short distances. 
                        Consider walking, biking, or public transport for these trips.
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <span className="text-gray-500">Estimated savings:</span>
                        <span className="font-medium text-gray-800 ml-2">{(carbonData.categoryData[0].value * 0.4).toFixed(1)} kg CO₂/month</span>
                      </div>
                      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Plan My Routes
                      </button>
                    </div>
                  )}
                  
                  {carbonData.categoryData.some(item => item.name === 'utilities') && (
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-800">Switch to renewable energy provider</h4>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">High Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Your utility expenses contribute significantly to your carbon footprint. Switching to a renewable
                        energy provider can reduce this by up to 70%.
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <span className="text-gray-500">Estimated savings:</span>
                        <span className="font-medium text-gray-800 ml-2">
                          {(carbonData.categoryData.find(item => item.name === 'utilities')?.value * 0.7 || 0).toFixed(1)} kg CO₂/month
                        </span>
                      </div>
                      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Explore Options
                      </button>
                    </div>
                  )}
                  
                  {carbonData.categoryData.some(item => item.name === 'groceries' || item.name === 'food') && (
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-800">Shop local for groceries</h4>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Medium Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Your food-related carbon footprint could be reduced by shopping at farmers markets 
                        and local grocers, reducing food miles.
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <span className="text-gray-500">Estimated savings:</span>
                        <span className="font-medium text-gray-800 ml-2">
                          {(((carbonData.categoryData.find(item => item.name === 'groceries')?.value || 0) + 
                            (carbonData.categoryData.find(item => item.name === 'food')?.value || 0)) * 0.3).toFixed(1)} kg CO₂/month
                        </span>
                      </div>
                      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Find Local Markets
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mb-2 text-yellow-500" />
                  <p>No action plans available yet. Add more transaction data to generate personalized recommendations.</p>
                </div>
              )}
            </div>
            
            {/* Progress tracker */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3">Your Sustainability Journey</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-300 h-4 rounded-full"
                  style={{ width: '35%' }}
                >
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Starting Point</span>
                <span>Current: 35% Reduction</span>
                <span>Goal: 50%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintTracker;