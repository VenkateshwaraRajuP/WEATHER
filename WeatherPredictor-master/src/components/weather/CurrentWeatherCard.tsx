import React from "react";
import { Card } from "../ui/Card";
import { useWeather } from "../../hooks/useWeather";

// Displays a high-level summary of the current weather for the selected location.
export const CurrentWeatherCard: React.FC = () => {
  const { current } = useWeather();

  if (!current) return null;

  const iconUrl = current.icon
    ? `https://openweathermap.org/img/wn/${current.icon}@2x.png`
    : null;

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        {iconUrl && <img src={iconUrl} alt={current.description} width={64} height={64} />}
        <div>
          <h3 style={{ margin: 0, fontSize: "1.5rem" }}>
            {current.city}{current.country ? `, ${current.country}` : ""}
          </h3>
          <p style={{ margin: "0.25rem 0 0", color: "#9ca3af", textTransform: "capitalize" }}>
            {current.description}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        <Metric label="🌡️ Temperature" value={`${Math.round(current.temperature)}°C`} />
        <Metric label="🤔 Feels Like" value={`${Math.round(current.feelsLike)}°C`} />
        <Metric label="💧 Humidity" value={`${current.humidity}%`} />
        <Metric label="💨 Wind Speed" value={`${current.windSpeed} m/s`} />
        <Metric label="🔽 Pressure" value={`${current.pressure} hPa`} />
        {current.windDirection !== undefined && (
          <Metric label="🧭 Wind Direction" value={`${current.windDirection}°`} />
        )}
      </div>

      <p style={{ margin: "1rem 0 0", fontSize: "0.75rem", color: "#6b7280" }}>
        Updated: {new Date(current.timestamp).toLocaleString()}
      </p>
    </Card>
  );
};

const Metric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
  }}>
    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>{label}</div>
    <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>{value}</div>
  </div>
);


