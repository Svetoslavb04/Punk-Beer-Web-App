import '@testing-library/jest-dom';

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
