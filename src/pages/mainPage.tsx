import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getWeather = () => {
    if (city) {
      navigate(`/weather/${encodeURIComponent(city)}`, { replace: true });
    }
  };

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Weather app</h1>
            <p className="py-6">
              Welcome to the simple weather app. Like so many other similar
              applications, you can enter a city and get the weather data for
              the area.
            </p>
            <form>
              <fieldset>
                <input
                  type="text"
                  name="city"
                  className="input"
                  placeholder="City name"
                  value={city}
                  onChange={handleInputChange}
                />
                <button className="btn btn-primary ml-4" onClick={getWeather}>Go</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;