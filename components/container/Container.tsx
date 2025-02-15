'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-[1500px] mx-auto px-3 md:px-6 py-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
