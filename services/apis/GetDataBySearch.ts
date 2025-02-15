import { useQuery } from '@tanstack/react-query';
import { AXIOS_INSTANCE } from '../axios/axios';
import { ENDPOINTS } from '../endpoints/endpoints';
import { convertAPIDataToWeather } from '@/lib/utils';

const GetDataBySearch = ({
  city,
  lat,
  lon,
  pathname,
}: {
  city: string;
  lat?: number | undefined;
  lon?: number | undefined;
  pathname?: string;
}) => {
  return useQuery({
    queryKey: ['GetDataBySearch', city, lat, lon],
    queryFn: async () => {
      // Conditional check for pathname to avoid API call on other pages
      if (pathname != '/') {
        return;
      }

      try {
        const res = await AXIOS_INSTANCE.get(ENDPOINTS.weather(city, lat, lon));

        if (res.data.cod !== 200) {
          throw new Error(res.data.message || 'An unknown error occurred');
        }

        return convertAPIDataToWeather(res.data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        console.log('API Error:', errorMessage);
        throw new Error(errorMessage);
      }
    },
    enabled: Boolean(city || (lat && lon)),
    retry: false,
  });
};

export default GetDataBySearch;
