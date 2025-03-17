import { useContext } from "react";
import { ValidatedNumberInput } from "./common/input/ValidatedNumberInput";
import SimulationContext from "../context/SimulationContext";
import SliderInput from "./common/input/SliderInput";

export const SimulationForm = () => {
  const {
    numChargePoints,
    arrivalMultiplier,
    consumption,
    chargingPower,
    setChargingPower,
    setConsumption,
    setArrivalMultiplier,
    setNumChargePoints,
  } = useContext(SimulationContext);
  return (
    <>
      <div className="flex flex-col gap-4">
        <form className="space-y-4">
          <ValidatedNumberInput
            label="Number of charge points"
            value={numChargePoints}
            onChange={setNumChargePoints}
            min={1}
            max={100}
          />
          <ValidatedNumberInput
            label="Vehicle Energy Consumption (kWh)"
            min={1}
            max={100}
            value={consumption}
            onChange={setConsumption}
          />
          <ValidatedNumberInput
            label="Charging Power per Station (kW)"
            min={1}
            max={100}
            value={chargingPower}
            onChange={setChargingPower}
          />
          <SliderInput
            label={"Arrival Probability Multiplier (%)"}
            value={arrivalMultiplier}
            onChange={setArrivalMultiplier}
            min={1}
            max={200}
          />
        </form>
      </div>
    </>
  );
};
