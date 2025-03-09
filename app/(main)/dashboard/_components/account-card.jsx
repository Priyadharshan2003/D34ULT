// app/dashboard/_components/account-card.tsx
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
import { ArrowDownRight, ArrowUpRight, CreditCard } from "lucide-react";
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

  return (
    <Card className="hover:shadow-lg transition-all relative overflow-hidden group">
      {isDefault && (
        <div className="absolute top-2 right-2">
          <Badge className="text-xs bg-primary/10 text-primary hover:bg-primary/15">
            Default
          </Badge>
        </div>
      )}
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-primary/10`}>
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
          </div>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
            className="data-[state=checked]:bg-primary/80"
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize">
              {type.toLowerCase()}
            </Badge>
            <Badge variant="outline" className="space-x-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
              <span>Income</span>
            </Badge>
            <Badge variant="outline" className="space-x-1">
              <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              <span>Expense</span>
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
            <span>Active</span>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}