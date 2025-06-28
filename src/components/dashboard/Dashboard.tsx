import {
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ValidatedDropdownInput from "../common/input/ValidatedDropdownInput";
import SimulationContext from "../../context/SimulationContext";
import CustomLineChart from "../charts/CustomLineChart";
import CustomRadarChart from "../charts/CustomRadarChart";
import Card, { CardProps } from "../common/Card";
import CustomHeatMap from "../charts/CustomHeatMap";
import { monthlyConsumption } from "../../data/AverageDailyConsumption";
import { energyConsumptionHeatMapData } from "../../data/Energyconsumption";
import { MonthlyConsumption, DailyConsumption } from "../../types/consumption";
import Toast from "../common/Toast";
import { getMonthsInAYear, Months } from "../../utils/DateTimeUtils";
import BulbIcon from "../../assets/BulbIcon";
import LighteningIcon from "../../assets/LighteningIcon";
import PresentationChartIcon from "../../assets/PresentationChartIcon";
import SunIcon from "../../assets/SunIcon";

export const NUMBER_OF_CHARGING_POINTS = 20;
export const AVERAGE_ARRIVAL_MULTIPLIER = 1;
export const AVERAGE_CONSUMPTION = 18;
export const AVERAGE_CHARGING_POWER = 11;
export const YEARS = [2024, 2025];

interface DashboardProps {
  chargingPower: number;
  totalNumberOfChargingPoints: number;
}
const Dashboard = ({
  chargingPower,
  totalNumberOfChargingPoints,
}: DashboardProps) => {
  // STATES
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [availableMonths, setAvailableMonths] = useState<string[]>(
    Object.values(Months)
  );
  const [error, setError] = useState<string>("");
  const [lineChartSimulationData, setLineChartSimulationData] = useState<
    { [key: string]: string | number }[]
  >([]);

  // CONTEXT
  const { formData } = useContext(SimulationContext);

  useEffect(() => {
    generateSimulationData();
  }, [
    selectedMonth,
    selectedYear,
    formData.arrivalMultiplier,
    chargingPower,
    formData.consumption,
  ]);

  useEffect(() => {
    const result = monthlyConsumption.filter(
      (data) => data.year === selectedYear
    );
    if (result) {
      const monthsWithData = result.map((r) => r.month);
      if (!monthsWithData.includes(selectedMonth)) {
        setError(
          "The selected month is not available for this year. Please select a valid month!"
        );
        setSelectedMonth(monthsWithData[0]);
      }
      if (monthsWithData) {
        setAvailableMonths(monthsWithData);
      }
    } else {
      setAvailableMonths([]);
      setSelectedMonth("");
    }
  }, [selectedYear]);

  const scalingFactor: number = useMemo(
    () =>
      (totalNumberOfChargingPoints / NUMBER_OF_CHARGING_POINTS) *
      (formData.arrivalMultiplier / 100 / AVERAGE_ARRIVAL_MULTIPLIER) *
      (formData.consumption / AVERAGE_CONSUMPTION) *
      (chargingPower / AVERAGE_CHARGING_POWER),
    [
      totalNumberOfChargingPoints,
      formData.consumption,
      formData.arrivalMultiplier,
      chargingPower,
    ]
  );

  const averageChargingDuration: number = useMemo(
    () => Number((formData.consumption / chargingPower).toFixed(2)),
    [formData.consumption, chargingPower]
  );

  const maxChargingSessions: number = useMemo(
    () =>
      Math.floor((24 / averageChargingDuration) * totalNumberOfChargingPoints),
    [averageChargingDuration, totalNumberOfChargingPoints]
  );

  const monthsInYear: Record<string, number> = useMemo(
    () => getMonthsInAYear(selectedYear),
    [selectedYear]
  );

  const monthlyConsumptionDataToDisplay: MonthlyConsumption | undefined =
    useMemo(
      () =>
        monthlyConsumption.find(
          (info) => info.year === selectedYear && info.month === selectedMonth
        ),
      [selectedYear, selectedMonth]
    );

  const { totalMonthlyEnergy, totalAnnualEnergy } = useMemo(() => {
    const monthlyData: number =
      monthlyConsumptionDataToDisplay?.dailyData.reduce(
        (acc, curr) => acc + curr.averageDailyConsumption,
        0
      ) || 0;

    const annualData: number = monthlyConsumption
      .filter((data) => data.year === selectedYear)
      .reduce(
        (finalTotal, everyMonth) =>
          finalTotal +
          everyMonth.dailyData.reduce(
            (total, everyDay) => total + everyDay.averageDailyConsumption,
            0
          ),
        0
      );

    return {
      totalMonthlyEnergy: monthlyData,
      totalAnnualEnergy: annualData,
    };
  }, [monthlyConsumptionDataToDisplay, selectedYear]);

  const radarChartDisplayData: DailyConsumption[] = useMemo(
    () =>
      monthlyConsumptionDataToDisplay?.dailyData.map((info) => ({
        ...info,
        averageDailyConsumption: info.averageDailyConsumption * scalingFactor,
      })) || [],
    [monthlyConsumptionDataToDisplay, scalingFactor]
  );

  const cards: CardProps[] = useMemo(
    () => [
      {
        metricTitle:
          "Total Energy Consumed (" +
          `${selectedMonth.slice(0, 3)}'${selectedYear.toString().slice(-2)})`,
        metricValue: Number(
          (totalMonthlyEnergy * 4 * scalingFactor) / 1000
        ).toFixed(2),
        metricInference: `MWh `,
        icon: (
          <LighteningIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
        ),
        metricValueColor: "text-green-500 hover: text-green-600",
      },
      {
        metricTitle: "Annual Forecasted Consumption",
        metricValue: Number(
          (totalAnnualEnergy * 4 * scalingFactor) / 1000
        ).toFixed(2),
        metricInference: "MWh",
        icon: (
          <PresentationChartIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
        ),
        metricValueColor: "text-green-500 hover: text-green-600",
      },
      {
        metricTitle: "Total Charging Events (Ideal)",
        metricValue: Math.floor(
          monthsInYear[selectedMonth] * maxChargingSessions
        ),
        metricInference: "",
        icon: (
          <BulbIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
        ),
        metricValueColor: "text-green-500 hover: text-green-600",
      },
      {
        metricTitle: "Total Charging Events (Actual)",
        metricValue: Math.floor(
          monthsInYear[selectedMonth] *
            maxChargingSessions *
            (0.3 +
              0.8 *
                (formData.arrivalMultiplier /
                  100 /
                  (1 + formData.arrivalMultiplier / 100)))
        ),
        metricInference: "",
        icon: (
          <SunIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
        ),
        metricValueColor: "text-green-500 hover: text-green-600",
      },
    ],
    [
      totalMonthlyEnergy,
      totalAnnualEnergy,
      scalingFactor,
      selectedMonth,
      selectedYear,
      monthsInYear,
      maxChargingSessions,
      formData.arrivalMultiplier,
    ]
  );

  const generateSimulationData = useCallback(() => {
    const transformData = () => {
      const groupedData: Record<string, { [key: string]: number | string }> =
        {};
      const hours = Array.from(
        { length: 24 },
        (_, i) => `${String(i).padStart(2, "0")}:00`
      );

      const relevantData = monthlyConsumption.filter(
        (data) => data.month === selectedMonth && data.year === selectedYear
      );

      relevantData.forEach((data) => {
        hours.forEach((hour, hourIndex) => {
          if (!groupedData[hour]) {
            groupedData[hour] = { hour };
          }

          data.dailyData.forEach((d) => {
            const isWeekend = d.day === "Saturday" || d.day === "Sunday";
            const distribution = isWeekend
              ? data.weekends?.dailyDistribution[hourIndex] ?? 0
              : data.weekdays?.dailyDistribution[hourIndex] ?? 0;

            groupedData[hour][d.day] =
              scalingFactor * d.averageDailyConsumption * distribution;
          });
        });
      });

      return Object.values(groupedData);
    };

    const data = transformData();
    setLineChartSimulationData(data);
  }, [selectedMonth, selectedYear, scalingFactor, setLineChartSimulationData]);

  // FILTER
  const YearMonthFilter = (): JSX.Element => (
    <div className="flex flex-row justify-end my-2 gap-2">
      <ValidatedDropdownInput
        selectedValue={selectedYear}
        onChange={(value) => setSelectedYear(Number(value))}
        options={YEARS.map((year) => ({
          value: year.toString(),
          label: year.toString(),
        }))}
      />
      <ValidatedDropdownInput
        selectedValue={selectedMonth}
        onChange={(value) => setSelectedMonth(String(value))}
        options={availableMonths.map((month) => ({
          value: month,
          label: month,
        }))}
      />
    </div>
  );

  // RENDER
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen">
      <div className="w-full bg-white sticky top-0 z-10 p-1 shadow-xs">
        <YearMonthFilter />
      </div>
      <div
        className="w-full max-w-full grid grid-rows-3 gap-6 mt-6"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {error && (
          <Toast
            onClose={() => {
              setError("");
            }}
            message={error}
            type={"danger"}
          />
        )}

        {/* MONTHLY STATS
        1. Radar Chart – Displays the weekly energy consumption pattern for each
        month. 
        2. Total Energy Consumed – Aggregated energy use per month. 
        3. Annual Forecasted Consumption – Projected energy demand for the entire year.
        4. Total Charging Events (Maximum Possible) – The theoretical charging
        sessions based on installed chargers. 
        5. Total Charging Events (Actual) – The actual number of charging sessions, factoring in an efficiency model
        (higher expected demand lowers efficiency due to congestion). */}

        <div className="bg-white p-4 rounded-md grid grid-cols-1 md:grid-cols-2 border border-gray-50 gap-6">
          <div className="flex flex-col items-center justify-start w-full">
            {monthlyConsumptionDataToDisplay ? (
              <CustomRadarChart
                data={radarChartDisplayData}
                polarAngleAxisKey="day"
                radarLabel="Energy Consumption (kWh)"
                radarKey="averageDailyConsumption"
                chartHeader={`Energy Consumption (kWh)`}
              />
            ) : (
              <div className="text-xs flex items-center justify-center text-red-400">
                There's no data to display. Please come back again later.
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 auto-rows-fr gap-2 w-full">
            {cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>

        {/*  YEARLY & DAILY TRENDS
        Energy Consumption Heatmap (2024) – Visualizes seasonal charging trends
        and highlights which days of the week are busiest in different months. */}
        <div className="bg-white w-full p-4 rounded-md border border-gray-50 overflow-x-hidden h-auto min-h-0">
          <CustomHeatMap
            mapHeader="Energy Consumption Heatmap (2024)"
            data={energyConsumptionHeatMapData}
          />
        </div>

        {/* YEARLY & DAILY TRENDS
        Hourly Energy Distribution per Day – A line graph showing the typical
        energy consumption pattern for weekdays (Monday, Tuesday, etc.) in a
        selected month. */}
        <div className="bg-white p-4 w-full rounded-md border border-gray-50 overflow-x-hidden">
          <CustomLineChart
            data={lineChartSimulationData}
            xAxisKey="hour"
            yAxisLabel="Energy (kWh)"
            xAxisLabel="Hour"
            yAxisKey="totalPowerConsumed"
            lineValues={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            chartHeader="Average Daily Consumption"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
