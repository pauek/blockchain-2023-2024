// Props ("properties"): el único parámetro de un componente React

import CajaRoja from "@/components/CajaRoja";
import Collapsible from "@/components/Collapsible";
import Parrafo from "@/components/Parrafo";
import Saludo from "@/components/Saludo";
import TextFile from "@/components/TextFile";
import UserList from "@/components/UserList";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="p-6">
			<h1>Demo Next 14</h1>
			<Collapsible>
				<p>
					Minim exercitation duis deserunt sit nulla est. In ullamco incididunt
					ut mollit nostrud consequat ea tempor commodo aliqua consequat qui
					sint. Deserunt est nostrud magna adipisicing laboris incididunt mollit
					aliqua non cupidatat cupidatat commodo. Pariatur labore laborum sint
					laboris excepteur. Ex esse reprehenderit veniam do esse eu.
				</p>
			</Collapsible>
			<TextFile filename="./text-files/a.txt" />
			<TextFile filename="./text-files/b.txt" />

			<div className="my-10">
				<Suspense fallback={<div>Cargando usuarios...</div>}>
					<UserList />
				</Suspense>
			</div>

			<Saludo nombre="Pepito" />
			<Saludo nombre="Paulina" efusivo={true} />
			<CajaRoja>Esto es un mensaje muy visible</CajaRoja>
			<CajaRoja>
				<Parrafo length={100} />
			</CajaRoja>
		</main>
	);
}
