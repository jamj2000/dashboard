import { getDashboards, getDashboardsIntoFolder } from '@/lib/actions'
import Link from 'next/link';

async function DashboardList({ folderId }) {
    let dashboards = [];

    if (folderId) {
        dashboards = await getDashboardsIntoFolder(folderId)  // Solo dashboard de folderId
    } else {
        dashboards = await getDashboards()  // Todos los dashboards
    }

    return (
        <div>
            {
                dashboards.map(dashboard => (
                    <div key={dashboard.id}>
                        <p>
                            <Link href={`/dashboards/${dashboard.id}`}> {dashboard.name}</Link>
                            <span> está </span>
                            {dashboard.folderId
                                ? <Link href={`/folders/${dashboard.folderId}`}>en esta carpeta</Link>
                                : <span>sin carpeta</span>
                            }
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default DashboardList