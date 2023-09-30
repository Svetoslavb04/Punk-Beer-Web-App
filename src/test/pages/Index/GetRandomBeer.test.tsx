import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { server } from '../../mocks/server';

import GetRandomBeer from '../../../pages/Index/components/GetRandomBeer';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('GetRandomBeer', () => {
  it('should render loading text', async () => {
    render(<GetRandomBeer />);

    const openModalButton = screen.getByRole('button');

    fireEvent.click(openModalButton);
    await waitFor(() => {
      const beerName = screen.getByText('Loading...');
      expect(beerName).toBeInTheDocument();
    });
  });

  it('should render a random beer', async () => {
    render(<GetRandomBeer />);

    const openModalButton = screen.getByRole('button');

    fireEvent.click(openModalButton);

    await waitFor(() => expect(screen.queryByRole('img')).toBeVisible());
  });

  it('should not render a random beer on fetch error', async () => {
    render(<GetRandomBeer />);

    vi.spyOn(global, 'fetch').mockRejectedValueOnce({});

    const openModalButton = screen.getByRole('button');

    fireEvent.click(openModalButton);

    await waitFor(() => expect(screen.queryByRole('img')).not.toBeInTheDocument());
  });

  it('should hide the modal', async () => {
    render(<GetRandomBeer />);

    const openModalButton = screen.getByRole('button');

    fireEvent.click(openModalButton);

    const closeModal = screen.getByLabelText(/close/i);

    fireEvent.click(closeModal);

    await waitFor(() => expect(screen.queryByRole('img')).not.toBeInTheDocument());
  });
});
