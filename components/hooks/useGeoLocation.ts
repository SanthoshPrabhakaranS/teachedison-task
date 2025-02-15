'use client';

import { useEffect, useState } from 'react';
import { Coordinates } from '../pages/home-page/types';
import { toast } from 'sonner';

const useGeoLocation = () => {
  const [coords, setCoords] = useState<Coordinates | null>({
    lat: undefined,
    lon: undefined,
  });
  const [error, setError] = useState<string | GeolocationPositionError>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not working!');
      console.log('Geolocation is not working!');
      toast.error('Geolocation is not working!');
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const errorHandler = (err: GeolocationPositionError) => {
      toast.error(err.message);
      console.log(err);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    return () => {};
  }, []);

  return {
    coords,
    error,
  };
};

export default useGeoLocation;
