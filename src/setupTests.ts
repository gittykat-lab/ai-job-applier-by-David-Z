import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ jobTitle: 'Software Engineer', location: 'San Francisco' }),
  })
) as jest.Mock;

