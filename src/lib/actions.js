'use server'
import { prisma } from './prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function datosPrueba() {
    const results = await db.query('select * from pruebatiempo_voltios')
    return results;
}

export async function createFolder({formData}) {
    const name = formData.get('name')
    try {
        const result = await prisma.folder.create({
            data: { name  }
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

}


export async function editFolder(formData) {
    try {

        const id = formData.get('id')
        console.log('ACTION EDITFOLDER', id);
        const folderId = Number(id)
        const folderName = formData.get('folderName')
        console.log(folderName);
        const result = await prisma.folder.update({
            where: { id: folderId },
            data: { name: folderName }
        })
        console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        
        revalidatePath(`/folders/${id}`)   // IMPORTANTE: REVALIDAMOS PÁGINA

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function deleteFolder(formData) {
    try {
        const id = formData.get('id')
        const folderId = Number(id)
        const result = await prisma.folder.delete({
            where: { id: folderId },
        })
        console.log('El nombre de la carpeta se ha actualizado correctamente', result);
        
        revalidatePath('/folders')  
        redirect('/folders')

    } catch (error) {
        console.log(error);
        throw error
    }
}



export async function createDashboard(formData) {
    const name = formData.get('name')
    const folderId = Number( formData.get('folderId') )

    try {
        const result = await prisma.dashboard.create({
            data: { 
                name,
                folderId
            }
        })
        console.log('Dashboard creado', result);
        
        revalidatePath('/dashboards')  

    } catch (error) {
        console.log(error);
        throw error
    }

}

export async function getDashboardsWithoutFolders() {
    const dashboards = await prisma.dashboard.findMany({
        where: {
            folderId: null
        }
    })
    return dashboards;
}




export async function getDashboardsIntoFolder(folderId) {
    const dashboards = await prisma.dashboard.findMany({
        where: {  folderId: Number(folderId)   }
    })
    return dashboards;
}


export async function getPanelsIntoDashboard(folderId, dashboardId) {

    const dashboard = await prisma.dashboard.findUnique({
        where: {  
            id: Number(dashboardId),
            // folderId: Number(folderId)                         
        },
        include: {
            panels: true
        }
    })

    return dashboard.panels;
}

export async function getFolder(id) {
    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(id)
        }
    })
    return folder;
}


export async function getFolders() {
    const folders = await prisma.folder.findMany()
    return folders;
}


export async function getDashboard(id) {
    const dashboard = await prisma.dashboard.findUnique({
        where: {
            id: Number(id)
        }
    })
    return dashboard;
}


export async function getDashboards() {

    const dashboards = await prisma.dashboard.findMany({})
    return dashboards;
}


export async function getPanels() {

    const panels = await prisma.panel.findMany()
    return panels;
}