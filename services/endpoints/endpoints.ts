export const ENDPOINTS = {
  weather: (city: string, lat?: number, lon?: number) => {
    if (lat && lon && !city) {
      return `/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    } else {
      return `/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    }
  },
  forecast: (coord: {
    lat: number;
    lon: number;
  }) => `/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}
  `,
};
