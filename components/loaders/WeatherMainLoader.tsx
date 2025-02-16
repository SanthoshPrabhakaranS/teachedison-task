'use client';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

const WeatherMainLoader = () => {
  return (
    <div
      data-testid='weather-main-loader'
      className='w-full h-full flex flex-row items-center justify-center gap-10 mt-[3rem] relative'
    >
      <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
        <div className='w-full flex flex-row justify-between items-cente gap-10'>
          <Skeleton
            data-testid='skeleton-loader'
            className='w-full max-w-[200px] h-10'
          />

          <Skeleton
            data-testid='skeleton-loader'
            className='w-full max-w-[200px] h-14'
          />
        </div>

        <div className='w-full flex flex-row items-center gap-5'>
          <div className='w-full flex flex-col items-center gap-5'>
            <Skeleton
              data-testid='skeleton-loader'
              className='w-full max-w-[200px] h-10'
            />

            <Skeleton
              data-testid='skeleton-loader'
              className='w-full max-w-[250px] h-[200px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMainLoader;
