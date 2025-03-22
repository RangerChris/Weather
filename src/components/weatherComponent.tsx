import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: AirQuality;
}

interface WeatherData {
  location: Location;
  current: Current;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
  city: string;
  cacheDuration?: number; // in minutes
}

export const WeatherProvider = ({
  children,
  city = "",
  cacheDuration = 30,
}: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey) {
        throw new Error("Weather API key is missing");
      }

      const response = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: apiKey,
            q: cityName,
            aqi: "yes",
          },
        }
      );

      const data = response.data as WeatherData;

      localStorage.setItem(
        "weatherData",
        JSON.stringify({
          data,
          timestamp: new Date().getTime(),
          city: cityName,
        })
      );

      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async (cityName: string = city) => {
    await fetchWeather(cityName);
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      const cachedData = localStorage.getItem("weatherData");

      if (cachedData) {
        const { data, timestamp, city: cachedCity } = JSON.parse(cachedData);
        const ageInMinutes = (new Date().getTime() - timestamp) / (1000 * 60);

        if (ageInMinutes < cacheDuration && cachedCity === city) {
          setWeatherData(data);
          setLoading(false);
          return;
        }
      }

      await fetchWeather(city);
    };

    loadWeatherData();
  }, [city, cacheDuration]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, refreshWeather }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const GetWeatherComponent: React.FC = () => {
  return null;
};

export default GetWeatherComponent;
