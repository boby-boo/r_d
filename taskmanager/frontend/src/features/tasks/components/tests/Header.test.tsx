import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../../shared/components/Header';
import { renderWithProviders } from './utils/renderWithProviders';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('should renderWithProviders header title and navigation links', () => {
    renderWithProviders(
      <Header />
    );

    expect(screen.getByText('TM')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });

  it('should renderWithProviders correct links with proper href', () => {
    renderWithProviders(
      <Header />
    );

    expect(screen.getByText('TM').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Tasks').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Create Task').closest('a')).toHaveAttribute('href', '/tasks/create');
  });

  it('should highlight the active link based on current route', async () => {
    renderWithProviders(
      <Header />,
      {
        initialEntries: ['/tasks/create']
      }
    );

    const activeLink = screen.getByText('Create Task');
    expect(activeLink).toHaveClass('active');
  });
});
