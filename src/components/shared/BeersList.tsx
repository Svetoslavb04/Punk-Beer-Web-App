import { FC } from 'react';

import { useBeers } from '../../hooks/useBeers';

import BeerCard from '../../components/ui/BeerCard';
import { useAudio } from '../../hooks/useAudio';

interface Props {
  search?: string;
  page: number;
  perPage: number;
  ids?: number[];
}

const BeersList: FC<Props> = ({ search, page, perPage, ids }) => {
  const beers = useBeers(page, perPage, search, ids);

  const { play } = useAudio('assets/beer-bottle-opening.mp3');

  return (
    <>
      {beers.length > 0 ? (
        beers.map(beer => (
          <div key={beer.id} className="col-md-6 col-xl-4 d-flex justify-content-center">
            <BeerCard beer={beer} onBeerImageClick={play} />
          </div>
        ))
      ) : (
        <p className="fs-3 my-4 text-center">No beers found...</p>
      )}
    </>
  );
};

export default BeersList;
