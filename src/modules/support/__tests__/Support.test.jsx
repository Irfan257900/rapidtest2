import React from 'react';
import { render, screen } from '@testing-library/react';
import Support from '../Support';

describe('Support Component', () => {
  it('renders the Support component', () => {
    render(<Support />);
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('displays a welcome message', () => {
    render(<Support />);
    expect(screen.getByText('Welcome to the support system.')).toBeInTheDocument();
  });
});