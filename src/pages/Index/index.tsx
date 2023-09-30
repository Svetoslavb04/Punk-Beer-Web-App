import './Index.scss';

import { useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';

import BeersList from '../../components/shared/BeersList';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    perPage: '6',
  });

  const beerNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (beerNameInput.current) {
      beerNameInput.current.value = searchParams.get('beerName') || '';
    }
  }, [searchParams]);

  const handleBeerSearch = () => {
    setSearchParams(prev => {
      const beerName = beerNameInput.current?.value || '';

      if (beerName.length > 0) {
        prev.set('beerName', beerName);
      } else {
        prev.delete('beerName');
      }
      return prev;
    });
  };

  const handlePagination = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <div className="container mt-5 flex-grow-1 d-flex flex-column">
      <div id="search-beer-container" className="my-4 mx-auto">
        <InputGroup>
          <FormControl
            ref={beerNameInput}
            placeholder="Search for beer..."
            aria-label="Search for beer..."
            aria-describedby="Search for beer"
          />
          <Button variant="outline-secondary" onClick={handleBeerSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="row gy-4 gx-5 flex-grow-1 align-items-center">
        <BeersList
          search={searchParams.get('beerName') || ''}
          page={Number(searchParams.get('page')) || 1}
          perPage={Number(searchParams.get('perPage')) || 6}
        />
      </div>
      <div id="beers-pagination" className="my-4 mx-auto">
        <Pagination>
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

export default Index;
