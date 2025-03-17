import { useContext, useEffect } from "react";
import { ValidatedNumberInput } from "./common/input/ValidatedNumberInput";
import SimulationContext, {
  ChargingStationConfiguration,
} from "../context/SimulationContext";
import SliderInput from "./common/input/SliderInput";
import {
  AVERAGE_CHARGING_POWER,
  AVERAGE_CONSUMPTION,
  NUMBER_OF_CHARGING_POINTS,
} from "./dashboard/Dashboard";
import RemoveIcon from "../assets/RemoveIcon";

export const SimulationForm = () => {
  // CONTEXT
  const {
    arrivalMultiplier,
    setArrivalMultiplier,
    chargingConfiguration,
    setChargingConfiguration,
    consumption,
    setConsumption,
    setFormData,
  } = useContext(SimulationContext);

  // REACT HOOKS
  useEffect(() => {
    setFormData({
      consumption: consumption,
      arrivalMultiplier: arrivalMultiplier,
      chargingConfiguration: chargingConfiguration,
    });
  }, [chargingConfiguration, arrivalMultiplier, consumption, setFormData]);

  // FUNCTIONS
  const addChargingStation = () => {
    setChargingConfiguration([
      ...chargingConfiguration,
      {
        totalNumberOfChargingPoints: 20,
        chargingPower: 11,
      },
    ]);
  };

  const removeChargingStation = (index: number) => {
    if (chargingConfiguration.length > 1) {
      const newConfig = [...chargingConfiguration];
      newConfig.splice(index, 1);
      setChargingConfiguration(newConfig);
    }
  };

  const updateChargingConfig = (
    index: number,
    field: keyof ChargingStationConfiguration,
    value: number
  ) => {
    const newConfig = [...chargingConfiguration];
    newConfig[index] = {
      ...newConfig[index],
      [field]: value,
    };
    setChargingConfiguration(newConfig);
  };

  // RENDER
  return (
    <>
      <div className="flex flex-col gap-2">
        <form className="space-y-1">
          <div className="px-4 flex flex-col space-y-3">
            {chargingConfiguration.map((config, index) => (
              <>
                {/* BONUS TASK */}
                <div className="flex flex-row gap-1">
                  <ValidatedNumberInput
                    value={config.totalNumberOfChargingPoints}
                    onChange={(value) =>
                      updateChargingConfig(
                        index,
                        "totalNumberOfChargingPoints",
                        value
                      )
                    }
                    label={index === 0 ? "# of charging points" : undefined}
                    min={1}
                    max={50}
                    defaultValue={NUMBER_OF_CHARGING_POINTS}
                  />

                  <ValidatedNumberInput
                    min={1}
                    max={50}
                    label={index === 0 ? "Charging Power (kW)" : undefined}
                    value={config.chargingPower}
                    onChange={(value) =>
                      updateChargingConfig(index, "chargingPower", value)
                    }
                    defaultValue={AVERAGE_CHARGING_POWER}
                  />
                  {index >= 1 ? (
                    <button
                      type="button"
                      onClick={() => removeChargingStation(index)}
                      className="text-red-400 hover:text-red-500 p-1 rounded-full items-center justify-between"
                      disabled={chargingConfiguration.length === 1}
                    >
                      <RemoveIcon />
                    </button>
                  ) : (
                    <div className="w-14"></div>
                  )}
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-end mr-10">
            {chargingConfiguration.length < 5 ? (
              <button
                type="button"
                onClick={addChargingStation}
                className="flex  text-xs items-center justify-end gap-2 px-4 py-1 bg-white text-slate-500 rounded-md hover:bg-gray-100"
              >
                + Station
              </button>
            ) : (
              <div className="text-red-500" style={{ fontSize: "0.625rem" }}>
                You have reached the maximum number of simulation inputs!
              </div>
            )}
          </div>
          <div className="flex flex-col ml-4 mr-8 gap-2">
            <ValidatedNumberInput
              label="Vehicle Energy Consumption (kWh)"
              min={1}
              max={50}
              value={consumption}
              onChange={setConsumption}
              defaultValue={AVERAGE_CONSUMPTION}
            />
            <SliderInput
              label={"Arrival Probability Multiplier (%)"}
              value={arrivalMultiplier}
              onChange={setArrivalMultiplier}
              min={1}
              max={200}
            />
          </div>
        </form>
      </div>
    </>
  );
};
