import { JSX, memo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export interface LinechartProps {
  data: { [key: string]: string | number }[];
  lineValues: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisKey: string;
  yAxisKey: string;
  chartHeader: string;
  filter?: () => JSX.Element;
}

const CustomLineChart = memo((props: LinechartProps) => {
  return (
    <div className="w-full">
      <h1 className="text-md font-semibold text-center text-gray-500 mb-4">
        {props.chartHeader}
      </h1>
      {props.filter && (
        <div className="w-full sm:w-auto flex justify-end ml-auto">
          <div className="sm:w-auto text-ellipsis">{props.filter()}</div>
        </div>
      )}
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={props.data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={props.xAxisKey} tick={{ fontSize: 10 }} />
            <YAxis
              label={{
                value: props.yAxisLabel,
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(value) => {
                return Number(value).toFixed(2);
              }}
            />
            <Legend />
            {props.lineValues.map((value, index) => (
              <Line
                key={value}
                type="monotone"
                dataKey={value}
                stroke={`hsl(${index * 50}, 80%, ${Math.max(
                  0,
                  Math.min(100, 47 - index * 5)
                )}%)`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default CustomLineChart;
