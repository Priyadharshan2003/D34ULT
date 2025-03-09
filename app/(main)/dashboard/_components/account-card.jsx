"use client";

import { updateDefaultAccount } from "@/actions/account";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  CreditCard, 
  Star,
  Wallet,
  LineChart,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  // Get icon based on account type
  const getAccountIcon = () => {
    switch (type.toLowerCase()) {
      case "checking":
        return <CreditCard className="h-5 w-5" />;
      case "savings":
        return <Wallet className="h-5 w-5" />;
      case "credit":
        return <CreditCard className="h-5 w-5" />;
      case "investment":
        return <LineChart className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  // Determine background gradient based on account type
  const getBgGradient = () => {
    switch (type.toLowerCase()) {
      case "checking":
        return "from-blue-50 via-blue-100 to-white dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-800";
      case "savings":
        return "from-green-50 via-green-100 to-white dark:from-green-950 dark:via-green-900 dark:to-green-800 border-green-200 dark:border-green-800";
      case "credit":
        return "from-purple-50 via-purple-100 to-white dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-800";
      case "investment":
        return "from-amber-50 via-amber-100 to-white dark:from-amber-950 dark:via-amber-900 dark:to-amber-800 border-amber-200 dark:border-amber-800";
      default:
        return "from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-700";
    }
  };

  // Get highlight color based on account type
  const getHighlightColor = () => {
    switch (type.toLowerCase()) {
      case "checking":
        return "bg-blue-500 text-white";
      case "savings":
        return "bg-green-500 text-white";
      case "credit":
        return "bg-purple-500 text-white";
      case "investment":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Mock data for small sparkline visualization
  const mockSparkline = [
    { height: "h-1", opacity: "opacity-30" },
    { height: "h-2", opacity: "opacity-40" },
    { height: "h-3", opacity: "opacity-50" },
    { height: "h-2", opacity: "opacity-60" },
    { height: "h-4", opacity: "opacity-70" },
    { height: "h-3", opacity: "opacity-80" },
    { height: "h-5", opacity: "opacity-90" },
    { height: "h-4", opacity: "opacity-100" },
  ];

  return (
    <Card className={`hover:shadow-xl transition-all relative overflow-hidden group border bg-gradient-to-br ${getBgGradient()} backdrop-blur-sm`}>
      {isDefault && (
        <div className="absolute -top-1 -right-1 transform rotate-12 z-10">
          <div className="bg-yellow-400 text-yellow-900 p-1 shadow-lg rounded">
            <Star className="h-4 w-4" fill="currentColor" />
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-tr from-primary/5 to-primary/20 blur-xl"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <Link href={`/account/${id}`} className="block h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${getHighlightColor()} shadow-md`}>
              {getAccountIcon()}
            </div>
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">{name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Default</span>
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-primary/80"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 flex items-end gap-2">
            ${parseFloat(balance).toFixed(2)}
            <span className="text-xs text-green-500 font-normal flex items-center">
              <ArrowUpRight className="h-3 w-3 inline" /> 2.4%
            </span>
          </div>
          
          {/* Mini spark line visualization */}
          <div className="flex items-end h-5 gap-1 mb-4">
            {mockSparkline.map((bar, index) => (
              <div 
                key={index} 
                className={`${bar.height} w-1 rounded-sm ${getHighlightColor()} ${bar.opacity}`}
              ></div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`capitalize bg-white/50 dark:bg-black/20 border-0 text-gray-800 dark:text-gray-200 shadow-sm`}>
              {type.toLowerCase()}
            </Badge>
            <Badge variant="outline" className="space-x-1 bg-white/50 dark:bg-black/20 border-0 text-gray-800 dark:text-gray-200 shadow-sm">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
              <span>Income</span>
            </Badge>
            <Badge variant="outline" className="space-x-1 bg-white/50 dark:bg-black/20 border-0 text-gray-800 dark:text-gray-200 shadow-sm">
              <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              <span>Expense</span>
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 bg-green-500 rounded-full shadow-sm animate-pulse" />
            <span>Active</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}