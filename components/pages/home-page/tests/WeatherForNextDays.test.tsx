import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherForNextDays from '../WeatherForNextDays';
import { ForecastType } from '../types';

jest.mock('../../../loaders/ForecastLoader', () => {
  const ForecastLoader = () => <div data-testid='forecast-loader' />;
  ForecastLoader.displayName = 'ForecastLoader';
  return ForecastLoader;
});

jest.mock('../../../error-body', () => {
  const ErrorLayout = ({ description }: { description: string }) => (
    <div data-testid='error-layout'>{description}</div>
  );
  ErrorLayout.displayName = 'ErrorLayout';
  return ErrorLayout;
});

jest.mock('lucide-react', () => ({
  ThermometerSun: () => <svg data-testid='thermometer-icon' />,
  Wind: () => <svg data-testid='wind-icon' />,
  Droplets: () => <svg data-testid='humidity-icon' />,
}));

describe('WeatherForNextDays Component', () => {
  const mockForecastData: ForecastType[] = [
    {
      date: new Date().toISOString(),
      temperature: '25°C',
      tempMax: '28°C',
      tempMin: '20°C',
      windSpeed: '15 km/h',
      humidity: '60%',
      weatherDescription: 'Sunny',
      weatherIcon: '/weather-icon.png',
      pressure: '1015 hPa',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when isLoading is true', () => {
    render(
      <WeatherForNextDays
        data={null}
        isLoading={true}
        isError={false}
        isWeatherMainLoading={false}
        error={null}
      />
    );

    expect(screen.getByTestId('forecast-loader')).toBeInTheDocument();
  });

  test('renders loading state when isWeatherMainLoading is true', () => {
    render(
      <WeatherForNextDays
        data={null}
        isLoading={false}
        isError={false}
        isWeatherMainLoading={true}
        error={null}
      />
    );

    expect(screen.getByTestId('forecast-loader')).toBeInTheDocument();
  });

  test('renders error layout when there is an error', () => {
    render(
      <WeatherForNextDays
        data={null}
        isLoading={false}
        isError={true}
        isWeatherMainLoading={false}
        error={{ message: 'Network error' }}
      />
    );

    expect(screen.getByTestId('error-layout')).toHaveTextContent(
      'Unable to fetch forecast!'
    );
  });

  test('renders forecast data correctly', () => {
    render(
      <WeatherForNextDays
        data={mockForecastData}
        isLoading={false}
        isError={false}
        isWeatherMainLoading={false}
        error={null}
      />
    );

    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('High: 28°C')).toBeInTheDocument();
    expect(screen.getByText('Low: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Wind: 15 km/h')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60%')).toBeInTheDocument();
  });

  test('handles empty forecast data gracefully', () => {
    render(
      <WeatherForNextDays
        data={[]}
        isLoading={false}
        isError={false}
        isWeatherMainLoading={false}
        error={null}
      />
    );

    expect(screen.queryByText('Today')).not.toBeInTheDocument();
  });
});
