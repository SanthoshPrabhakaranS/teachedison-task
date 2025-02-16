import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoritesPage from '../FavoritesPage';
import { GlobalContextProvider } from '@/components/providers/GlobalContextProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

jest.mock('lucide-react', () => ({
  ArrowLeft: () => <svg data-testid='arrow-left-icon' />,
}));

describe('Favorites Page Component', () => {
  test('redners Page title', () => {
    render(
      <GlobalContextProvider>
        <ReactQueryProvider>
          <FavoritesPage />
        </ReactQueryProvider>
      </GlobalContextProvider>
    );

    const element = screen.getByText('Favorite Locations');
    expect(element).toBeInTheDocument();
  });
});
