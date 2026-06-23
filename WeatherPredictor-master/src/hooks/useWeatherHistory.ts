import React from "react";
import  WeatherService  from "../services/weatherService";
import type { WeatherHistoryResponse } from "../services/types/weather";
import type { ApiError } from "../services/apiClient";

// Shape of the state managed by the useWeatherHistory hook.
export interface UseWeatherHistoryState {
  city: string | null;
  date: string | null;
  history: WeatherHistoryResponse | null;
  loading: boolean;
  error: ApiError | Error | null;
}

export interface UseWeatherHistoryApi {
  /**
   * Fetches weather history for the given city and date.
   */
  fetchHistory: (city: string, date: string) => Promise<void>;
  /**
   * Clears any existing error without changing data.
   */
  resetError: () => void;
}

export type UseWeatherHistoryResult = UseWeatherHistoryState &
  UseWeatherHistoryApi;

// Hook for managing weather history state using WeatherService.
export const useWeatherHistory = (): UseWeatherHistoryResult => {
  const [city, setCity] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<string | null>(null);
  const [history, setHistory] =
    React.useState<WeatherHistoryResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ApiError | Error | null>(null);

  const fetchHistory = React.useCallback(async (nextCity: string, nextDate: string) => {
    const trimmedCity = nextCity.trim();
    const trimmedDate = nextDate.trim();

    if (!trimmedCity) {
      setError(new Error("City is required."));
      return;
    }

    if (!trimmedDate) {
      setError(new Error("Date is required."));
      return;
    }

    setCity(trimmedCity);
    setDate(trimmedDate);
    setLoading(true);
    setError(null);

    try {
      const response = await WeatherService.getWeatherHistory(
        trimmedCity,
        trimmedDate
      );
      setHistory(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Failed to load weather history."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    city,
    date,
    history,
    loading,
    error,
    fetchHistory,
    resetError,
  };
};

