export const delay = async (n: number) =>
	new Promise((res) => setTimeout(() => res(true), n));
