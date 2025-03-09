import { getAccountWithTransactions } from "@/actions/account";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { AccountChart } from "../_components/account-chart";
import { TransactionTable } from "../_components/transaction-table";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, CreditCard, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

export default async function AccountPage({ params: { id } }) {
  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  // Calculate quick stats
  const totalIncome = transactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-6 py-6">
      <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
        <Link href="/dashboard" className="flex items-center gap-1.5">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-xl">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight capitalize mb-1">
                {account.name}
              </h1>
              <p className="text-muted-foreground">
                {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
                Account
              </p>
            </div>
          </div>

          <div className="text-right pb-2">
            <div className="text-2xl sm:text-3xl font-bold">
              ${parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border border-green-100 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-red-100 dark:border-red-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-blue-100 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Net Balance</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${(totalIncome - totalExpenses).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-950 rounded-xl border shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 pb-0">Transaction History</h2>
        <p className="text-sm text-muted-foreground px-6 pt-1 pb-4">Income and expense trends over time</p>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <BarLoader width={250} color="#9333ea" />
            </div>
          }
        >
          <AccountChart transactions={transactions} />
        </Suspense>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-950 rounded-xl border shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 pb-2">Transaction List</h2>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-32">
              <BarLoader width={250} color="#9333ea" />
            </div>
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}