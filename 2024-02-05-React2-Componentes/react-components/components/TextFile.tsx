import { readFile } from "fs/promises";

interface Props {
	filename: string;
}
export default async function TextFile({ filename }: Props) {
	const fileBytes = await readFile(filename);
	const fileContent = fileBytes.toString();
	return <pre className="bg-stone-200 px-3 py-2 rounded my-2">{fileContent}</pre>;
}
