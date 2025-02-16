import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteCardLoader from '../FavoriteCardLoader';

describe('Favorites card loader component', () => {
  test('renders loader component', () => {
    render(<FavoriteCardLoader />);

    const element = screen.getByTestId('favorite-card-loader');
    expect(element).toBeInTheDocument();
  });

  test('renders skeleton loader', () => {
    render(<FavoriteCardLoader />);

    const element = screen.getAllByTestId('skeleton-loader');
    expect(element).toHaveLength(8);
  });
});
