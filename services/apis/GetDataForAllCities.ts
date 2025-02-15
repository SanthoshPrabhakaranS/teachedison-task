import { useGlobalContext } from '@/components/providers/GlobalContextProvider';
import { useQuery } from '@tanstack/react-query';
import { AXIOS_INSTANCE } from '../axios/axios';
import { ENDPOINTS } from '../endpoints/endpoints';
import { convertAPIDataToWeather } from '@/lib/utils';

const GetDataForAllCities = () => {
  const { favorites } = useGlobalContext();

  return useQuery({
    queryKey: ['GetDataForAllCities', favorites],
    queryFn: async () => {
      if (favorites.length === 0) {
        return;
      }

      const response = await Promise.all(
        favorites.map(async (city) => {
          const res = await AXIOS_INSTANCE.get(ENDPOINTS.weather(city));
          return convertAPIDataToWeather(res.data);
        })
      );

      return response;
    },
    enabled: Boolean(favorites.length),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
};

export default GetDataForAllCities;
