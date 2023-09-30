import { useState, useEffect, Dispatch } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    let currentValue = defaultValue;

    try {
      const item = localStorage.getItem(key);
      if (item) {
        currentValue = JSON.parse(item);
      }
    } catch (error) {}

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
