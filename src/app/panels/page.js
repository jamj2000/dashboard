import { getPanels } from "@/lib/actions"
import Link from "next/link"

async function page() {
    const panels = await getPanels()

    return (
        <div>
            <h1>Listado de Paneles</h1>
            {
                panels.map(panel => (
                    <div key={panel.id}>
                        <p>
                            <Link href={`/panels/${panel.id}`}>{panel.name}</Link>
                            <span> está </span>
                            <Link href={`/dashboards/${panel.dashboardId}`}>en este dashboard</Link>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default page