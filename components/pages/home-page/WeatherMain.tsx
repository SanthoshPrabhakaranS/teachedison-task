'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Weather } from './types';
import { cn, getGreetingFromTime } from '@/lib/utils';
import WeatherMainLoader from '../../loaders/WeatherMainLoader';
import { Icons } from '@/public/assets/icons';
import DynamicMap from '@/components/map/DynamicMap';

interface WeatherMainProps {
  data: Weather | undefined;
  loading: boolean;
  error: boolean;
  addLocationToFavorite: (item: string) => void;
  favorites: string[];
}

const WeatherMain: FC<WeatherMainProps> = ({
  data,
  loading,
  addLocationToFavorite,
  favorites,
}) => {
  const isFavorite = favorites.some((favorite) => favorite === data?.cityName);

  if (loading) {
    return <WeatherMainLoader />;
  }

  return (
    <div className='w-full h-full flex flex-row items-center justify-center gap-10 mt-[3rem] relative'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className='w-full flex flex-row justify-between items-start'>
          <p className='text-[14px] lg:text-[18px] font-semibold'>
            {data?.cityName}, {data?.country}
          </p>

          <div className='flex flex-row gap-6 items-start'>
            <Icons.HeartIcon
              onClick={() => addLocationToFavorite(data?.cityName as string)}
              className={cn(
                'mt-1 hover:fill-red-500 cursor-pointer transition-colors',
                isFavorite ? 'fill-red-500' : 'fill-none'
              )}
            />
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] lg:text-[18px] font-semibold'>
                {getGreetingFromTime(data?.localTime)}
              </p>
              <p className='text-[14px] font-medium'>{data?.localTime}</p>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col xl:flex-row items-center justify-center gap-[2.5rem]'>
          <div className='flex flex-row items-center gap-5'>
            <div className='flex flex-col items-center gap-5'>
              <h1 className='text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-bold'>
                {data?.temperature}
              </h1>

              <div className='flex flex-row items-center gap-2 mr-5 -mt-10'>
                <Image
                  src={data?.weatherIcon as string}
                  alt='weather-icon'
                  className='w-[90px] lg:w-[100px] h-[90px] lg:h-[100px]'
                  width={100}
                  height={100}
                />
                <p className='text-[20px] lg:text-[30px]'>
                  {data?.weatherDescription}
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-2 font-semibold text-[14px] lg:text-[16px]'>
              <div className='flex flex-row items-center gap-4'>
                <Icons.WindIcon />
                <p>{data?.windSpeed}</p>
              </div>
              <div className='flex flex-row items-center gap-4'>
                <Icons.DropletsIcon />
                <p>{data?.humidity}</p>
              </div>
            </div>
          </div>

          <div className='w-full max-w-[500px] h-[300px]'>
            <DynamicMap lat={data?.coord.lat} lon={data?.coord.lon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMain;
