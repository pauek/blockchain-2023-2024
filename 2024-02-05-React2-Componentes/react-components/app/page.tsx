// Props ("properties"): el único parámetro de un componente React

import CajaRoja from "@/components/CajaRoja";
import Parrafo from "@/components/Parrafo";
import Saludo from "@/components/Saludo";

export default function Home() {
	return (
		<main className="p-6">
			<h1>Demo Next 14</h1>
			<Parrafo length={55} />
			<Parrafo length={83} />
			<Saludo nombre="Pepito" />
			<Saludo nombre="Paulina" efusivo={true} />
			<CajaRoja>Esto es un mensaje muy visible</CajaRoja>
			<CajaRoja>
				<Parrafo length={100} />
			</CajaRoja>
		</main>
	);
}
