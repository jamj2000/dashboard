import { getFolders } from "@/lib/actions"
import Link from "next/link"

async function page() {
    const folders = await getFolders()

    return (
        <div>
            <h1>Listado de Carpetas</h1>
            {
                folders.map(folder => (
                    <p key={folder.id}><Link href={`/folders/${folder.id}`}> {folder.name}</Link></p>
                ))
            }
        </div>
    )
}

export default page