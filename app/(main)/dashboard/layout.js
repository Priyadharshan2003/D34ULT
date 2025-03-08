import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";

export default function Layout() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5"></div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
