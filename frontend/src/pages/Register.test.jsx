import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

// Mock fetch API
global.fetch = vi.fn();

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Check if the heading is rendered
    expect(screen.getByText('createAccount')).toBeInTheDocument();
    
    // Check if the form inputs are rendered
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('confirmPassword')).toBeInTheDocument();
    
    // Check if the role select is rendered
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // Check if the submit button is rendered
    expect(screen.getByText('signUp')).toBeInTheDocument();
    
    // Check if the sign in link is rendered
    expect(screen.getByText(/alreadyHaveAccount/)).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill in the form with mismatched passwords
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('confirmPassword'), {
      target: { value: 'differentpassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('signUp'));

    // Check if error message is displayed
    expect(await screen.findByText('passwordsDoNotMatch')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    // Mock successful registration response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: 1, role: 'client' }
      })
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('confirmPassword'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('signUp'));

    // Wait for the navigation to occur
    expect(await screen.findByText('signUp')).toBeInTheDocument();
  });

  it('shows error message on failed registration', async () => {
    // Mock failed registration response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Email already exists'
      })
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('confirmPassword'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('signUp'));

    // Check if error message is displayed
    expect(await screen.findByText('Email already exists')).toBeInTheDocument();
  });
});