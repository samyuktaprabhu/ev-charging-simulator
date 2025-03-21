import { createContext, ReactNode, useState } from "react";

type SimulationContextProps = {
  formData: FormData;
  setFormData: (form: FormData) => void;
};

export interface ChargingStationConfiguration {
  totalNumberOfChargingPoints: number;
  chargingPower: number;
}

const SimulationContext = createContext<SimulationContextProps>({
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
  const [formData, setFormData] = useState<FormData>({
    arrivalMultiplier: 100,
    consumption: 18,
    chargingConfiguration: [
      {
        totalNumberOfChargingPoints: 20,
        chargingPower: 11,
      },
    ],
  });

  return (
    <SimulationContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;
