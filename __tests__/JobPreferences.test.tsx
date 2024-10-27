import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import JobPreferences from '../src/components/JobPreferences'

// Mock the utils module
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.join(' ')
}));

// Mock the UI components
jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />
}));

describe('JobPreferences', () => {
  // Suppress console.error for cleaner test output
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    // Clear mock data before each test
    (global.fetch as jest.Mock).mockClear();
    // Clear console.error mock
    (console.error as jest.Mock).mockClear();
  });

  it('renders job preferences form', async () => {
    render(<JobPreferences />);
    
    await waitFor(() => {
      expect(screen.getByText('Job Preferences')).toBeInTheDocument();
      expect(screen.getByLabelText(/Preferred Job Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Preferred Location/i)).toBeInTheDocument();
    });
  });

  it('loads initial preferences', async () => {
    render(<JobPreferences />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument();
      expect(screen.getByDisplayValue('San Francisco')).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<JobPreferences />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch preferences/i)).toBeInTheDocument();
    });

    // Optionally verify that error was logged
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching preferences:',
      expect.any(Error)
    );
  });

  it('updates job title when user types', async () => {
    render(<JobPreferences />);
    const input = screen.getByLabelText(/Preferred Job Title/i);
    
    fireEvent.change(input, { target: { value: 'Senior Developer' } });
    
    expect(input).toHaveValue('Senior Developer');
  });

  it('updates location when user types', async () => {
    render(<JobPreferences />);
    const input = screen.getByLabelText(/Preferred Location/i);
    
    fireEvent.change(input, { target: { value: 'New York' } });
    
    expect(input).toHaveValue('New York');
  });

  it('shows loading state while fetching data', async () => {
    // Mock fetch to delay response
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ jobTitle: 'Software Engineer', location: 'San Francisco' })
      }), 100))
    );

    render(<JobPreferences />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  it('handles server error responses', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })
    );

    render(<JobPreferences />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch preferences/i)).toBeInTheDocument();
    });
  });
})
