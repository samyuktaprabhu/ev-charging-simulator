import { useContext, useMemo } from "react";
import Card, { CardProps } from "./common/Card";
import DashBoard from "./dashboard/Dashboard";
import { SimulationForm } from "./SimulationForm";
import SimulationContext from "../context/SimulationContext";
import ClockIcon from "../assets/ClockIcon";
import FireIcon from "../assets/FireIcon";

const EVChargingSimulator = () => {
  const { numChargePoints, consumption, chargingPower } =
    useContext(SimulationContext);

  const averageChargingDuration: number = useMemo(() => {
    return chargingPower > 0
      ? Number((consumption / chargingPower).toFixed(2))
      : 0;
  }, [consumption, chargingPower]);

  const maxChargingSessions: number = useMemo(() => {
    return Math.floor((24 / averageChargingDuration) * numChargePoints);
  }, [averageChargingDuration, numChargePoints]);

  const cards: CardProps[] = [
    {
      metricTitle: "Average Charging Duration",
      metricValue: averageChargingDuration,
      metricInference: "hours",
      icon: (
        <ClockIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
      ),
    },
    {
      metricTitle: "Maximum Charging Sessions",
      metricValue: maxChargingSessions,
      metricInference: "per day",
      icon: (
        <FireIcon styling="h-10 w-10 text-slate-400 hover:text-slate-500" />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="h-8 bg-slate-800 text-white text-xs flex items-center justify-start pl-4 font-semibold shadow-md">
        EV Charging Station Simulator
      </div>

      <div className="flex flex-col md:flex-row flex-1 bg-gray-100 p-6 space-y-4 md:space-y-0 md:space-x-4">
        <div
          className="w-full md:w-1/5 bg-white p-6 rounded-lg shadow-lg overflow-y-auto"
          style={{ maxHeight: `calc(100vh - 5rem)` }}
        >
          <SimulationForm />
          <hr className="my-8 text-gray-200" />
          <div className="grid grid-cols-1 auto-rows-fr gap-6 w-full">
            {cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
        <div
          className="w-full md:w-4/5 bg-white px-6 pb-6 rounded-lg shadow-lg overflow-auto min-h-0"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <DashBoard />
        </div>
      </div>
    </div>
  );
};

export default EVChargingSimulator;
