import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherCard from '../WeatherCard';
import { Weather } from '../../home-page/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid='weather-icon' />
  ),
}));

jest.mock('lucide-react', () => ({
  ThermometerSun: () => <svg data-testid='weather-icon'></svg>,
  Wind: () => <svg data-testid='wind-icon'></svg>,
  Droplets: () => <svg data-testid='droplets-icon'></svg>,
  CircleGauge: () => <svg data-testid='circle-guage-icon'></svg>,
}));

describe('WeatherCard Component', () => {
  const mockFavorite: Weather = {
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

  test('renders weather details correctly', () => {
    render(
      <WeatherCard
        favorite={mockFavorite}
        addLocationToFavorite={mockAddLocationToFavorite}
      />
    );

    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getAllByTestId('weather-icon')[0]).toHaveAttribute(
      'src',
      '/weather-icon.png'
    );
  });

  test('calls addLocationToFavorite when clicking "Remove" button', () => {
    render(
      <WeatherCard
        favorite={mockFavorite}
        addLocationToFavorite={mockAddLocationToFavorite}
      />
    );
    const removeButton = screen.getByRole('button', { name: 'Remove' });

    fireEvent.click(removeButton);
    expect(mockAddLocationToFavorite).toHaveBeenCalledTimes(1);
    expect(mockAddLocationToFavorite).toHaveBeenCalledWith('New York');
  });
});
