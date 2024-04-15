import DashboardList from "@/components/DashboardList"
import { getDashboards, getFolders, createDashboard } from "@/lib/actions"
import { Suspense } from "react"

async function page() {
    const dashboards = await getDashboards()
    const folders = await getFolders()
    console.log('FOLDERS', folders)

    return (
        <div>
            <form action={createDashboard}>
                <input type='text' name='name' placeholder='Nombre del dashboard' />
                <span> en la carpeta </span>
                <select name='folderId'>
                    {
                        folders.map(folder =>  <option key={folder.id} value={folder.id}>{folder.name}</option> )
                    }

                </select>
                <button type="submit">Crear nuevo dashboard</button>
            </form>

            <h1>Listado de Dashboards</h1>
            <Suspense fallback={'Cargando dashboards...'}>
                <DashboardList />
            </Suspense>
        </div>
    )
}

export default page