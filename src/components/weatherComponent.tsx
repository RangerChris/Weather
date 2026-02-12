import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { WeatherContext, WeatherData } from "../contexts/WeatherContext";

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
