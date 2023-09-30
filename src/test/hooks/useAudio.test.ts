import { renderHook } from '@testing-library/react';
import { server } from '../mocks/server';
import { useAudio } from '../../hooks/useAudio';

beforeAll(() => {
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
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
});

describe('useAudio', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should play audio only if not paused', async () => {
    const { result } = renderHook(() => useAudio('assets/beer-bottle-opening.mp3'));

    const playAudio = vi.spyOn(window.HTMLMediaElement.prototype, 'play');

    result.current.play();
    result.current.play();

    expect(playAudio).toHaveBeenCalledOnce();
  });

  it('should paused audio', async () => {
    const { result } = renderHook(() => useAudio('assets/beer-bottle-opening.mp3'));

    result.current.play();
    result.current.pause();

    expect(result.current.paused).toBe(true);
  });
});
