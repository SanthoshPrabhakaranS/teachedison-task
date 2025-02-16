'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'sonner';
import { Storage } from '@/lib/Storage';

interface GlobalContextType {
  addLocationToFavorite: (item: string) => void;
  favorites: string[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const globalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error('Context Error');
  }
  return context;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storage = useMemo(() => new Storage(), []);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const list = storage.getItem('favorites') || [];
      setFavorites(list);
    }
  }, [storage]);

  // Add location to favorite
  const addLocationToFavorite = useCallback(
    (item: string) => {
      const favoritesList = storage.getItem('favorites') || [];

      if (favoritesList.includes(item)) {
        const filteredList = favoritesList.filter(
          (city: string) => city != item
        );

        storage.setItem('favorites', filteredList);
        setFavorites(filteredList);
        toast.error('Location removed from favorites!');
        return;
      }

      storage.setItem('favorites', [...favoritesList, item]);
      setFavorites([...favoritesList, item]);
      toast.success('Location added to favorites');
    },
    [storage]
  );

  const values = useMemo(() => {
    return {
      addLocationToFavorite,
      favorites,
      searchInput,
      setSearchInput,
      searchValue,
      setSearchValue,
    };
  }, [
    addLocationToFavorite,
    favorites,
    searchInput,
    searchValue,
    setSearchInput,
    setSearchValue,
  ]);

  return (
    <globalContext.Provider value={values}>{children}</globalContext.Provider>
  );
};
