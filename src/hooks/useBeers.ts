import { useEffect, useState } from 'react';
import { Beer } from '../interfaces/Beer';
import { PunkAPIBeer } from '../interfaces/PunkAPIBeer';

export function useBeers(
  page?: number,
  perPage?: number,
  search: string = '',
  ids: number[] = [],
): [Beer[], PunkAPIBeer[]] {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [rawBeers, setRawBeers] = useState<PunkAPIBeer[]>([]);

  useEffect(() => {
    const beerNameQuery = search.length > 0 ? `beer_name=${search.replace(/ /g, '_')}&` : '';

    const idsQuery = ids.length > 0 ? `&ids=${ids.join('|')}` : '';

    let pageQuery = '';

    if (page && perPage) {
      pageQuery = `&page=${page}&per_page=${perPage}`;
    }

    const query = `${beerNameQuery}${pageQuery}${idsQuery}`;

    const abortController = new AbortController();

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
        setRawBeers(data);
      })
      .catch(() => {});

    return () => {
      abortController.abort();
    };
  }, [search, page, perPage, ids]);

  return [beers, rawBeers];
}
