"use client";

import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "@/components/ui/CustomTooltip";
import { useTranslatedPageTitle } from '@/hooks/useTranslatedPageTitle';
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { useTranslation } from 'react-i18next';
import DataSource from "@/components/DataSource";
import { useStations, useStationDailyData, useStationHourlyData } from "@/hooks/useStations";

// Define interfaces for type safety
interface DailyTemperatureData {
  date: string;
  avg: number;
  min: number;
  max: number;
}

interface HourlyData {
  timestamp: string;
  temp: number;
  windSpeed: number;
  humidity: number;
}

// Update the raw data interfaces to have optional properties
interface DailyRawData {
  air_temp_avg?: string | number;
  air_temp_min?: string | number;
  air_temp_max?: string | number;
}

interface HourlyRawData {
  date: string;
  hour: string;
  air_temp_avg?: string | number;
  wind_speed_avg?: string | number;
  relative_humidity_avg?: string | number;
}

export default function StationGraphsPage() {
  const params = useParams() as { stationID: string };
  const stationID = params.stationID;
  const { t } = useTranslation();

  // Get current date and 7 days ago for date range
  const today = new Date();
  const toDate = today.toISOString().split("T")[0];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const fromDate = sevenDaysAgo.toISOString().split("T")[0];

  // Use React Query hooks to fetch data
  const { data: stations = [], isLoading: stationsLoading, error: stationsError } = useStations();
  const { data: dailyDataRaw, isLoading: dailyLoading, error: dailyError } = useStationDailyData(stationID, fromDate, toDate);
  const { data: hourlyDataRaw = {}, isLoading: hourlyLoading, error: hourlyError } = useStationHourlyData(stationID);

  // Get station name
  const stationName = stations.find(station => station.id === stationID)?.estacao.slice(7) || t('common.unknown');

  // Transform daily data for charts
  const dailyData: DailyTemperatureData[] = dailyDataRaw
    ? Object.entries(dailyDataRaw)
        .filter(([, data]) => {
          // Make sure we have valid data entries
          const rawData = data as DailyRawData;
          return rawData && (
            rawData.air_temp_avg !== undefined || 
            rawData.air_temp_min !== undefined || 
            rawData.air_temp_max !== undefined
          );
        })
        .map(([date, data]) => ({
          date,
          max: Number((data as DailyRawData).air_temp_max ?? 0),
          avg: Number((data as DailyRawData).air_temp_avg ?? 0),
          min: Number((data as DailyRawData).air_temp_min ?? 0),
        }))
    : [];

  // Transform hourly data for charts
  const hourlyData: HourlyData[] = hourlyDataRaw
    ? Object.entries(hourlyDataRaw)
        .filter(([, data]) => {
          // Ensure the data entry has the required properties
          const hourlyData = data as HourlyRawData;
          return hourlyData && hourlyData.date && hourlyData.hour;
        })
        .sort(([, dataA], [, dataB]) => {
          const timestampA = `${(dataA as HourlyRawData).date} ${(dataA as HourlyRawData).hour}`;
          const timestampB = `${(dataB as HourlyRawData).date} ${(dataB as HourlyRawData).hour}`;
          return timestampA.localeCompare(timestampB);
        })
        .map(([, data]) => {
          const hourlyData = data as HourlyRawData;
          return {
            timestamp: `${hourlyData.date}T${hourlyData.hour}`,
            temp: Number(hourlyData.air_temp_avg ?? 0),
            windSpeed: Number(hourlyData.wind_speed_avg ?? 0),
            humidity: Number(hourlyData.relative_humidity_avg ?? 0),
          };
        })
    : [];

  // Combined loading and error states
  const isLoading = stationsLoading || dailyLoading || hourlyLoading;
  const error = stationsError || dailyError || hourlyError;
  
  useTranslatedPageTitle('station.graphs.title', { station: stationName });

  if (isLoading) return <LoadingSpinner message={t('station.graphs.loading')}/>;
  if (error) return <AlertMessage type="error" message={error instanceof Error ? error.message : t('common.error')} />;
  if (stationName === t('common.unknown')){
    return <AlertMessage type="error" message={t('station.graphs.stationIdError')} />;
  }

  // Check if we have any data to display
  const hasData = dailyData.length > 0 || hourlyData.length > 0;
  if (!hasData) {
    return <AlertMessage type="warning" message={t('station.graphs.noData')} />;
  }

  return (
    <div className="p-6">
      <DataSource 
        introTextKey="station.stationGraphsIntro"
        textKey="home.dataSource"
        linkKey="home.irristrat"
        linkUrl="https://irristrat.com/new/index.php"
      />

      <div className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray700 mb-4">{t('station.dailyTemperatureTrend')}</h2>
          <div className="glass-frosted p-2 rounded-lg">
            <a href={`/stations/${stationID}`} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <span className="text-lg">←</span>
              {t('station.backToStation')}
            </a>
          </div>
        </div>
        <div className="glass-card px-8 py-12 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <XAxis 
                dataKey="date" 
                style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }}
              />
              <YAxis style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-400)" />
              <Line type="monotone" dataKey="max" stroke="#ff7300" name={t('station.chart.maximum')} />
              <Line type="monotone" dataKey="avg" stroke="#8884d8" name={t('station.chart.average')} />
              <Line type="monotone" dataKey="min" stroke="#82ca9d" name={t('station.chart.minimum')} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray700 mb-4">{t('station.graphs.hourlyTemperature')}</h2>
        <div className="glass-card px-8 py-12 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  value.slice(11, 13) + "h (" + value.slice(0, 10) + ")"
                }
                tick={{ fontSize: 10 }}
                style={{ fontSize: '10px', fill: '#374151', fontWeight: 'bold' }}
              />
              <YAxis style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-400)" />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" name={t('station.chart.temperature')} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray700 mb-4">{t('station.graphs.hourlyWindSpeed')}</h2>
        <div className="glass-card px-8 py-12 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  value.slice(11, 13) + "h (" + value.slice(0, 10) + ")"
                }
                tick={{ fontSize: 10 }}
                style={{ fontSize: '10px', fill: '#374151', fontWeight: 'bold' }}
              />
              <YAxis style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-400)" />
              <Line
                type="monotone"
                dataKey="windSpeed"
                stroke="#82ca9d"
                name={t('station.chart.windSpeed')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray700 mb-4">{t('station.graphs.hourlyHumidity')}</h2>
        <div className="glass-card px-8 py-12 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  value.slice(11, 13) + "h (" + value.slice(0, 10) + ")"
                }
                tick={{ fontSize: 10 }}
                style={{ fontSize: '10px', fill: '#374151', fontWeight: 'bold' }}
              />
              <YAxis style={{ fontSize: '12px', fill: '#374151', fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-400)" />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#ffc658"
                name={t('station.chart.humidity')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
