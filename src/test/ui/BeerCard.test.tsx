import { fireEvent, render, screen } from '@testing-library/react';

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

  it('should provide beer object on image click', () => {
    const mockOnBeerImageClick = vi.fn();

    render(<BeerCard beer={beer} starred={false} onBeerImageClick={mockOnBeerImageClick} />);

    const beerImage = screen.getByRole('img');

    fireEvent.click(beerImage);

    expect(mockOnBeerImageClick).toHaveBeenCalledWith(beer, expect.anything());
  });

  it('should provide beer object on image click', () => {
    const mockOnStarClick = vi.fn();

    render(<BeerCard beer={beer} starred={false} onStarClick={mockOnStarClick} />);

    const staricon = screen.getByTitle('star-icon');

    fireEvent.click(staricon);

    expect(mockOnStarClick).toHaveBeenCalledWith(beer, expect.anything());
  });
});
