import { render, screen, waitFor } from '@testing-library/react';

import BeersList from '../../components/shared/BeersList.tsx';
import { server } from '../mocks/server.ts';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('BeersList', () => {
  it('should render correct number of cards', async () => {
    render(<BeersList page={1} perPage={3} />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(3));
  });

  it('should render correct number of cards', async () => {
    render(<BeersList page={1000} perPage={3} />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(0));

    expect(screen.getByText('No beers found...')).toBeVisible();
  });

  it('should render correct number of cards with id', async () => {
    render(<BeersList page={1} perPage={3} ids={[1, 2]} />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(2));
  });

  it('should render correct number of cards with id and name', async () => {
    render(<BeersList page={1} perPage={3} ids={[1, 2]} search="trash" />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(1));
  });

  it('should render correct number of cards with name', async () => {
    render(<BeersList page={1} perPage={3} search="pilsen" />);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(1));
  });
});
