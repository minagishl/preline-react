import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = class MockIntersectionObserver
  implements IntersectionObserver
{
  root = null;
  rootMargin = "";
  thresholds: readonly number[] = [];

  constructor() {}
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock ResizeObserver
global.ResizeObserver = class MockResizeObserver implements ResizeObserver {
  constructor() {}
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
};

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLElement methods that might be used by components
HTMLElement.prototype.scrollTo = jest.fn();
HTMLElement.prototype.scrollIntoView = jest.fn();
