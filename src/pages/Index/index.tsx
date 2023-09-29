import { useSearchParams } from 'react-router-dom';
import BeersList from './components/BeersList';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    per_page: '6',
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="row gy-4 gx-5">
          <BeersList
            search=""
            page={Number(searchParams.get('page')) || 1}
            perPage={Number(searchParams.get('perPage')) || 6}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
