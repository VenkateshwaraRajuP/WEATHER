import React from "react";
import { useWeatherState, setWeatherContext } from "../hooks/useWeather";
import type { UseWeatherResult } from "../hooks/useWeather";

// React context for exposing weather state and actions across the app.
export const WeatherContext = React.createContext<UseWeatherResult | null>(null);

// Register the context so useWeather() hook can consume it.
setWeatherContext(WeatherContext);

// Provider component that initializes and provides weather state to descendants.
export const WeatherProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const weather = useWeatherState();

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};


