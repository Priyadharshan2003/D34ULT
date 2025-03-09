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
import { ArrowDownRight, ArrowUpRight, CreditCard, Star } from "lucide-react";
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

  // Determine background gradient based on account type
  const getBgGradient = () => {
    switch (type.toLowerCase()) {
      case "checking":
        return "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800";
      case "savings":
        return "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800";
      case "credit":
        return "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800";
      case "investment":
        return "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800";
      default:
        return "from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-all relative overflow-hidden group bg-gradient-to-br ${getBgGradient()}`}>
      {isDefault && (
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 p-1 rotate-12 shadow-md z-10 rounded">
          <Star className="h-4 w-4" fill="currentColor" />
        </div>
      )}
      <Link href={`/account/${id}`} className="block h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-white/80 dark:bg-black/20 shadow-sm`}>
              <CreditCard className="h-5 w-5 text-primary" />
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
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize bg-white/50 dark:bg-black/20 border-0 text-gray-800 dark:text-gray-200 shadow-sm">
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}