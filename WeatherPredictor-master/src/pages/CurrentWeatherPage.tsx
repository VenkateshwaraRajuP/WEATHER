import React from "react";
import { CurrentWeatherCard } from "../components/weather/CurrentWeatherCard";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorState } from "../components/ui/ErrorState";
import { useWeather } from "../hooks/useWeather";

// Page responsible for displaying the current weather view.
export const CurrentWeatherPage: React.FC = () => {
  const [cityInput, setCityInput] = React.useState("Bengaluru");
  const { loading, error, fetchWeather, resetError, current } = useWeather();

  // Auto-load on first render
  React.useEffect(() => {
    void fetchWeather("Bengaluru");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (): void => {
    void fetchWeather(cityInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (error) resetError();
    setCityInput(event.target.value);
  };

  return (
    <div>
      <h2>Current Weather</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={cityInput}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorState message={error.message} />}
      {current && <CurrentWeatherCard />}
    </div>
  );
};
