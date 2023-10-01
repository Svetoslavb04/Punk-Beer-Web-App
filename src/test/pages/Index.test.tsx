import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { server } from '../mocks/server';

import Index from '../../pages/Index';
import { MemoryRouter } from 'react-router';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('Index', () => {
  it('should search beers in Index page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const searchInput = screen.getByLabelText('Search for beer...');
    fireEvent.change(searchInput, { target: { value: 'buzz' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(1));
  });

  it('should empty search beers in Index page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const searchButton = screen.getByText('Search');

    fireEvent.click(searchButton);

    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(6));
  });

  it('should go to next page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const nextPageLink = screen.getByLabelText('next page');
    const currentPage = screen.getByLabelText('current page');

    expect(nextPageLink).toBeVisible();
    expect(currentPage).toHaveTextContent('1');

    fireEvent.click(nextPageLink);

    expect(screen.getByLabelText('current page')).toHaveTextContent('2');
  });

  it('should go to first page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const nextPageLink = screen.getByLabelText('next page');
    const firstPageLink = screen.getByLabelText('first page');

    fireEvent.click(nextPageLink);
    fireEvent.click(nextPageLink);
    fireEvent.click(firstPageLink);

    expect(screen.getByLabelText('current page')).toHaveTextContent('1');
  });

  it('should go to prev page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const nextPageLink = screen.getByLabelText('next page');
    const prevPageLink = screen.getByLabelText('prev page');

    fireEvent.click(nextPageLink);
    fireEvent.click(nextPageLink);
    fireEvent.click(prevPageLink);

    expect(screen.getByLabelText('current page')).toHaveTextContent('2');
  });

  it('should stay on page 1 on prev page click if current page is 1', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Index />
      </MemoryRouter>,
    );

    const prevPageLink = screen.getByLabelText('prev page');

    fireEvent.click(prevPageLink);

    expect(screen.getByLabelText('current page')).toHaveTextContent('1');
  });
});
