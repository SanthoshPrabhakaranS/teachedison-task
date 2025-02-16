import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastType } from './types';
import { format } from 'date-fns';
import ForecastLoader from '../../loaders/ForecastLoader';
import ErrorLayout from '../../error-body';
import Image from 'next/image';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Icons } from '@/public/assets/icons';

interface WeatherForNextDaysProps {
  data: ForecastType[] | null;
  isLoading: boolean;
  isError: boolean;
  isWeatherMainLoading: boolean;
  error: Error | null | { message: string };
}

const WeatherForNextDays: FC<WeatherForNextDaysProps> = ({
  data,
  isLoading,
  isError,
  isWeatherMainLoading,
  error,
}) => {
  if (isLoading || isWeatherMainLoading) {
    return <ForecastLoader />;
  }

  if (isError) {
    return (
      <ErrorLayout
        className='h-[30vh]'
        description='Unable to fetch forecast!'
        error={error}
      />
    );
  }

  return (
    <ScrollContainer className='w-full flex flex-row items-center gap-4 overflow-x-scroll hover:cursor-grab select-none'>
      {data?.map((day, Idx: number) => {
        return (
          <Card key={Idx} className='text-center w-full min-w-[220px]'>
            <CardHeader>
              <CardTitle className='text-[16px] md:text-[20px]'>
                {format(day.date, 'EEEE') === format(new Date(), 'EEEE')
                  ? 'Today'
                  : format(day.date, 'EEEE')}
              </CardTitle>
            </CardHeader>
            <CardContent className='w-full flex flex-col items-center whitespace-nowrap'>
              <p className='text-[25px] md:text-[25px] font-semibold'>
                {day.temperature}
              </p>

              <div className='w-full flex flex-row items-center justify-between gap-2 mt-1'>
                <div className='flex flex-col gap-1 items-center -ml-1'>
                  <Image
                    src={day.weatherIcon}
                    alt='weather-icon'
                    width={50}
                    height={50}
                  />
                  <p className='max-md:text-[11px] text-[12px] font-medium text-muted-foreground whitespace-nowrap'>
                    {day.weatherDescription}
                  </p>
                </div>

                <div className='flex flex-col gap-1 text-[8px] sm:text-[10px] font-semibold'>
                  <div className='flex flex-row items-center gap-1'>
                    <Icons.ThermometerIcon size={12} />
                    <p className=''>High: {day.tempMax}</p>
                  </div>
                  <div className='flex flex-row items-center gap-1'>
                    <Icons.ThermometerIcon size={12} />
                    <p className=''>Low: {day.tempMin}</p>
                  </div>
                  <div className='flex flex-row items-center gap-1'>
                    <Icons.WindIcon size={12} />
                    <p className=''>Wind: {day.windSpeed}</p>
                  </div>
                  <div className='flex flex-row items-center gap-1'>
                    <Icons.DropletsIcon size={12} />
                    <p className=''>Humidity: {day.humidity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </ScrollContainer>
  );
};

export default WeatherForNextDays;
