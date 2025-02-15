'use client';

import React, { useCallback, useEffect } from 'react';
import { Input } from '../ui/input';
import ThemeToggle from '../toggle-theme';
import { useWindowWidth } from '../hooks/useWindowWidth';
import MenuOptions from './MenuOptions';
import { useGlobalContext } from '../providers/GlobalContextProvider';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

const Header = () => {
  const windowWidth = useWindowWidth();
  const router = useRouter();
  const { searchInput, setSearchInput, setSearchValue } = useGlobalContext();

  // Debounce search input
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 1000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleRouteToHome = useCallback(() => {
    setSearchInput('');
    setSearchValue('');
    router.push(ROUTES.HOME);
  }, [setSearchInput, setSearchValue, router]);

  // Handle search input change
  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className='sticky z-50 h-[8vh] bg-background top-0 w-full flex flex-row items-center justify-between gap-4'>
      <h1 onClick={handleRouteToHome} className='font-semibold cursor-pointer'>
        {windowWidth > 900 ? 'weather.weather' : 'w.w'}
      </h1>
      <Input
        value={searchInput || ''}
        onChange={handleOnInputChange}
        containerClassName='rounded-full w-full max-w-[500px] lg:mr-[5rem] max-lg:h-[40px]'
        placeholder='Search by City or Zipcode...'
      />

      <div className='flex flex-row items-center gap-2'>
        <ThemeToggle />
        <MenuOptions />
      </div>
    </div>
  );
};

export default Header;
