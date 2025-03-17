import {
  Months,
  getMonthsInAYear,
  daysOfWeek,
} from "../../utils/DateTimeUtils";

interface CustomHeatMapProps {
  mapHeader: string;
  data: any[];
}

const CustomHeatMap = (props: CustomHeatMapProps) => {
  const firstDayOfMonth = Object.values(Months).map((_, monthIndex) => {
    const date = new Date(2024, monthIndex, 1);
    return date.getDay();
  });

  const getColorFromValue = (value: number) => {
    const minHue = 120;
    const maxHue = 0;
    const hue = minHue + (maxHue - minHue) * (value / 6.5);
    return `hsl(${hue}, 80%, 50%)`;
  };

  const renderHeatMap = () => {
    let dayOfYear = 0;
    return Object.values(Months).map((month, monthIndex) => {
      const days = getMonthsInAYear(2024)[month];
      const firstDay = firstDayOfMonth[monthIndex];
      const weeks = Array.from({ length: 7 }, (_, dayOfWeekIndex) => {
        return Array.from({ length: 5 }, (_, weekIndex) => {
          const dayIndex =
            weekIndex * 7 +
            dayOfWeekIndex -
            (firstDay === 0 ? 6 : firstDay - 1);
          if (dayIndex >= 0 && dayIndex < days) {
            const events = props.data[dayOfYear];
            dayOfYear++;
            return (
              <div
                key={dayIndex}
                className="w-4 h-4 rounded-xs"
                style={{ backgroundColor: getColorFromValue(events) }}
                title={`${month} ${dayIndex + 1}: ${events * 1000} kWh`}
              />
            );
          } else {
            return <div key={dayIndex} className="w-4 h-4" />;
          }
        });
      });

      return (
        <div key={month} className="flex flex-col gap-1">
          <div className="text-xs text-gray-500 text-center">{month}</div>
          <div className="flex flex-col gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-1">
                {week}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const renderLegend = () => {
    const minValue = 0;
    const maxValue = 6.5;

    return (
      <div className="flex items-center my-5">
        <div
          className="w-5 h-[100px] relative"
          style={{
            background: `linear-gradient(to bottom, ${getColorFromValue(
              maxValue
            )}, ${getColorFromValue(minValue)})`,
          }}
        >
          <span className="text-xs text-gray-500 absolute -top-5 left-1/2 transform -translate-x-1/2">
            {maxValue * 1000}kWh
          </span>

          <span className="text-xs text-gray-500 absolute -bottom-5 left-1/2 transform -translate-x-1/2">
            {minValue * 1000}kWh
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-1 bg-white flex flex-col justify-center">
      <h1 className="text-md font-semibold text-center text-gray-500 mb-4">
        {props.mapHeader}
      </h1>
      <div className=" w-full flex gap-1 justify-between">
        <div className="w-11/12 flex flex-row gap-1 self-end">
          <div className="flex flex-col gap-1 self-end">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-xs text-gray-500 h-4 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex gap-1 overflow-auto">{renderHeatMap()}</div>
        </div>
        <div className="w-1/12 flex justify-center mt-4 min-w-16">
          {renderLegend()}
        </div>
      </div>
    </div>
  );
};

export default CustomHeatMap;
