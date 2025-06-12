import { CustomersPage } from "@/components/customers-page"
import { getCustomers } from "@/lib/data"

export default async function Customers() {
  const customers = await getCustomers()

  return <CustomersPage customers={customers} />
}
