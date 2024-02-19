"use client";

import { useEffect, useState } from "react";

type Beer = {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
};

const loadBeers = async (search: string) => {
  const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${search}`);
  const jsonList: any[] = await response.json();
  if (!Array.isArray(jsonList)) {
    return [];
  }
  return jsonList.map((jsonBeer) => ({
    id: jsonBeer.id,
    name: jsonBeer.name,
    tagline: jsonBeer.tagline,
    image_url: jsonBeer.image_url,
  } as Beer))
}

export default function BeerSearchResults({ search }: { search: string }) {
  const [beers, setBeers] = useState<Beer[] | null>(null);

  // Sin array -> Se ejecuta cada vez
  // [] -> Se ejecuta solo la primera vez
  useEffect(() => {
    setBeers(null);
    loadBeers(search).then((beers) => setBeers(beers));
  }, [search]);

  if (beers === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {beers.map((beer) => (
        <div key={beer.id}>{beer.name}</div>
      ))}
      {beers.length === 0 && <div>No hay resultados</div>}
    </div>
  );
}
