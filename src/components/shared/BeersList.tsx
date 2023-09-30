import { FC } from 'react';

import { useBeers } from '../../hooks/useBeers';
import { useAudio } from '../../hooks/useAudio';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { Beer } from '../../interfaces/Beer';

import BeerCard from '../../components/ui/BeerCard';

interface Props {
  search?: string;
  page?: number;
  perPage?: number;
  ids?: number[];
}

const BeersList: FC<Props> = ({ search, page, perPage, ids }) => {
  const [beers] = useBeers(page, perPage, search, ids);

  const [favourites, setFavourites] = useLocalStorage<number[]>('favouriteBeers', []);

  const { play } = useAudio('assets/beer-bottle-opening.mp3');

  const handleStarIconClick = (beer: Beer) => {
    if (favourites.includes(beer.id)) {
      setFavourites(prev => prev.filter(id => beer.id != id));
    } else {
      setFavourites(prev => [...prev, beer.id]);
    }
  };

  return (
    <>
      {beers.length > 0 ? (
        beers.map(beer => (
          <div key={beer.id} className="col-md-6 col-xl-4 d-flex justify-content-center">
            <BeerCard
              beer={beer}
              starred={favourites.includes(beer.id)}
              onBeerImageClick={play}
              onStarClick={handleStarIconClick}
            />
          </div>
        ))
      ) : (
        <p className="fs-3 my-4 text-center">No beers found...</p>
      )}
    </>
  );
};

export default BeersList;
