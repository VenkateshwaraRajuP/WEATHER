import React from "react";
import { WeatherMetricGrid } from "../components/weather/WeatherMetricGrid";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorState } from "../components/ui/ErrorState";
import { useWeather } from "../hooks/useWeather";

// Page exposing all major weather API features (forecast, humidity, wind, etc.).
export const ApiFeaturesPage: React.FC = () => {
  const [cityInput, setCityInput] = React.useState("");
  const { forecast, loading, error, fetchWeather, resetError } = useWeather();

  const handleSearch = (): void => {
    void fetchWeather(cityInput);
  };

  return (
    <div>
      <h2>API Features — Forecast</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={cityInput}
          onChange={(e) => { setCityInput(e.target.value); if (error) resetError(); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorState message={error.message} />}
      {forecast && <WeatherMetricGrid />}
    </div>
  );
};
