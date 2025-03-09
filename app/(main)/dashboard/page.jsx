import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CreditCard, ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import Chatbot from '../chatbot/page';

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // Calculate some summary metrics
  const totalBalance = accounts?.reduce((sum, account) => sum + parseFloat(account.balance), 0) || 0;
  const monthlyIncome = transactions?.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0) || 0;
  const monthlyExpenses = transactions?.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Financial Dashboard</h1>
          <p className="text-muted-foreground">Manage your accounts and track your spending</p>
        </div>
        <div className="flex gap-2">
          <CreateAccountDrawer>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Account</span>
            </button>
          </CreateAccountDrawer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Balance</h3>
              <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-full">
                <Wallet className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">${totalBalance.toFixed(2)}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Across {accounts?.length || 0} accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Monthly Income</h3>
              <div className="p-2 bg-green-200 dark:bg-green-800 rounded-full">
                <ArrowUp className="h-4 w-4 text-green-700 dark:text-green-300" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">${monthlyIncome.toFixed(2)}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">This month's earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Monthly Expenses</h3>
              <div className="p-2 bg-red-200 dark:bg-red-800 rounded-full">
                <ArrowDown className="h-4 w-4 text-red-700 dark:text-red-300" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-900 dark:text-red-100">${monthlyExpenses.toFixed(2)}</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">This month's spending</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <div className="rounded-xl overflow-hidden border bg-card shadow-lg">
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      </div>

      {/* Dashboard Overview */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* Accounts Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Accounts</h2>
          <p className="text-sm text-muted-foreground">{accounts?.length || 0} total</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 h-full">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-12 pb-12">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm font-medium">Add New Account</p>
                <p className="text-xs text-muted-foreground mt-1">Connect bank, cash, or credit</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {accounts.length > 0 &&
            accounts?.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
<<<<<<< HEAD
=======
      
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
      <Chatbot />
>>>>>>> 10cea021f91b5c087cb276994268d6fbf720ac16
    </div>
  );
}