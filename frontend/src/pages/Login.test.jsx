import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

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

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the heading is rendered
    expect(screen.getByText('signIn')).toBeInTheDocument();
    
    // Check if the email and password inputs are rendered
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    
    // Check if the submit button is rendered
    expect(screen.getByText('signIn')).toBeInTheDocument();
    
    // Check if the sign up link is rendered
    expect(screen.getByText(/dontHaveAccount/)).toBeInTheDocument();
  });

  it('handles form submission with valid credentials', async () => {
    // Mock successful login response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: 1, role: 'client' }
      })
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('signIn'));

    // Wait for the navigation to occur
    expect(await screen.findByText('signIn')).toBeInTheDocument();
  });

  it('shows error message on failed login', async () => {
    // Mock failed login response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Invalid credentials'
      })
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'wrongpassword' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('signIn'));

    // Check if error message is displayed
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});