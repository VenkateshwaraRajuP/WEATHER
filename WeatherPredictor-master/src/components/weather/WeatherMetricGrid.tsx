import React from "react";
import { Card } from "../ui/Card";
import { useWeather } from "../../hooks/useWeather";

// Shows detailed weather metrics (forecast, humidity, wind, etc.) in a grid layout.
export const WeatherMetricGrid: React.FC = () => {
  const { forecast } = useWeather();

  if (!forecast) return null;

  // Show next 8 forecast slots (24 hours at 3h intervals)
  const items = forecast.items.slice(0, 8);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3 style={{ margin: "0 0 1rem" }}>
        24-Hour Forecast — {forecast.city}{forecast.country ? `, ${forecast.country}` : ""}
      </h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "0.75rem",
      }}>
        {items.map((item) => {
          const iconUrl = item.icon
            ? `https://openweathermap.org/img/wn/${item.icon}.png`
            : null;
          const time = new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const date = new Date(item.timestamp).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          });

          return (
            <Card key={item.timestamp}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>{date}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{time}</div>
                {iconUrl && (
                  <img src={iconUrl} alt={item.description} width={40} height={40} />
                )}
                <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {Math.round(item.temperature)}°C
                </div>
                <div style={{ fontSize: "0.7rem", color: "#9ca3af", textTransform: "capitalize", marginBottom: "0.5rem" }}>
                  {item.description}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>💧 {item.humidity}%</div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>💨 {item.windSpeed} m/s</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};


