import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastLoader from '../ForecastLoader';

describe('Foreacast card loader component', () => {
  test('renders loader component', () => {
    render(<ForecastLoader />);

    const element = screen.getByTestId('forecast-loader');
    expect(element).toBeInTheDocument();
  });

  test('renders skeleton loader', () => {
    render(<ForecastLoader />);

    const element = screen.getAllByTestId('skeleton-loader');
    expect(element).toHaveLength(6);
  });
});
