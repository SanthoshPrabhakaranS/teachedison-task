import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherMain from '../WeatherMain';
import { Weather } from '../types';
import Image, { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => <Image alt={props.alt} src={props.src} />,
}));

jest.mock('../../../loaders/WeatherMainLoader', () =>
  jest.fn(() => <div data-testid='weather-loader' />)
);
jest.mock('../../../../components/map/DynamicMap', () =>
  jest.fn(() => <div data-testid='map' />)
);

jest.mock('lucide-react', () => ({
  Heart: () => <svg data-testid='heart-icon'></svg>,
  Wind: () => <svg data-testid='wind-icon'></svg>,
  Droplets: () => <svg data-testid='humidity-icon'></svg>,
}));

describe('WeatherMain Component', () => {
  const mockWeatherData: Weather = {
    cityName: 'New York',
    country: 'USA',
    localTime: '12:00 PM',
    temperature: '25°C',
    weatherIcon: '/weather-icon.png',
    weatherDescription: 'Sunny',
    tempHigh: '30°C',
    tempLow: '20°C',
    windSpeed: '10 km/h',
    humidity: '50%',
    pressure: '1015 hPa',
    coord: { lat: 40.7128, lon: -74.006 },
  };

  const mockAddLocationToFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when loading is true', () => {
    render(
      <WeatherMain
        data={undefined}
        loading={true}
        error={false}
        addLocationToFavorite={mockAddLocationToFavorite}
        favorites={[]}
      />
    );

    expect(screen.getByTestId('weather-loader')).toBeInTheDocument();
  });

  test('displays weather data correctly', () => {
    render(
      <WeatherMain
        data={mockWeatherData}
        loading={false}
        error={false}
        addLocationToFavorite={mockAddLocationToFavorite}
        favorites={[]}
      />
    );

    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByAltText('weather-icon')).toHaveAttribute(
      'src',
      '/weather-icon.png'
    );
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('renders map correctly with coordinates', () => {
    render(
      <WeatherMain
        data={mockWeatherData}
        loading={false}
        error={false}
        addLocationToFavorite={mockAddLocationToFavorite}
        favorites={[]}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
