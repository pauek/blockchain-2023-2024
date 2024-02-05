interface Props {
	nombre: string;
	efusivo?: boolean;
}
export default function Saludo({ nombre, efusivo }: Props) {
	return (
		<p>
			&mdash; Hola, {nombre}
			{efusivo ? "!!" : "."}
		</p>
	);
};

