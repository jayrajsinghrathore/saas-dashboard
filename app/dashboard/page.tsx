import { DashboardOverview } from "@/components/dashboard-overview"
import { getUser } from "@/lib/auth"
import { getDashboardData } from "@/lib/data"

export default async function DashboardPage() {
  const user = await getUser()
  const dashboardData = await getDashboardData()

  return <DashboardOverview user={user} data={dashboardData} />
}
