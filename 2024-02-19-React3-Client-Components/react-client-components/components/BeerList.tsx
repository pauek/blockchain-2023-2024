"use client";

import { useEffect, useState } from "react";

type Beer = {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
};

const loadBeers = async () => {
  const response = await fetch(`https://api.punkapi.com/v2/beers`);
  const jsonList: any[] = await response.json();
  return jsonList.map((jsonBeer) => ({
    id: jsonBeer.id,
    name: jsonBeer.name,
    tagline: jsonBeer.tagline,
    image_url: jsonBeer.image_url,
  } as Beer))
}

export default function BeerList() {
  const [beers, setBeers] = useState<Beer[] | null>(null);

  // Sin array -> Se ejecuta cada vez
  // [] -> Se ejecuta solo la primera vez
  useEffect(() => {
    loadBeers().then((beers) => setBeers(beers));
  }, []);

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
