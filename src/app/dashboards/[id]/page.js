import { getDashboard } from "@/lib/actions"

async function page({params}) {
  const dashboard = await getDashboard(params.id)

  return (
    <div>
        <h1>Dashboard {params.id} - {dashboard.name}</h1>
    </div>
  )
}

export default page