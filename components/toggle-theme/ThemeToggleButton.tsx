'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Icons } from '@/public/assets/icons';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
      className='min-w-[40px]'
      variant='outline'
      size='icon'
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Icons.SunIcon className='h-5 w-5 transition-transform duration-300 rotate-0 scale-100' />
      ) : (
        <Icons.MoonIcon className='h-5 w-5 transition-transform duration-300 rotate-0 scale-100' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleButton;
