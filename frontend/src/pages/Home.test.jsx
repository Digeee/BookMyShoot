import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

describe('Home', () => {
  it('renders the home page with hero section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the main heading is rendered
    expect(screen.getByText('findPerfectPhotographer')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('bookTalentedProfessionals')).toBeInTheDocument();
    
    // Check if the buttons are rendered
    expect(screen.getByText('findProfessionals')).toBeInTheDocument();
    expect(screen.getByText('joinAsPro')).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the features section heading is rendered
    expect(screen.getByText('howItWorks')).toBeInTheDocument();
    
    // Check if the feature items are rendered
    expect(screen.getByText('findPerfectPro')).toBeInTheDocument();
    expect(screen.getByText('bookPaySecurely')).toBeInTheDocument();
    expect(screen.getByText('captureMoments')).toBeInTheDocument();
  });

  it('renders the categories section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the categories section heading is rendered
    expect(screen.getByText('popularCategories')).toBeInTheDocument();
    
    // Check if the category items are rendered
    expect(screen.getByText('weddingPhotography')).toBeInTheDocument();
    expect(screen.getByText('portraitSessions')).toBeInTheDocument();
    expect(screen.getByText('eventCoverage')).toBeInTheDocument();
    expect(screen.getByText('droneVideography')).toBeInTheDocument();
  });
});