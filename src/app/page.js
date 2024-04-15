import { getFolders } from "@/lib/actions";


async function Home() {

  const folders = await getFolders();

  return (
    <main>
      <h1>Página de INICIO</h1>
    
    </main>
  );
}

export default Home
