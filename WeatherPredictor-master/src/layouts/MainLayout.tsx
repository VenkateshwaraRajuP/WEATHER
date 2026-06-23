import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

// MainLayout defines the primary application shell (header, nav, content).
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Weather Predictor</h1>
        <nav>
          <ul>
            <li>
              <Link to={ROUTES.home}>Current Weather</Link>
            </li>
            <li>
              <Link to={ROUTES.history}>Weather History</Link>
            </li>
            <li>
              <Link to={ROUTES.apiFeatures}>API Features</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
};


