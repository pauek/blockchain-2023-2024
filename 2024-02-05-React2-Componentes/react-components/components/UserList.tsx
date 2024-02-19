import { delay } from "@/lib/utils";
import Image from "next/image";

const User = ({ user }: { user: Record<string, any> }) => {
	const {
		picture,
		name: { title, first, last },
		email,
	} = user;
	return (
		<div className="flex flex-row border rounded shadow mb-2 overflow-clip">
			<Image src={picture.medium} alt="User avatar" width={60} height={60} />
			<div className="flex-1 flex flex-col p-2">
				<div className="font-bold">
					{title} {first} {last}
				</div>
				<div className="text-stone-500 font-mono text-xs">{email}</div>
			</div>
		</div>
	);
};

export default async function UserList() {
  await delay(2000);
	const response = await fetch("https://randomuser.me/api/?results=20");
	const { results: users } = await response.json();

	return (
		<ul>
			{users.map((user: any) => (
				<User key={user.login.uuid} user={user} />
			))}
		</ul>
	);
}
