import { getDashboardData } from "@/actions/dashboard"; // Adjust the import based on your actual file structure
import { auth } from "@clerk/nextjs/server"; // Assuming you're using Clerk for authentication

export default async function handler(req, res) {
  const { userId } = await auth();
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { accounts, transactions } = await getDashboardData(); // Fetch accounts and transactions
    res.status(200).json({ accounts, transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
