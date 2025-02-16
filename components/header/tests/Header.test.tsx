import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { GlobalContextProvider } from '@/components/providers/GlobalContextProvider';

jest.mock('lucide-react', () => ({
  Search: () => <svg data-testid='search-icon'></svg>,
  Sun: () => <svg data-testid='sun-icon' />,
  Moon: () => <svg data-testid='moon-icon' />,
  Menu: () => <svg data-testid='menu-icon'></svg>,
  FileHeart: () => <svg data-testid='heart-icon'></svg>,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

afterEach(cleanup);

describe('Header Component', () => {
  test('renders logo title', () => {
    render(
      <GlobalContextProvider>
        <Header />
      </GlobalContextProvider>
    );

    const element = screen.getByText('weather.weather');
    expect(element).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(
      <GlobalContextProvider>
        <Header />
      </GlobalContextProvider>
    );

    const element = screen.getByPlaceholderText('Search by City or Zipcode...');
    expect(element).toBeInTheDocument();
  });
});
