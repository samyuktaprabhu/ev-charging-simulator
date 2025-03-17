import { JSX } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { DailyConsumption } from "../../types/consumption";

interface CustomRadarChartProps {
  data: DailyConsumption[];
  polarAngleAxisKey: string;
  radarLabel: string;
  radarKey: string;
  chartHeader: string;
  filter?: () => JSX.Element;
}

const CustomRadarChart = (props: CustomRadarChartProps) => {
  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-wrap items-start gap-4">
          <h1 className="text-md w-full sm:w-auto font-semibold text-gray-500 whitespace-wrap self-start">
            {props.chartHeader}
          </h1>

          {props.filter && (
            <div className="w-full sm:w-auto flex justify-end ml-auto">
              <div className="sm:w-auto text-ellipsis">{props.filter()}</div>
            </div>
          )}
        </div>
        <div className="w-full overflow-auto">
          <div className="min-w-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey={props.polarAngleAxisKey} />
                <PolarRadiusAxis />
                <Radar
                  name={props.radarLabel}
                  dataKey={props.radarKey}
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomRadarChart;
