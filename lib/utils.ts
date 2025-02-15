import { ForecastType, Weather } from '@/components/pages/home-page/types';
import {
  OpenWeatherAPIResponse,
  OpenWeatherForecastResponse,
} from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreetingFromTime = (timeStr?: string): string => {
  if (!timeStr) {
    return '';
  }

  const [time, meridiem] = timeStr.split(' ');
  const [hourStr] = time.split(':');
  let hour = parseInt(hourStr, 10);

  if (meridiem.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (meridiem.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  if (hour >= 5 && hour < 12) {
    return 'Good Morning 🌅';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon ☀️';
  } else {
    return 'Good Evening 🌙';
  }
};

export const localTimeConversion = (dt: number, timezone: number) => {
  return new Date(dt * 1000 + timezone * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const convertAPIDataToWeather = (
  data: OpenWeatherAPIResponse
): Weather => {
  return {
    cityName: data.name,
    country: data.sys.country,
    temperature: `${Math.round(data.main.temp - 273.15)}° C`,
    humidity: `${data.main.humidity}%`,
    windSpeed: `${data.wind.speed} mph`,
    pressure: `${data.main.pressure}`,
    weatherDescription: data.weather[0]?.description || 'No description',
    weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
    localTime: localTimeConversion(data.dt, data.timezone),
    tempHigh: `${Math.round(data.main.temp_max - 273.15)}°`,
    tempLow: `${Math.round(data.main.temp_min - 273.15)}°`,
    coord: {
      lon: data.coord.lon,
      lat: data.coord.lat,
    },
  };
};

export const convertAPIDataToForecast = (
  data: OpenWeatherForecastResponse
): ForecastType[] => {
  const dailyForecastMap = new Map();

  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0];

    if (!dailyForecastMap.has(date) || entry.dt_txt.includes('12:00:00')) {
      dailyForecastMap.set(date, {
        date,
        temperature: `${Math.round(entry.main.temp - 273.15)}° C`,
        humidity: `${entry.main.humidity} %`,
        windSpeed: `${entry.wind.speed} mph`,
        weatherDescription: entry.weather[0].description,
        weatherIcon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
        tempMin: `${Math.round(entry.main.temp_min - 273.15)}°`,
        tempMax: `${Math.round(entry.main.temp_max - 273.15)}°`,
      });
    }
  });

  return Array.from(dailyForecastMap.values());
};
