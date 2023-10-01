import { render, screen, waitFor } from '@testing-library/react';

import { server } from '../../mocks/server';

import Favourites from '../../../pages/Favourites';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('Favourites', () => {
  it('should render correct changed and unchanged favourite beers', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string): string => {
      switch (key) {
        case 'favouriteBeers':
          return '[1,2]';
        case 'favouriteBeersHashes':
          return `[{"hash":"c5a11546aaa85c830d1ea6ffb954e3c0","id":2}]`;
      }

      return '';
    });

    render(<Favourites />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(2));

    expect(screen.getByText('Trashy Blonde', { selector: 'p' })).toBeVisible();
    expect(screen.getByText('Buzz', { selector: 'p' })).toBeVisible();
  });

  it('should render favourite beers', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((): string => '[1, 2]');

    render(<Favourites />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(2));
  });

  it('should render no favourite beers', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((): string => '[]');

    render(<Favourites />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(0));
    expect(screen.getByText('No favourite beers...')).toBeVisible();
  });
});
