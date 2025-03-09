"use client";

import useFetch from "@/hooks/use-fetch";
import { Check, Pencil, X, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;
  
  const remainingBudget = initialBudget 
    ? initialBudget.amount - currentExpenses 
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  // Get status icon based on budget usage
  const getStatusIcon = () => {
    if (percentUsed >= 90) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    } else if (percentUsed >= 75) {
      return <TrendingUp className="h-5 w-5 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusText = () => {
    if (percentUsed >= 90) {
      return "Critical";
    } else if (percentUsed >= 75) {
      return "Warning";
    } else {
      return "On Track";
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-950 shadow-md backdrop-blur-sm border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <span className="bg-primary/10 p-1 rounded">
              <TrendingUp className="h-4 w-4 text-primary" />
            </span>
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription className="text-base">
                  {initialBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {initialBudget && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg shadow-inner flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
            <div className={`text-lg font-bold ${remainingBudget > 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${remainingBudget.toFixed(2)}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {initialBudget && (
          <div className="space-y-3">
            <div className="relative pt-1">
              <Progress
                value={percentUsed}
                extraStyles={`${
                  percentUsed >= 90
                    ? "bg-red-500"
                    : percentUsed >= 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                } h-3 rounded-full`}
              />
              
              {/* Circle indicator on progress bar */}
              <div 
                className="absolute top-0 h-5 w-5 rounded-full bg-white dark:bg-gray-900 shadow-md border-2 border-primary flex items-center justify-center transform -translate-y-1/4"
                style={{ left: `${Math.min(percentUsed, 98)}%` }}
              >
                <div className="h-2 w-2 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                {getStatusIcon()}
                <span className="text-sm font-medium">
                  Status: {getStatusText()}
                </span>
              </div>
              <p className="text-sm font-medium">
                {percentUsed.toFixed(1)}% used
              </p>
            </div>
            
            {/* Budget milestones */}
            <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <div>0%</div>
              <div>25%</div>
              <div>50%</div>
              <div>75%</div>
              <div>100%</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}