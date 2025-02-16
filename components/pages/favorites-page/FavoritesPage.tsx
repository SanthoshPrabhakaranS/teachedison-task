'use client';

import React, { useCallback, useMemo } from 'react';
import GetDataForAllCities from '@/services/apis/GetDataForAllCities';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/components/providers/GlobalContextProvider';
import PageBody from './PageBody';
import { Icons } from '@/public/assets/icons';

const FavoritesPage = () => {
  const { data, isLoading, isError } = GetDataForAllCities();
  const { addLocationToFavorite, searchInput, setSearchInput, setSearchValue } =
    useGlobalContext();
  const router = useRouter();

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.cityName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [data, searchInput]);

  const handleBack = useCallback(() => {
    setSearchInput('');
    setSearchValue('');
    router.back();
  }, [router, setSearchInput, setSearchValue]);

  return (
    <div className='w-full flex flex-col gap-5 mt-[4rem]'>
      <div
        className='flex flex-row items-center gap-2 cursor-pointer'
        onClick={handleBack}
      >
        <Icons.ArrowLeftIcon size={20} />
        <p className='font-semibold text-[20px]'>Favorite Locations</p>
      </div>

      <PageBody
        data={filteredData}
        isLoading={isLoading}
        isError={isError}
        addLocationToFavorite={addLocationToFavorite}
      />
    </div>
  );
};

export default FavoritesPage;
