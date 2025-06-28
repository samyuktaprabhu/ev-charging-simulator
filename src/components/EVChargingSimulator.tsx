import { useContext, useEffect, useMemo } from "react";
import Card, { CardProps } from "./common/Card";
import DashBoard from "./dashboard/Dashboard";
import { SimulationForm } from "./SimulationForm";
import SimulationContext from "../context/SimulationContext";
import ClockIcon from "../assets/ClockIcon";
import FireIcon from "../assets/FireIcon";

const EVChargingSimulator = () => {
  // CONTEXT

  const { formData } = useContext(SimulationContext);

  // REACT HOOKS
  const { averageChargingPower, totalNumberOfChargingPoints } = useMemo(() => {
    const result = formData.chargingConfiguration.reduce(
      (acc, curr) => {
        acc.totalNumberOfChargingPoints += curr.totalNumberOfChargingPoints;
        acc.totalPower += curr.totalNumberOfChargingPoints * curr.chargingPower;
        return acc;
      },
      { totalNumberOfChargingPoints: 0, totalPower: 0 }
    );

    const averageChargingPower =
      result.totalNumberOfChargingPoints > 0
        ? result.totalPower / result.totalNumberOfChargingPoints
        : 0;

    return {
      averageChargingPower,
      totalNumberOfChargingPoints: result.totalNumberOfChargingPoints,
    };
  }, [JSON.stringify(formData)]);

  const averageChargingDuration: number = useMemo(() => {
    return averageChargingPower > 0
      ? Number((formData.consumption / averageChargingPower).toFixed(2))
      : 0;
  }, [formData.consumption, averageChargingPower]);

  const maxChargingSessions: number = useMemo(() => {
    return Math.floor(
      (24 / averageChargingDuration) * totalNumberOfChargingPoints
    );
  }, [
    averageChargingDuration,
    totalNumberOfChargingPoints,
    formData.chargingConfiguration,
  ]);

  const cards: CardProps[] = [
    {
      metricTitle: "Average Charging Duration",
      metricValue: averageChargingDuration,
      metricInference: "hours",
      metricValueColor: "text-green-500 hover: text-green-600",
      icon: (
        <ClockIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
      ),
    },
    {
      metricTitle: "Maximum Charging Sessions",
      metricValue: maxChargingSessions,
      metricInference: "per day",
      metricValueColor: "text-green-500 hover: text-green-600",
      icon: (
        <FireIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="h-8 bg-slate-800 text-white text-xs flex items-center justify-start pl-4 font-semibold shadow-md">
        EV Charging Station Simulator
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row flex-1 bg-gray-100 p-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* FORM */}
        <div
          className="w-full md:w-2/7 bg-white p-6 rounded-lg shadow-lg overflow-y-auto"
          style={{ maxHeight: `calc(100vh - 5rem)` }}
        >
          <SimulationForm />
          <hr className="my-8 text-gray-200" />

          {/* CHARGING STATISTICS
          1. Average Charging Duration – The typical time cars spend plugged in.
          2. Maximum Charging Sessions per Day – The highest number of sessions
          handled daily. */}

          <div className="grid grid-cols-1 auto-rows-fr gap-6 w-full">
            {cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
        {/* SIMULATION DASHBOARD */}
        <div
          className="w-full md:w-5/7 bg-white px-6 pb-6 rounded-lg shadow-lg overflow-auto min-h-0"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <DashBoard
            chargingPower={averageChargingPower}
            totalNumberOfChargingPoints={totalNumberOfChargingPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default EVChargingSimulator;
