import './Index.scss';

import { ChangeEvent, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import BeersList from './components/BeersList';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    per_page: '6',
  });

  const [beerName, setBeerName] = useState(searchParams.get('beerName') || '');

  const handleBeerSearchChange = (e: ChangeEvent<HTMLInputElement>) => setBeerName(e.target.value);

  const handleBeerSearch = () => {
    setSearchParams(prev => {
      prev.set('beerName', beerName);

      return prev;
    });
  };

  return (
    <div>
      <div className="container mt-5">
        <div id="search-beer-container" className="my-4 mx-auto">
          <InputGroup>
            <FormControl
              placeholder="Search for beer..."
              aria-label="Search for beer..."
              aria-describedby="Search for beer"
              value={beerName}
              onChange={handleBeerSearchChange}
            />
            <Button variant="outline-secondary" onClick={handleBeerSearch}>
              Search
            </Button>
          </InputGroup>
        </div>
        <div className="row gy-4 gx-5">
          <BeersList
            search={searchParams.get('beerName') || ''}
            page={Number(searchParams.get('page')) || 1}
            perPage={Number(searchParams.get('perPage')) || 6}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
