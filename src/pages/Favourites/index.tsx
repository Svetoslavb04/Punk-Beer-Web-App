import { useEffect, useState } from 'react';

import md5 from 'md5';

import { useBeers } from '../../hooks/useBeers';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import BeersList from '../../components/shared/BeersList';

import { Beer } from '../../interfaces/Beer';

const Favourites = () => {
  const [favourites] = useLocalStorage<number[]>('favouriteBeers', []);
  const [favouritesHashes, setFavouritesHashes] = useLocalStorage<{ id: number; hash: string }[]>(
    'favouriteBeersHashes',
    [],
  );

  const [beers, rawBeers] = useBeers(undefined, undefined, '', favourites);

  const [changedBeers, setChangedBeers] = useState<Beer[]>([]);
  const [unchangedBeers, setUnchangedBeers] = useState<Beer[]>([]);

  useEffect(() => {
    if (rawBeers.length === 0 || changedBeers.length > 0 || unchangedBeers.length > 0) {
      return;
    }

    const currentBeerHashes = getCurrentHashes();

    const currentChangedBeers = currentBeerHashes.filter((currentHash, i) => {
      const previousBeerHash = favouritesHashes.find(fh => fh.id === rawBeers[i].id)?.hash;
      return currentHash.hash != previousBeerHash && previousBeerHash != undefined;
    });

    const currentUnchangedBeers = beers.filter(
      b => !currentChangedBeers.some(cb => cb.beer.id === b.id),
    );

    setChangedBeers(currentChangedBeers.map(b => b.beer));
    setUnchangedBeers(currentUnchangedBeers);

    setFavouritesHashes(currentBeerHashes.map(br => ({ hash: br.hash, id: br.beer.id })));

    function getCurrentHashes() {
      return rawBeers.map((b, i) => ({
        hash: md5(JSON.stringify(b)),
        beer: beers[i],
      }));
    }
  }, [beers, rawBeers, favouritesHashes, changedBeers, unchangedBeers, setFavouritesHashes]);

  return (
    <div className="container mt-4 flex-grow-1 d-flex flex-column">
      <h4>Changed Beers:</h4>
      <p className="m-0">{changedBeers.map(b => b.name).join(', ')}</p>
      <h4 className="mt-4">Unchanged Beers:</h4>
      <p className="m-0 mb-4">{unchangedBeers.map(b => b.name).join(', ')}</p>
      <div className="row gy-4 gx-5 flex-grow-1">
        {favourites.length > 0 ? (
          <BeersList ids={favourites} />
        ) : (
          <p className="fs-3 my-4 text-center">No favourite beers...</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
