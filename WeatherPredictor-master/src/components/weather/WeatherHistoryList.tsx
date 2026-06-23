import React from "react";
import { Card } from "../ui/Card";
import { useWeatherHistory } from "../../hooks/useWeatherHistory";

// Renders a list of past weather records (dates, temperatures, conditions, etc.).
export const WeatherHistoryList: React.FC = () => {
  const { history } = useWeatherHistory();

  if (!history) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3 style={{ margin: "0 0 1rem" }}>
        Weather History — {history.city}{history.country ? `, ${history.country}` : ""} ({history.date})
      </h3>
      {history.entries.length === 0 ? (
        <Card>
          <p style={{ margin: 0, color: "#9ca3af" }}>No historical data available for this date.</p>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {history.entries.map((entry, i) => (
            <Card key={i}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: "0.75rem",
                alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Date</div>
                  <div style={{ fontWeight: 600 }}>{entry.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>🌡️ Temperature</div>
                  <div style={{ fontWeight: 600 }}>{Math.round(entry.temperature)}°C</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>💧 Humidity</div>
                  <div>{entry.humidity}%</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>💨 Wind</div>
                  <div>{entry.windSpeed} m/s</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Condition</div>
                  <div style={{ textTransform: "capitalize" }}>{entry.description}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};


