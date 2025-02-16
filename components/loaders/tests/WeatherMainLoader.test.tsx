import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherMainLoader from '../WeatherMainLoader';

describe('Weather Main loader component', () => {
  test('renders Loader component', () => {
    render(<WeatherMainLoader />);

    const element = screen.getByTestId('weather-main-loader');
    expect(element).toBeInTheDocument();
  });

  test('renders skeleton loader', () => {
    render(<WeatherMainLoader />);

    const element = screen.getAllByTestId('skeleton-loader');
    expect(element).toHaveLength(4);
  });
});
