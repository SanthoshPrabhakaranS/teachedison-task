'use client';

import { cn } from '@/lib/utils';
import React, { FC, useCallback } from 'react';
import { Button } from '../ui/button';
import ErrorBody from './ErrorBody';
import { Icons } from '@/public/assets/icons';

interface ErrorLayoutProps {
  description: string;
  className?: string;
  error?: Error | null | { message: string };
}

const ErrorLayout: FC<ErrorLayoutProps> = ({
  description,
  className,
  error,
}) => {
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const renderError = useCallback(() => {
    if (!error) return description;

    if (error.message) {
      switch (error.message) {
        case 'city not found':
          return (
            <ErrorBody
              description='City not found!'
              Icon={<Icons.SearchXIcon size={40} />}
            />
          );

        default:
          return (
            <ErrorBody
              description='Something went Wrong'
              Icon={<Icons.ServerOffIcon size={40} />}
            />
          );
      }
    }
  }, [error, description]);

  return (
    <div
      className={cn(
        'h-[60vh] w-full flex justify-center items-center flex-col gap-5',
        className
      )}
    >
      {renderError()}
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  );
};

export default ErrorLayout;
