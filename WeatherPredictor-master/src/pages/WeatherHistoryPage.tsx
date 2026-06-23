import React from "react";
import { WeatherHistoryList } from "../components/weather/WeatherHistoryList";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorState } from "../components/ui/ErrorState";
import { useWeatherHistory } from "../hooks/useWeatherHistory";

// Page responsible for displaying historical weather data.
export const WeatherHistoryPage: React.FC = () => {
  const [cityInput, setCityInput] = React.useState("");
  const [dateInput, setDateInput] = React.useState("");
  const { loading, error, history, fetchHistory, resetError } = useWeatherHistory();

  const handleSearch = (): void => {
    void fetchHistory(cityInput, dateInput);
  };

  return (
    <div>
      <h2>Weather History</h2>
      <p style={{ color: "#9ca3af", margin: "0 0 1rem", fontSize: "0.85rem" }}>
        Search forecast data for a city and date (within the next 5 days).
      </p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={cityInput}
          onChange={(e) => { setCityInput(e.target.value); if (error) resetError(); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => { setDateInput(e.target.value); if (error) resetError(); }}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorState message={error.message} />}
      {history && <WeatherHistoryList />}
    </div>
  );
};
