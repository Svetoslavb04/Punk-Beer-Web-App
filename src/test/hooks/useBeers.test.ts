import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../mocks/server';
import { useBeers } from '../../hooks/useBeers';

describe('useBeers', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should fetch all beerse', async () => {
    const { result } = renderHook(() => useBeers());

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(6);
    });
  });

  it('should fetch beers at first page', async () => {
    const { result } = renderHook(() => useBeers(1, 3));

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(3);
    });
  });

  it('should fetch beers at first page whose name matches "b" ', async () => {
    const { result } = renderHook(() => useBeers(1, 3, 'b'));

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(3);
      expect(result.current[0].every(b => b.name.toLocaleLowerCase().includes('b'))).toBe(true);
    });
  });

  it('should fetch beers at first page whose name matches "b" but only with id - 1', async () => {
    const { result } = renderHook(() => useBeers(1, 3, 'b', [1]));

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(1);
      expect(result.current[0][0].id).toBe(1);
      expect(result.current[0].every(b => b.name.toLocaleLowerCase().includes('b'))).toBe(true);
    });
  });

  it('should fetch beers for ids array', async () => {
    const { result } = renderHook(() => useBeers(undefined, undefined, '', []));

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(0);
    });
  });
});
