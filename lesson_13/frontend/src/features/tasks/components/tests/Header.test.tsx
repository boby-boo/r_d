import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('should render header title and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('TM')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });

  it('should render correct links with proper href', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('TM').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Tasks').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Create Task').closest('a')).toHaveAttribute('href', '/tasks/create');
  });

  it('should highlight the active link based on current route', async () => {
    render(
      <MemoryRouter initialEntries={['/tasks/create']}>
        <Header />
      </MemoryRouter>
    );

    const activeLink = screen.getByText('Create Task');
    expect(activeLink).toHaveClass('active');
  });
});
