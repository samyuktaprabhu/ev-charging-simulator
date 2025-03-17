import { createContext, ReactNode, useState } from "react";

type SimulationContextProps = {
  totalNumberOfChargingPoints: number;
  setTotalNumberOfChargingPoints: (totalNumberOfChargingPoints: number) => void;
  arrivalMultiplier: number;
  setArrivalMultiplier: (arrivalMultiplier: number) => void;
  consumption: number;
  setConsumption: (consumption: number) => void;
  chargingPower: number;
  setChargingPower: (chargingPower: number) => void;
  chargingConfiguration: {
    totalNumberOfChargingPoints: number;
    chargingPower: number;
  }[];
  setChargingConfiguration: (value: ChargingStationConfiguration[]) => void;
  formData: FormData;
  setFormData: (form: FormData) => void;
};

export interface ChargingStationConfiguration {
  totalNumberOfChargingPoints: number;
  chargingPower: number;
}

const SimulationContext = createContext<SimulationContextProps>({
  totalNumberOfChargingPoints: 0,
  setTotalNumberOfChargingPoints: () => {},
  arrivalMultiplier: 0,
  setArrivalMultiplier: () => {},
  consumption: 0,
  setConsumption: () => {},
  chargingPower: 0,
  setChargingPower: () => {},
  chargingConfiguration: [
    {
      totalNumberOfChargingPoints: 0,
      chargingPower: 0,
    },
  ],
  setChargingConfiguration: () => {},
  formData: {
    chargingConfiguration: [
      {
        totalNumberOfChargingPoints: 0,
        chargingPower: 0,
      },
    ],
    arrivalMultiplier: 0,
    consumption: 0,
  },
  setFormData: () => {},
});

interface SimulationProviderProps {
  children: ReactNode;
}

export interface FormData {
  arrivalMultiplier: number;
  consumption: number;
  chargingConfiguration: ChargingStationConfiguration[];
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({
  children,
}) => {
  const [totalNumberOfChargingPoints, setTotalNumberOfChargingPoints] =
    useState<number>(20);
  const [arrivalMultiplier, setArrivalMultiplier] = useState<number>(100);
  const [consumption, setConsumption] = useState<number>(18);
  const [chargingPower, setChargingPower] = useState<number>(11);

  const [chargingConfiguration, setChargingConfiguration] = useState<
    ChargingStationConfiguration[]
  >([
    {
      totalNumberOfChargingPoints: 20,
      chargingPower: 11,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    arrivalMultiplier: 0,
    consumption: 0,
    chargingConfiguration: [],
  });

  return (
    <SimulationContext.Provider
      value={{
        totalNumberOfChargingPoints,
        setTotalNumberOfChargingPoints,
        arrivalMultiplier,
        setArrivalMultiplier,
        consumption,
        setConsumption,
        chargingPower,
        setChargingPower,
        chargingConfiguration,
        setChargingConfiguration,
        formData,
        setFormData,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;
