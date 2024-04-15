import DashboardList from "@/components/DashboardList"
import { getFolder, editFolder, deleteFolder } from "@/lib/actions"
import { Suspense } from "react"


async function page({ params }) {

  const folder = await getFolder(params.id)

  return (
    <div>
      <h1>Folder {params.id} - {folder.name} </h1>
      <form>
        <input type='hidden' name='id' value={params.id} ></input>
        <input type='text' name='folderName' placeholder={folder.name}></input>
        <button type='submit' formAction={editFolder}>Cambiar nombre</button>
        <button type='submit' formAction={deleteFolder}>Eliminar carpeta</button>
      </form>
      <h2>Dashboards en esta carpeta</h2>
      <Suspense fallback={'Cargando dashboards'}>
        <DashboardList folderId={params.id} />
      </Suspense>
    </div>
  )
}

export default page