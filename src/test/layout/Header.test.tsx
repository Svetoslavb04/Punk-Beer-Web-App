import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../../components/layout/Header';

describe('Header', () => {
  it('should render nav links correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText(/Home/i);
    const favouritesLink = screen.getByText(/Favourites/i);

    expect(homeLink).toHaveClass('active');
    expect(favouritesLink).not.toHaveClass('active');

    fireEvent.click(favouritesLink);

    expect(homeLink).not.toHaveClass('active');
    expect(favouritesLink).toHaveClass('active');
  });
});
