import './BeerCard.scss';

import { FC, MouseEvent } from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';

import { Beer } from '../../../interfaces/Beer';

interface Props {
  className?: string;
  starred?: boolean;
  beer: Beer;
  onStarClick?: (beer: Beer, event: MouseEvent<HTMLSpanElement>) => void;
  onBeerImageClick?: (beer: Beer, event: MouseEvent<HTMLImageElement>) => void;
}

const BeerCard: FC<Props> = ({ className, starred, beer, onStarClick, onBeerImageClick }) => {
  return (
    <div
      beer-id={beer.id}
      className={`beer-card p-2 border rounded-4 row overflow-hidden ${className}`}
    >
      <div className="mh-100 col-4 py-4 px-3 d-flex flex-column justify-content-center">
        <img
          src={beer.imageUrl}
          alt="beer"
          onClick={onBeerImageClick?.bind(this, beer)}
          className="object-fit-contain mw-100 mh-100 h-auto"
        />
      </div>
      <div className="col-8 h-100 my-2 d-flex flex-column">
        <span
          onClick={onStarClick?.bind(this, beer)}
          className="star-container d-flex align-self-end"
        >
          {starred ? <StarFill title="star-fill-icon" /> : <Star title="star-icon" />}
        </span>
        <h3 className="mt-1 fs-6">{beer.name}</h3>
        <p className="fs-6 overflow-hidden">{beer.description}</p>
      </div>
    </div>
  );
};

export default BeerCard;
