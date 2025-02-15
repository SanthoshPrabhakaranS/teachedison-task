'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ForecastLoader = () => {
  return (
    <div className='w-full flex flex-row items-center gap-4 justify-center overflow-y-auto'>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Skeleton
            key={index}
            className='w-full min-w-[220px] h-[170px] rounded-lg'
          />
        );
      })}
    </div>
  );
};

export default ForecastLoader;
