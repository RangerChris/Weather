import { WeatherProvider } from "../components/weatherComponent";
import WeatherDisplay from "../components/WeatherDisplay";
import { useParams } from "react-router-dom";

const CustomWeatherPage: React.FC = () => {
  const { city } = useParams<{ city?: string }>();
  const actualCity = city ? city : "copenhagen";

  return (
    <>
      <WeatherProvider city={actualCity} cacheDuration={30}>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Weather App</h1>
          <WeatherDisplay />
        </div>
      </WeatherProvider>
    </>
  );
};

export default CustomWeatherPage;
