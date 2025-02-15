import { useQuery } from '@tanstack/react-query';
import { AXIOS_INSTANCE } from '../axios/axios';
import { ENDPOINTS } from '../endpoints/endpoints';
import { convertAPIDataToForecast } from '@/lib/utils';

export const GetForecastData = (
  coord: { lat: number; lon: number } | undefined
) => {
  return useQuery({
    queryKey: ['GetForecastData', coord],
    queryFn: async () => {
      const res = await AXIOS_INSTANCE.get(
        ENDPOINTS.forecast(coord ?? { lat: 0, lon: 0 })
      );

      return convertAPIDataToForecast(res.data);
    },
    enabled: !!coord,
  });
};
