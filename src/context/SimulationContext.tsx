import { createContext, ReactNode, useState } from "react";

type SimulationContextProps = {
  numChargePoints: number;
  setNumChargePoints: (numChargePoints: number) => void;
  arrivalMultiplier: number;
  setArrivalMultiplier: (arrivalMultiplier: number) => void;
  consumption: number;
  setConsumption: (consumption: number) => void;
  chargingPower: number;
  setChargingPower: (chargingPower: number) => void;
  lineChartSimulationData: { [key: string]: string | number }[];
  setLineChartSimulationData: (
    simulationData: {
      [key: string]: string | number;
    }[]
  ) => void;
};

const SimulationContext = createContext<SimulationContextProps>({
  numChargePoints: 0,
  setNumChargePoints: () => {},
  arrivalMultiplier: 0,
  setArrivalMultiplier: () => {},
  consumption: 0,
  setConsumption: () => {},
  chargingPower: 0,
  setChargingPower: () => {},
  lineChartSimulationData: [],
  setLineChartSimulationData: () => {},
});

interface SimulationProviderProps {
  children: ReactNode;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({
  children,
}) => {
  const [numChargePoints, setNumChargePoints] = useState<number>(20);
  const [arrivalMultiplier, setArrivalMultiplier] = useState<number>(100);
  const [consumption, setConsumption] = useState<number>(18);
  const [chargingPower, setChargingPower] = useState<number>(11);
  const [lineChartSimulationData, setLineChartSimulationData] = useState<
    { [key: string]: string | number }[]
  >([]);

  return (
    <SimulationContext.Provider
      value={{
        numChargePoints,
        setNumChargePoints,
        arrivalMultiplier,
        setArrivalMultiplier,
        consumption,
        setConsumption,
        chargingPower,
        setChargingPower,
        lineChartSimulationData,
        setLineChartSimulationData,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;
