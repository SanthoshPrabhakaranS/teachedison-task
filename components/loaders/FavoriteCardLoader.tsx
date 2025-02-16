'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FavoriteCardLoader = () => {
  return (
    <div
      data-testid='favorite-card-loader'
      className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
    >
      {Array.from({ length: 8 }).map((_, index) => {
        return (
          <Skeleton
            data-testid='skeleton-loader'
            key={index}
            className='w-full h-[230px] rounded-lg'
          />
        );
      })}
    </div>
  );
};

export default FavoriteCardLoader;
