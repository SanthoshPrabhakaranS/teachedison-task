'use client';

import React, { FC } from 'react';
import { Weather } from '../home-page/types';
import WeatherCard from './WeatherCard';
import FavoriteCardLoader from '@/components/loaders/FavoriteCardLoader';
import ErrorLayout from '@/components/error-body';

interface PageBodyProps {
  data: Weather[] | undefined;
  isLoading: boolean;
  isError?: boolean;
  addLocationToFavorite: (item: string) => void;
}

const PageBody: FC<PageBodyProps> = ({
  data,
  addLocationToFavorite,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <FavoriteCardLoader />;
  }

  if (isError) {
    return (
      <ErrorLayout
        className='font-semibold text-lg'
        description='Something went wrong!'
      />
    );
  }

  if (data?.length === 0 || !data) {
    return (
      <div className='w-full flex justify-center items-center h-[50vh]'>
        <p className='font-semibold'>No data found!</p>
      </div>
    );
  }

  return (
    <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {data?.map((favorite, Idx) => {
        return (
          <WeatherCard
            key={Idx}
            favorite={favorite}
            addLocationToFavorite={addLocationToFavorite}
          />
        );
      })}
    </div>
  );
};

export default PageBody;
