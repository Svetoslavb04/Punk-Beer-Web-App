import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import BeersList from '../../components/shared/BeersList.tsx';
import { server } from '../mocks/server.ts';

beforeAll(() => {
  server.listen();

  window.HTMLMediaElement.prototype.play = () => {
    Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
      value: false,
    });
    return Promise.resolve();
  };
  window.HTMLMediaElement.prototype.pause = () => {
    Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
      value: true,
    });
  };
});

afterAll(() => {
  server.close();

  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
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

  it('should play sound on image click', async () => {
    const playAudio = vi.spyOn(window.HTMLMediaElement.prototype, 'play');

    render(<BeersList page={1} perPage={3} />);

    const beerImages = await screen.findAllByRole('img');

    beerImages.forEach(img => {
      fireEvent.click(img);
      fireEvent.click(img);
      expect(playAudio).toHaveBeenCalledOnce();
    });
  });
});
