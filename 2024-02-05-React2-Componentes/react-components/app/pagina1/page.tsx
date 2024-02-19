import Parrafo from "@/components/Parrafo";
import { delay } from "@/lib/utils";

export default async function Page() {
  await delay(2000);
  return <main className="p-6">
    <h1>Página 1</h1>
    <Parrafo length={150} />
    <Parrafo length={50} />
  </main>
}