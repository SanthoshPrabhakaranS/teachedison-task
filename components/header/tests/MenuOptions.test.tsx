import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuOptions from '../MenuOptions';
import { GlobalContextProvider } from '@/components/providers/GlobalContextProvider';

// Mock Icons
jest.mock('lucide-react', () => ({
  Menu: () => <svg data-testid='menu-icon'></svg>,
  FileHeart: () => <svg data-testid='heart-icon'></svg>,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

afterEach(cleanup);

describe('MenuOptions Component', () => {
  test('renders menu button', () => {
    render(
      <GlobalContextProvider>
        <MenuOptions />
      </GlobalContextProvider>
    );

    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  test('opens popover when the button is clicked', () => {
    render(
      <GlobalContextProvider>
        <MenuOptions />
      </GlobalContextProvider>
    );

    const element = screen.getByRole('button');
    fireEvent.click(element);

    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});
