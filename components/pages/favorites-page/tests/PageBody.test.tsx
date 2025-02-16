import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageBody from '../PageBody';
import { Weather } from '../../home-page/types';

jest.mock('../../../loaders/FavoriteCardLoader', () => {
  const FavoriteCardLoader = () => <div data-testid='favorite-card-loader' />;
  FavoriteCardLoader.displayName = 'FavoriteCardLoader';
  return FavoriteCardLoader;
});

jest.mock('../../../error-body', () => {
  const ErrorLayout = ({ description }: { description: string }) => (
    <div data-testid='error-layout'>{description}</div>
  );
  ErrorLayout.displayName = 'ErrorLayout';
  return ErrorLayout;
});

jest.mock('../WeatherCard', () => {
  const WeatherCard = ({ favorite }: { favorite: Weather }) => (
    <div data-testid='weather-card'>{favorite.cityName}</div>
  );
  WeatherCard.displayName = 'WeatherCard';
  return WeatherCard;
});

describe('PageBody Component', () => {
  test('renders loader when loading', () => {
    render(
      <PageBody
        data={undefined}
        isLoading={true}
        addLocationToFavorite={jest.fn()}
      />
    );
    expect(screen.getByTestId('favorite-card-loader')).toBeInTheDocument();
  });

  test('renders "No data found!" when data is empty', () => {
    render(
      <PageBody data={[]} isLoading={false} addLocationToFavorite={jest.fn()} />
    );
    expect(screen.getByText('No data found!')).toBeInTheDocument();
  });

  test('renders error layout when an error occurs', () => {
    render(
      <PageBody
        data={undefined}
        isLoading={false}
        isError={true}
        addLocationToFavorite={jest.fn()}
      />
    );
    expect(screen.getByTestId('error-layout')).toHaveTextContent(
      'Something went wrong!'
    );
  });

  test('renders correct number of WeatherCard components', () => {
    const mockData: Weather[] = [
      {
        cityName: 'New York',
        temperature: '20',
        coord: { lat: 40.7128, lon: -74.006 },
        country: 'US',
        humidity: '50',
        localTime: '2021-10-10T10:00:00',
        pressure: '1013',
        tempHigh: '25',
        tempLow: '15',
        weatherDescription: 'Cloudy',
        weatherIcon: '01d',
        windSpeed: '5',
      },
    ];
    render(
      <PageBody
        data={mockData}
        isLoading={false}
        addLocationToFavorite={jest.fn()}
      />
    );
    expect(screen.getAllByTestId('weather-card')).toHaveLength(mockData.length);
  });
});
