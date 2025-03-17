import { JSX } from "react";

export interface CardProps {
  metricTitle: string;
  metricValue: string | number;
  metricInference: string;
  metricValueColor: string;
  icon: JSX.Element;
}

const Card = ({
  metricTitle,
  metricValue,
  metricInference,
  metricValueColor,
  icon,
}: CardProps) => {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-row justify-between items-center w-full h-full grid-cols-1 sm:grid-cols-1 hover:bg-gray-50">
      <div className="w-1/3 flex justify-center items-center">{icon}</div>
      <div className="w-2/3 flex flex-col">
        <div>
          <span className={`text-4xl font-semibold ${metricValueColor}`}>
            {metricValue}
          </span>
          <span className="text-gray-400 text-xs ml-1 mb-2">
            {metricInference}
          </span>
        </div>
        <span className="text-slate-600 text-xs ml-1 mt-2">{metricTitle}</span>
      </div>
    </div>
  );
};

export default Card;
