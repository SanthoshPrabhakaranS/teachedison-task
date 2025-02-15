import WeatherClient from '@/components/pages/home-page';
import { DEFAULT_CITY } from '@/lib/constants';
import { convertAPIDataToWeather } from '@/lib/utils';
import { AXIOS_INSTANCE } from '@/services/axios/axios';
import { ENDPOINTS } from '@/services/endpoints/endpoints';

async function getWeather() {
  try {
    // return {
    //   cityName: 'New York',
    //   temperature: `270`,
    //   humidity: `20`,
    //   windSpeed: `20`,
    //   pressure: `20`,
    //   weatherDescription: 'Rain',
    //   weatherIcon: 'https://openweathermap.org/img/wn/10d@2x.png',
    //   country: 'US',
    //   localTime: '10:00 AM',
    //   tempHigh: `30`,
    //   tempLow: `10`,
    //   coord: {
    //     lon: -74.006,
    //     lat: 40.7143,
    //   },
    // };

    const response = await AXIOS_INSTANCE.get(ENDPOINTS.weather(DEFAULT_CITY));

    if (!response.data) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.data;

    return convertAPIDataToWeather(data);
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const weatherData = await getWeather();

  return (
    <div>
      <WeatherClient data={weatherData} />
    </div>
  );
}
