import { PieChart, Pie } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import "./pie.css";

function renderPieLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  name,
  value,
}: PieLabelRenderProps) {
  const isCompleted = name === "réalisées";
  const radius = Number(outerRadius);
  const angle = -Number(midAngle) * (Math.PI / 180);
  const x = Number(cx) + radius * Math.cos(angle) + (isCompleted ? -56 : 0);
  const y = Number(cy) + radius * Math.sin(angle) + (isCompleted ? 20 : -20);

  return (
    <g>
      <circle cx={x - 8} cy={y - 4} r={3} fill={fill} />
      <text x={x} y={y} fill="#6e6e7a" fontSize={10} textAnchor="start">
        {value} {name}
      </text>
    </g>
  );
}

type MyPieChartProps = {
  completed: number;
  remaining: number;
};

export const MyPieChart = ({ completed, remaining }: MyPieChartProps) => {
  const data = [
    { name: "réalisées", value: completed, fill: "#0B23F4" },
    { name: "restantes", value: remaining, fill: "#B6BDFC" },
  ];
  return (
    <div className="dashboard-pie-chart-wrapper">
      <PieChart
        className="dashboard-pie-chart"
        style={{
          width: "100%",
          height: "260px",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          startAngle={125}
          endAngle={360 + 125}
          label={renderPieLabel}
          labelLine={false}
          nameKey="name"
          paddingAngle={0}
          stroke="none"
          strokeWidth={0}
          cornerRadius={3}
          isAnimationActive={true}
        />
        <RechartsDevtools />
      </PieChart>
    </div>
  );
};
