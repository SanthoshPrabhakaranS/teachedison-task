import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggleButton from './ThemeToggleButton';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: jest.fn(),
  })),
}));

// Mock Icons
jest.mock('lucide-react', () => ({
  Sun: () => <svg data-testid='sun-icon' />,
  Moon: () => <svg data-testid='moon-icon' />,
}));

describe('ThemeToggle Component', () => {
  test('renders theme button component', () => {
    render(<ThemeToggleButton />);
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  test('toggles theme when button is clicked', () => {
    render(<ThemeToggleButton />);
    const element = screen.getByRole('button');
    fireEvent.click(element);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
});
