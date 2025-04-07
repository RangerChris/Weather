import { useState } from "react";
import { useWeather } from "./weatherComponent";

const WeatherDisplay = () => {
  const { weatherData, loading, error, refreshWeather } = useWeather();
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "air">(
    "overview"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
        <button className="btn btn-sm" onClick={() => refreshWeather()}>
          Retry
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No weather data available</span>
        </div>
      </div>
    );
  }

  const { location, current } = weatherData;

  const airQualityIndex = current.air_quality?.["us-epa-index"] || 0;

  // Get air quality rating text
  const getAirQualityText = (index: number) => {
    switch (index) {
      case 1:
        return { text: "Good", color: "text-success" };
      case 2:
        return { text: "Moderate", color: "text-warning" };
      case 3:
        return {
          text: "Unhealthy for sensitive groups",
          color: "text-warning",
        };
      case 4:
        return { text: "Unhealthy", color: "text-error" };
      case 5:
        return { text: "Very Unhealthy", color: "text-error" };
      case 6:
        return { text: "Hazardous", color: "text-error" };
      default:
        return { text: "Unknown", color: "text-info" };
    }
  };

  // Format dates
  const lastUpdated = new Date(current.last_updated);
  const formattedTime = lastUpdated.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const airQuality = getAirQualityText(airQualityIndex);

  return (
    <div className="card w-full bg-base-100 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-neutral to-secondary text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">{location.name}</h2>
            <p className="opacity-80">
              {location.region}, {location.country}
            </p>
            <p className="text-xs opacity-70">
              Local time: {location.localtime}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-5xl font-bold">{current.temp_c}°C</div>
            <div className="text-lg">Feels like {current.feelslike_c}°C</div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="w-20 h-20 mr-3"
          />
          <div className="text-xl">{current.condition.text}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1 mx-4 mt-4 rounded-lg">
        <a
          className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </a>
        <a
          className={`tab ${activeTab === "details" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </a>
        {current.air_quality && (
          <a
            className={`tab ${activeTab === "air" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("air")}
          >
            Air Quality
          </a>
        )}
      </div>

      {/* Content area */}
      <div className="card-body">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Wind</div>
              <div className="stat-value text-2xl">{current.wind_kph} km/h</div>
              <div className="stat-desc">
                Direction: {current.wind_dir} ({current.wind_degree}°)
              </div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Humidity</div>
              <div className="stat-value text-2xl">{current.humidity}%</div>
              <div className="stat-desc">Dew point: {current.dewpoint_c}°C</div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Pressure</div>
              <div className="stat-value text-2xl">
                {current.pressure_mb} mb
              </div>
              <div className="stat-desc">{current.pressure_in} inHg</div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Visibility</div>
              <div className="stat-value text-2xl">{current.vis_km} km</div>
              <div className="stat-desc">{current.vis_miles} miles</div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">UV Index</div>
              <div className="stat-value text-2xl">{current.uv}</div>
              <div className="stat-desc">
                {current.uv === 0
                  ? "Low"
                  : current.uv < 3
                  ? "Low"
                  : current.uv < 6
                  ? "Moderate"
                  : current.uv < 8
                  ? "High"
                  : current.uv < 11
                  ? "Very High"
                  : "Extreme"}
              </div>
            </div>

            {current.air_quality && (
              <div className="stat bg-base-200 rounded-box p-4">
                <div className="stat-title">Air Quality</div>
                <div className={`stat-value text-2xl ${airQuality.color}`}>
                  {airQuality.text}
                </div>
                <div className="stat-desc">
                  EPA Index: {current.air_quality["us-epa-index"]}
                </div>
              </div>
            )}

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Cloud Cover</div>
              <div className="stat-value text-2xl">{current.cloud}%</div>
              <div className="stat-desc">
                {current.cloud < 30
                  ? "Clear"
                  : current.cloud < 70
                  ? "Partly cloudy"
                  : "Overcast"}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Precipitation</div>
              <div className="stat-value text-2xl">{current.precip_mm} mm</div>
              <div className="stat-desc">{current.precip_in} in</div>
            </div>

            <div className="stat bg-base-200 rounded-box p-4">
              <div className="stat-title">Wind Gusts</div>
              <div className="stat-value text-2xl">{current.gust_kph} km/h</div>
              <div className="stat-desc">{current.gust_mph} mph</div>
            </div>
          </div>
        )}

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <tbody>
                  <tr>
                    <td className="font-medium">Temperature</td>
                    <td>
                      {current.temp_c}°C / {current.temp_f}°F
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Feels Like</td>
                    <td>
                      {current.feelslike_c}°C / {current.feelslike_f}°F
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Wind Chill</td>
                    <td>
                      {current.windchill_c}°C / {current.windchill_f}°F
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Heat Index</td>
                    <td>
                      {current.heatindex_c}°C / {current.heatindex_f}°F
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Wind</td>
                    <td>
                      {current.wind_kph} km/h ({current.wind_mph} mph)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Wind Direction</td>
                    <td>
                      {current.wind_dir} ({current.wind_degree}°)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Wind Gust</td>
                    <td>
                      {current.gust_kph} km/h ({current.gust_mph} mph)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Precipitation</td>
                    <td>
                      {current.precip_mm} mm ({current.precip_in} in)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Cloud Cover</td>
                    <td>{current.cloud}%</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Humidity</td>
                    <td>{current.humidity}%</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Pressure</td>
                    <td>
                      {current.pressure_mb} mb ({current.pressure_in} inHg)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Visibility</td>
                    <td>
                      {current.vis_km} km ({current.vis_miles} miles)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">UV Index</td>
                    <td>{current.uv}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Dew Point</td>
                    <td>
                      {current.dewpoint_c}°C ({current.dewpoint_f}°F)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Is Day</td>
                    <td>{current.is_day ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Last Updated</td>
                    <td>{current.last_updated}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Location Coordinates</td>
                    <td>
                      {location.lat}, {location.lon}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Timezone</td>
                    <td>{location.tz_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AIR QUALITY TAB */}
        {activeTab === "air" && current.air_quality && (
          <div>
            <div className="mb-4">
              <div
                className={`alert bg-gradient-to-r ${
                  airQualityIndex <= 1
                    ? "from-success to-success-dark"
                    : airQualityIndex <= 3
                    ? "from-warning to-warning-dark"
                    : "from-error to-error-dark"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Air Quality Index: {airQuality.text}</strong>
                  <br />
                  US EPA Index: {current.air_quality["us-epa-index"]}
                  {current.air_quality["gb-defra-index"] &&
                    ` | UK DEFRA Index: ${current.air_quality["gb-defra-index"]}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "PM2.5",
                  value: current.air_quality.pm2_5,
                  unit: "µg/m³",
                  desc: "Fine particulate matter",
                },
                {
                  name: "PM10",
                  value: current.air_quality.pm10,
                  unit: "µg/m³",
                  desc: "Inhalable particles",
                },
                {
                  name: "Carbon Monoxide",
                  value: current.air_quality.co,
                  unit: "µg/m³",
                  desc: "CO",
                },
                {
                  name: "Nitrogen Dioxide",
                  value: current.air_quality.no2,
                  unit: "µg/m³",
                  desc: "NO₂",
                },
                {
                  name: "Ozone",
                  value: current.air_quality.o3,
                  unit: "µg/m³",
                  desc: "O₃",
                },
                {
                  name: "Sulphur Dioxide",
                  value: current.air_quality.so2,
                  unit: "µg/m³",
                  desc: "SO₂",
                },
              ].map((pollutant, index) => (
                <div
                  key={index}
                  className="stat rounded-box p-4 shadow-lg bg-gradient-to-r from-white to-gray-200"
                >
                  <div className="stat-title">{pollutant.name}</div>
                  <div className="stat-value text-2xl">
                    {pollutant.value.toFixed(1)}
                  </div>
                  <div className="stat-desc">
                    {pollutant.unit} - {pollutant.desc}
                  </div>
                  <progress
                    className={`progress w-full mt-2 progress-accent`}
                    value={
                      index === 0
                        ? Math.min(100, (pollutant.value / 50) * 100) // PM2.5
                        : index === 1
                        ? Math.min(100, (pollutant.value / 100) * 100) // PM10
                        : index === 2
                        ? Math.min(100, (pollutant.value / 4000) * 100) // CO
                        : index === 3
                        ? Math.min(100, (pollutant.value / 40) * 100) // NO2
                        : index === 4
                        ? Math.min(100, (pollutant.value / 100) * 100) // O3
                        : Math.min(100, (pollutant.value / 40) * 100) // SO2
                    }
                    max="100"
                  ></progress>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Last updated: {formattedTime}</span>
          <button onClick={() => refreshWeather()} className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
