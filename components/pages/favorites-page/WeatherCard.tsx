'use client';

import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import { Weather } from '../home-page/types';
import { CircleGauge, Droplets, ThermometerSun, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherCardProps {
  favorite: Weather;
  addLocationToFavorite: (item: string) => void;
}

const WeatherCard: FC<WeatherCardProps> = ({
  favorite,
  addLocationToFavorite,
}) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <p>
            {favorite.cityName}, {favorite.country}
          </p>

          <p className='text-sm'>{favorite.localTime}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-row justify-between items-center gap-5'>
        <div className='flex flex-col'>
          <p className='text-[40px] font-bold'>{favorite.temperature}</p>
          <Image src={favorite.weatherIcon} alt='icon' width={70} height={70} />
          <p className='text-sm font-medium text-muted-foreground'>
            {favorite.weatherDescription}
          </p>
        </div>

        <div className='flex flex-col gap-1 text-[8px] sm:text-[13px] font-semibold'>
          <div className='flex flex-row items-center gap-1'>
            <ThermometerSun size={15} />
            <p className=''>High: {favorite.tempHigh}</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <ThermometerSun size={15} />
            <p className=''>Low: {favorite.tempLow}</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <Wind size={15} />
            <p className=''>Wind: {favorite.windSpeed}</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <Droplets size={15} />
            <p className=''>Humidity: {favorite.humidity}</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <CircleGauge size={15} />
            <p className=''>Pressure: {favorite.pressure}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => addLocationToFavorite(favorite.cityName)}
          className='w-full'
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
