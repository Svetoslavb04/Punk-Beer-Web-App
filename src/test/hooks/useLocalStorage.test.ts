import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const initialState = { a: 1, b: 2 };

  it('should return the initialState', () => {
    const { result } = renderHook(() => useLocalStorage('bestObject', initialState));

    expect(result.current[0]).toEqual(initialState);
  });

  it('should store the initialState as serialized json in localstorage', () => {
    renderHook(() => useLocalStorage('bestObject', { a: 1, b: 2 }));

    expect(localStorage.getItem('bestObject')).toEqual(JSON.stringify(initialState));
  });

  it('should return setValue that re-sets the value in local storage', () => {
    const { result } = renderHook(() => useLocalStorage('bestObject', initialState));
    const setItem = result.current[1];

    const newValue = { a: 2, b: 5 };

    act(() => {
      setItem(newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(localStorage.getItem('bestObject')).toEqual(JSON.stringify(newValue));
  });

  it('should set the value to the initial on error', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockResolvedValueOnce('1,2');

    const { result } = renderHook(() => useLocalStorage('bestObject', initialState));

    expect(result.current[0]).toEqual(initialState);
  });
});
