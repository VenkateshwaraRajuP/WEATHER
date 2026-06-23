import React from "react";
import WeatherService from "../services/weatherService";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from "../services/types/weather";
import type { ApiError } from "../services/apiClient";

// Shape of the state managed by the useWeather hook.
export interface UseWeatherState {
  city: string | null;
  current: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: ApiError | Error | null;
}

export interface UseWeatherApi {
  fetchWeather: (city: string) => Promise<void>;
  resetError: () => void;
}

export type UseWeatherResult = UseWeatherState & UseWeatherApi;

// Lazy-import context to avoid circular dependency at module load time.
// Components should call useWeather() which will read from context if available.
let WeatherContext: React.Context<UseWeatherResult | null> | null = null;

export function setWeatherContext(ctx: React.Context<UseWeatherResult | null>) {
  WeatherContext = ctx;
}

// Creates a standalone weather state (used inside WeatherProvider).
export const useWeatherState = (): UseWeatherResult => {
  const [city, setCity] = React.useState<string | null>(null);
  const [current, setCurrent] = React.useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = React.useState<ForecastResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ApiError | Error | null>(null);

  const fetchWeather = React.useCallback(async (nextCity: string) => {
    const trimmedCity = nextCity.trim();
    if (!trimmedCity) {
      setError(new Error("City is required."));
      return;
    }
    setCity(trimmedCity);
    setLoading(true);
    setError(null);
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        WeatherService.getCurrentWeather(trimmedCity),
        WeatherService.getForecast(trimmedCity),
      ]);
      setCurrent(currentResponse);
      setForecast(forecastResponse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load weather data."));
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = React.useCallback(() => setError(null), []);

  return { city, current, forecast, loading, error, fetchWeather, resetError };
};

// Hook for components to consume weather state from context.
export const useWeather = (): UseWeatherResult => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = WeatherContext ? React.useContext(WeatherContext) : null;
  if (ctx) return ctx;
  // Fallback: standalone state (e.g. used outside provider)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useWeatherState();
};

