import { render, screen } from '@testing-library/react';

import BeerCard from '../../components/ui/BeerCard';
import { Beer } from '../../interfaces/Beer';

describe('BeerCard', () => {
  const beer: Beer = {
    id: 1,
    name: 'Heineken',
    description: 'some description',
    imageUrl: 'some_url',
  };

  it('should render filled star icon', () => {
    render(<BeerCard beer={beer} starred={true} />);

    const starFillicon = screen.queryByTitle('star-fill-icon');
    const staricon = screen.queryByTitle('star-icon');

    expect(staricon).not.toBeInTheDocument();
    expect(starFillicon).toBeInTheDocument();
  });

  it('should render star icon', () => {
    render(<BeerCard beer={beer} starred={false} />);

    const starFillicon = screen.queryByTitle('star-fill-icon');
    const staricon = screen.queryByTitle('star-icon');

    expect(staricon).toBeInTheDocument();
    expect(starFillicon).not.toBeInTheDocument();
  });
});
