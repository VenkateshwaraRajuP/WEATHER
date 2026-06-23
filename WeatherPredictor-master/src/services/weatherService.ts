import { apiClient } from "./apiClient";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  ForecastItem,
  WeatherHistoryResponse,
  WeatherHistoryEntry,
} from "./types/weather";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;

if (!apiKey) {
  console.error(
    "[weatherService] VITE_WEATHER_API_KEY is not set. Check your .env file."
  );
}

// ── Raw OpenWeatherMap response shapes ───────────────────────────────────────

interface OWMCurrentRaw {
  name: string;
  sys: { country?: string; dt?: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number; deg?: number };
  weather: { description: string; icon?: string }[];
  dt: number;
}

interface OWMForecastItemRaw {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number; deg?: number };
  weather: { description: string; icon?: string }[];
}

interface OWMForecastRaw {
  city: { name: string; country?: string };
  list: OWMForecastItemRaw[];
}

// ── Mappers ──────────────────────────────────────────────────────────────────

function mapCurrent(raw: OWMCurrentRaw): CurrentWeatherResponse {
  return {
    city: raw.name,
    country: raw.sys?.country,
    temperature: raw.main.temp,
    feelsLike: raw.main.feels_like,
    humidity: raw.main.humidity,
    pressure: raw.main.pressure,
    windSpeed: raw.wind.speed,
    windDirection: raw.wind.deg,
    description: raw.weather?.[0]?.description ?? "",
    icon: raw.weather?.[0]?.icon,
    timestamp: new Date(raw.dt * 1000).toISOString(),
  };
}

function mapForecastItem(raw: OWMForecastItemRaw): ForecastItem {
  return {
    timestamp: new Date(raw.dt * 1000).toISOString(),
    temperature: raw.main.temp,
    feelsLike: raw.main.feels_like,
    humidity: raw.main.humidity,
    pressure: raw.main.pressure,
    windSpeed: raw.wind.speed,
    windDirection: raw.wind.deg,
    description: raw.weather?.[0]?.description ?? "",
    icon: raw.weather?.[0]?.icon,
  };
}

function mapForecast(raw: OWMForecastRaw): ForecastResponse {
  return {
    city: raw.city.name,
    country: raw.city.country,
    items: raw.list.map(mapForecastItem),
  };
}

// ── Service ──────────────────────────────────────────────────────────────────

const WeatherService = {
  async getCurrentWeather(city: string): Promise<CurrentWeatherResponse> {
    const raw = await apiClient.request<OWMCurrentRaw>("weather", {
      query: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });
    return mapCurrent(raw);
  },

  async getForecast(city: string): Promise<ForecastResponse> {
    const raw = await apiClient.request<OWMForecastRaw>("forecast", {
      query: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });
    return mapForecast(raw);
  },

  async getWeatherHistory(city: string, date: string): Promise<WeatherHistoryResponse> {
    // OWM free tier: use forecast endpoint and filter by date as best-effort
    const raw = await apiClient.request<OWMForecastRaw>("forecast", {
      query: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });

    const targetDate = date.slice(0, 10);
    const filtered = raw.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000).toISOString().slice(0, 10);
      return itemDate === targetDate;
    });

    const entries: WeatherHistoryEntry[] = filtered.map((item) => ({
      date: new Date(item.dt * 1000).toISOString(),
      temperature: item.main.temp,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      description: item.weather?.[0]?.description ?? "",
    }));

    return {
      city: raw.city.name,
      country: raw.city.country,
      date: targetDate,
      entries,
    };
  },
};

export default WeatherService;
