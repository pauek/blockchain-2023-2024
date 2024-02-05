interface ParrafoProps {
	length: number;
}
const Parrafo = ({ length }: ParrafoProps) => (
	<p className="my-3">
		{Array.from({ length }).map(() => (Math.random() > 0.5 ? "bla " : "blah "))}
	</p>
);

export default Parrafo;