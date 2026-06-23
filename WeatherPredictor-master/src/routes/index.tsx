import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { CurrentWeatherPage } from "../pages/CurrentWeatherPage";
import { WeatherHistoryPage } from "../pages/WeatherHistoryPage";
import { ApiFeaturesPage } from "../pages/ApiFeaturesPage";

// Central routing configuration for the application.
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<CurrentWeatherPage />} />
      <Route path={ROUTES.history} element={<WeatherHistoryPage />} />
      <Route path={ROUTES.apiFeatures} element={<ApiFeaturesPage />} />
    </Routes>
  );
};


