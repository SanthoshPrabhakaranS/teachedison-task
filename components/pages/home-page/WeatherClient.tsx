'use client';

import React, { FC, useCallback, useEffect, useState } from 'react';
import Header from '../../header';
import { Weather } from './types';
import WeatherMain from './WeatherMain';
import WeatherForNextDays from './WeatherForNextDays';
import GetDataBySearch from '@/services/apis/GetDataBySearch';
import { GetForecastData } from '@/services/apis/GetForecastData';
import ErrorLayout from '../../error-body/ErrorLayout';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import useGeoLocation from '../../hooks/useGeoLocation';
import { usePathname } from 'next/navigation';

interface WeatherClientProps {
  data: Weather | undefined;
}

const WeatherClient: FC<WeatherClientProps> = ({ data }) => {
  const { addLocationToFavorite, favorites, searchValue } = useGlobalContext();
  const { coords } = useGeoLocation();
  const pathname = usePathname();
  const {
    data: fetchedData,
    isError,
    isLoading: isWeatherMainLoading,
    error,
  } = GetDataBySearch({
    city: searchValue,
    lat: coords?.lat,
    lon: coords?.lon,
    pathname,
  });
  const {
    data: forecastData,
    isError: isForecastError,
    isLoading: isForecastLoading,
    error: forecastError,
  } = GetForecastData(fetchedData?.coord || data?.coord);

  const weatherData = fetchedData || data;

  return (
    <div className='w-full flex flex-col gap-5'>
      {isError || !data ? (
        <ErrorLayout description='Something went wrong' error={error} />
      ) : (
        <div className='flex flex-col gap-12'>
          <WeatherMain
            data={weatherData}
            loading={isWeatherMainLoading}
            error={isError}
            addLocationToFavorite={addLocationToFavorite}
            favorites={favorites}
          />

          <div className='flex flex-col w-full gap-5'>
            <h1 className='text-[16px] lg:text-[20px] font-bold'>
              Next 5 days forecast
            </h1>
            <WeatherForNextDays
              data={forecastData}
              isLoading={isForecastLoading}
              isError={isForecastError}
              isWeatherMainLoading={isWeatherMainLoading}
              error={forecastError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherClient;
