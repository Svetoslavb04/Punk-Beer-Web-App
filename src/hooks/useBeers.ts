import { useEffect, useMemo, useRef, useState } from 'react';
import { Beer } from '../interfaces/Beer';
import { PunkAPIBeer } from '../interfaces/PunkAPIBeer';

export function useBeers(page: number, perPage: number, search: string = '', ids: number[] = []) {
  const [beers, setBeers] = useState<Beer[]>([]);

  const abortController = useMemo(() => new AbortController(), [search, page, perPage]);

  const firstRender = useRef(true);

  useEffect(() => {
    const beerNameQuery = search.length > 0 ? `beer_name=${search.replace(/ /g, '_')}&` : '';

    const idsQuery = ids.length > 0 ? `&ids=${ids.join('|')}` : '';

    const query = `${beerNameQuery}page=${page}&per_page=${perPage}${idsQuery}`;

    fetch(`https://api.punkapi.com/v2/beers?${query}`, {
      signal: abortController.signal,
    })
      .then(res => res.json())
      .then(data => {
        const beers: Beer[] = data.map((e: PunkAPIBeer) => {
          const beer: Beer = {
            id: e.id,
            name: e.name,
            description: e.description,
            imageUrl: e.image_url,
          };

          return beer;
        });

        setBeers(beers);
      })
      .catch(() => {});

    return () => {
      if (!firstRender.current) {
        abortController?.abort();
      }
      firstRender.current = false;
    };
  }, [search, page, perPage, ids, abortController]);

  return beers;
}
