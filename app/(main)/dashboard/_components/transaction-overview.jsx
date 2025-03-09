"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp, Filter, Info } from "lucide-react";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  AreaChart, 
  Area, 
  XAxis, 
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#F43F5E", // Rose
  "#10B981", // Emerald
  "#06B6D4", // Cyan
  "#3B82F6", // Blue
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [timeframe, setTimeframe] = useState("month");

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Calculate total income and expenses
  const totalIncome = accountTransactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = accountTransactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpense;
  const netPercentage = totalIncome > 0 
    ? ((netAmount / totalIncome) * 100).toFixed(1) 
    : "0.0";

  // Create spending trend data (simplified)
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    
    const dayTransactions = accountTransactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.toDateString() === date.toDateString();
    });
    
    const dayIncome = dayTransactions
      .filter(t => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayExpense = dayTransactions
      .filter(t => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      name: format(date, "EEE"),
      income: dayIncome,
      expense: dayExpense,
    };
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]) // Sort by value descending
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }));

  return (
    <div className="space-y-6">
      {/* Summary Cards Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Balance</p>
                <h3 className="text-2xl font-bold mt-1">${netAmount.toFixed(2)}</h3>
                <div className="flex items-center mt-1">
                  {netAmount >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-rose-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${netAmount >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {netPercentage}% {netAmount >= 0 ? 'saved' : 'overspent'}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4H16C18.8284 4 20.2426 4 21.1213 4.87868C22 5.75736 22 7.17157 22 10V14C22 16.8284 22 18.2426 21.1213 19.1213C20.2426 20 18.8284 20 16 20H8C5.17157 20 3.75736 20 2.87868 19.1213C2 18.2426 2 16.8284 2 14V10Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Income</p>
                <h3 className="text-2xl font-bold mt-1">${totalIncome.toFixed(2)}</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-xs font-medium text-emerald-500">This month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-950/30 dark:to-red-950/20 border-rose-200 dark:border-rose-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-rose-600 dark:text-rose-400">Expenses</p>
                <h3 className="text-2xl font-bold mt-1">${totalExpense.toFixed(2)}</h3>
                <div className="flex items-center mt-1">
                  <ArrowDownRight className="h-4 w-4 text-rose-500 mr-1" />
                  <span className="text-xs font-medium text-rose-500">This month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Transactions Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Spending Trend Chart */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Spending Trend</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Last 7 days overview</p>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px] bg-background/50 backdrop-blur-sm h-8 text-xs">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-3 shadow-md">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p className="text-sm text-emerald-500">Income: ${payload[0].value.toFixed(2)}</p>
                            <p className="text-sm text-rose-500">Expense: ${payload[1].value.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Net: ${(payload[0].value - payload[1].value).toFixed(2)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown Card */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Expense Breakdown
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Current month spending by category
                </p>
              </div>
              <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-4 px-4">
            {pieChartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[280px] bg-muted/30 rounded-lg">
                <div className="bg-muted/60 rounded-full p-3">
                  <Filter className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mt-4">No expenses recorded</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Expenses will appear here once tracked
                </p>
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => 
                        percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                      }
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="var(--background)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-sm" 
                                  style={{ backgroundColor: COLORS[payload[0].dataIndex % COLORS.length] }}
                                />
                                <p className="font-medium">{payload[0]?.name}</p>
                              </div>
                              <p className="text-sm mt-1">${payload[0]?.value.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">
                                {((payload[0]?.value / total) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Card */}
      <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">
              Recent Transactions
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Last 5 transactions
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-8 w-8 rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted/80 transition-colors">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </button>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[160px] bg-background/60 backdrop-blur-sm h-8 text-xs border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] rounded-lg bg-muted/20">
                <div className="bg-muted/40 rounded-full p-3">
                  <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 8L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 12L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 16L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M19 16L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-muted-foreground mt-4">No transactions found</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Start adding transactions to see them here
                </p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${transaction.type === 'EXPENSE' ? 'bg-rose-500/10' : 'bg-emerald-500/10'}`}>
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="h-5 w-5 text-rose-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description || "Untitled"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </p>
                        <div className="h-1 w-1 rounded-full bg-muted-foreground/40"></div>
                        <p className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === 'EXPENSE' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {transaction.type === 'EXPENSE' ? '-' : '+'} ${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
          {recentTransactions.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button className="text-sm text-primary hover:text-primary/90 font-medium transition-colors">
                View all transactions
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}