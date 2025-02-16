import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherClient from '../WeatherClient';
import { Weather } from '../types';
import { GlobalContextProvider } from '@/components/providers/GlobalContextProvider';
import useGeoLocation from '../../../hooks/useGeoLocation';
import GetDataBySearch from '@/services/apis/GetDataBySearch';
import GetForecastData from '../../../../services/apis/GetForecastData';

jest.mock('../../../hooks/useGeoLocation', () => jest.fn());
jest.mock('../../../../services/apis/GetDataBySearch', () => jest.fn());
jest.mock('../../../../services/apis/GetForecastData', () =>
  jest.fn(() => ({
    data: {},
    isError: false,
  }))
);

jest.mock('../WeatherMain', () => {
  const WeatherMain = () => <div data-testid='weather-main' />;
  WeatherMain.displayName = 'WeatherMain';
  return WeatherMain;
});

jest.mock('../WeatherForNextDays', () => {
  const WeatherForNextDays = () => <div data-testid='weather-forecast' />;
  WeatherForNextDays.displayName = 'WeatherForNextDays';
  return WeatherForNextDays;
});

jest.mock('../../../error-body/ErrorLayout', () => {
  const ErrorLayout = () => <div data-testid='error-layout' />;
  ErrorLayout.displayName = 'ErrorLayout';
  return ErrorLayout;
});

describe('WeatherClient Component', () => {
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

  beforeEach(() => {
    (useGeoLocation as jest.Mock).mockReturnValue({
      coords: { lat: 40.7128, lon: -74.006 },
    });
  });

  test('shows error layout when there is an error', () => {
    (GetDataBySearch as jest.Mock).mockReturnValue({
      data: {},
      isError: true,
    });

    render(
      <GlobalContextProvider>
        <WeatherClient data={undefined} />
      </GlobalContextProvider>
    );

    expect(screen.getByTestId('error-layout')).toBeInTheDocument();
  });

  test('renders WeatherMain and WeatherForNextDays when data is available', () => {
    (GetDataBySearch as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isError: false,
    });
    (GetForecastData as jest.Mock).mockReturnValue({
      data: {},
      isError: false,
    });

    render(
      <GlobalContextProvider>
        <WeatherClient data={mockWeatherData} />
      </GlobalContextProvider>
    );

    expect(screen.getByTestId('weather-main')).toBeInTheDocument();
    expect(screen.getByTestId('weather-forecast')).toBeInTheDocument();
  });
});
