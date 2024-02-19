import BeerList from "@/components/BeerList";
import BeerSearchResults from "@/components/BeerSearchResults";
import Box from "@/components/Box";
import Clock from "@/components/Clock";
import Collapsible from "@/components/Collapsible";
import Counter from "@/components/Counter";
import OnOff from "@/components/OnOff";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 p-4">
      <h1>React Client Components</h1>
      <Box color="red">
        <p>Esto es un mensaje</p>
      </Box>

      <Link href="/beers" className="text-blue-500">Go to Beer Search</Link>

      <Clock />

      <BeerSearchResults search="black" />
      {/* <BeerList /> */}

      <OnOff />
      <Counter />
      <Collapsible>
        <p>
          Hola que tal Aliquip veniam est proident Lorem ex cillum elit
          adipisicing. Fugiat duis ex dolor proident occaecat ullamco deserunt
          amet ea deserunt cupidatat. Est sunt exercitation voluptate nisi velit
          in cillum sunt sunt id esse excepteur aute. Ipsum id sint duis est
          consectetur dolore ullamco. Sint culpa proident exercitation
          exercitation commodo cupidatat duis excepteur sunt Lorem excepteur ut
          incididunt. Voluptate commodo eu id do cupidatat anim esse. Laborum in
          dolor anim aute tempor ullamco exercitation nulla quis esse. Sint esse
          esse sunt non deserunt. Enim culpa anim ipsum in labore id. Ut do
          aliquip quis dolore pariatur ullamco incididunt et ipsum aliquip
          aliqua.
        </p>
        <pre>const int x = 3;</pre>
      </Collapsible>
    </main>
  );
}
