"use client";

import BeerSearchResults from "@/components/BeerSearchResults";
import { useRef, useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("bla bla");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (inputRef.current !== null) {
      const search = inputRef.current.value;
      setSearch(search);
    }
  }

  return <main className="p-4">
    <form className="flex flex-row gap-2">
      <input className="text-black" type="text" value={search} ref={inputRef} onChange={onChange} />
      <button>Search</button>
    </form>
    <BeerSearchResults search={search} />
  </main>
}