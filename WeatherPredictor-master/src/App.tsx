import React from "react";
import { AppRoutes } from "./routes";
import { MainLayout } from "./layouts/MainLayout";
import { WeatherProvider } from "./context/WeatherContext";

// Root application component that wires up layout, routing, and global providers.
const App: React.FC = () => {
  return (
    <WeatherProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </WeatherProvider>
  );
};

export default App;


