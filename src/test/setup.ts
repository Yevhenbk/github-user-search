import '@testing-library/jest-dom'

// Mock fetch for tests
global.fetch = global.fetch || (() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  })
) as jest.Mock;

// Mock import.meta.env
Object.defineProperty(window, 'import', {
  value: {
    meta: {
      env: {
        VITE_GITHUB_API_BASE_URL: 'https://api.github.com',
      }
    }
  }
});

// Setup jsdom environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});