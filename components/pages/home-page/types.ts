export interface Weather {
  cityName: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  pressure: string;
  weatherDescription: string;
  weatherIcon: string;
  country: string;
  localTime: string;
  tempHigh: string;
  tempLow: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface ForecastType {
  date: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: string;
  humidity: string;
  pressure: string;
  tempMin: string;
  tempMax: string;
}

export interface Coordinates {
  lat?: number;
  lon?: number;
}
