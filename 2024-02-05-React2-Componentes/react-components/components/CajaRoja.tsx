interface CajaRojaProps {
  children: React.ReactNode;
}
const CajaRoja = ({ children }: CajaRojaProps) => (
	<div
		className={
			"bg-red-500 text-white px-3 mb-2 " +
			"py-2 border border-black rounded shadow-md"
		}
	>
		{children}
	</div>
);

export default CajaRoja;