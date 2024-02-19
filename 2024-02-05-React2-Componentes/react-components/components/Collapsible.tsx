"use client";

import { useState } from "react";

interface Props {
	children: React.ReactNode;
}
export default function Collapsible({ children }: Props) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className="border hover:border-black p-3">
			{open ? children : <button onClick={() => setOpen(true)}>show</button>}
		</div>
	);
}
