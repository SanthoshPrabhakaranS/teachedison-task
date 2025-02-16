import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/public/assets/icons';

interface InputProps extends React.ComponentProps<'input'> {
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, containerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-md border border-gray-300 bg-background px-3 py-2 flex flex-row items-center gap-2 h-[50px]',
          containerClassName
        )}
      >
        <Icons.SearchIcon size={20} />
        <input
          type={type}
          className={cn(
            'flex w-full ring-offset-background bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
