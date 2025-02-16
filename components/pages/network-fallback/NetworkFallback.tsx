'use client';

import Container from '@/components/container';
import useNetworkStatus from '@/components/hooks/useNetworkStatus';
import { Button } from '@/components/ui/button';
import { Icons } from '@/public/assets/icons';
import React from 'react';

const NetworkFallback = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useNetworkStatus();
  return (
    <>
      {isOnline ? (
        children
      ) : (
        <Container className='h-[80vh] flex flex-col gap-2 justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Icons.CloudIcon size={30} />
            <h1 data-testid='title' className='text-lg font-semibold'>
              Network Error!
            </h1>
            <p
              data-testid='description'
              className='text-muted-foreground text-[12px]'
            >
              Please Check your internet connection
            </p>
          </div>
          <Button className='-mt-2.5'>Refresh</Button>
        </Container>
      )}
    </>
  );
};

export default NetworkFallback;
