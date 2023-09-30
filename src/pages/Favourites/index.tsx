import { useLocalStorage } from '../../hooks/useLocalStorage';

import Pagination from 'react-bootstrap/Pagination';

import BeersList from '../../components/shared/BeersList';
import { useSearchParams } from 'react-router-dom';
import { useBeers } from '../../hooks/useBeers';

const Favourites = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    perPage: '3',
  });

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentPerPage = Number(searchParams.get('perPage')) || 3;

  const [favourites] = useLocalStorage<number[]>('favouriteBeers', []);
  const [_beers, rawBeers] = useBeers(currentPage, currentPerPage, '', favourites);

  const handlePagination = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  return (
    <div className="container mt-4 flex-grow-1 d-flex flex-column">
      <div className="row gy-4 gx-5 flex-grow-1 align-items-center">
        <BeersList
          page={Number(searchParams.get('page')) || 1}
          perPage={Number(searchParams.get('perPage')) || 3}
          ids={favourites}
        />
      </div>
      <div id="beers-pagination" className="my-4 mx-auto">
        <Pagination className="mb-0">
          <Pagination.First onClick={() => handlePagination(1)} />
          <Pagination.Prev
            onClick={() => handlePagination(currentPage > 1 ? currentPage - 1 : 1)}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => handlePagination(currentPage + 1)} />
        </Pagination>
      </div>
    </div>
  );
};

export default Favourites;
