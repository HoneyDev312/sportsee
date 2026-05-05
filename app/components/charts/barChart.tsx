import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import type { UserActivity } from "~/features/userActivity/types";
import { formatActivityDistanceByWeek } from "~/features/userActivity/domain";

type MyBarChartProps = {
  activity: UserActivity[];
  startWeek: string;
};

export const MyBarChart = ({ activity, startWeek }: MyBarChartProps) => {
  const data = formatActivityDistanceByWeek(activity, startWeek);

  return (
    <BarChart
      style={{
        width: "100%",
        height: "300px",
        aspectRatio: 1,
      }}
      responsive
      data={data}
    >
      <CartesianGrid strokeDasharray="2" strokeOpacity="50%" vertical={false} />
      <XAxis dataKey="name" tickLine={false} tickMargin={24} fontSize={12} />
      <YAxis width="auto" tickLine={false} tickMargin={12} fontSize={12} />
      <Legend
        iconType="circle"
        iconSize={8}
        align="left"
        wrapperStyle={{ bottom: -8, left: 16 }}
      />
      <Tooltip />
      <Bar
        dataKey="Km"
        fill="#B6BDFC"
        radius={999}
        barSize={16}
        stroke="#ffffff"
        strokeWidth={2}
      />
      <RechartsDevtools />
    </BarChart>
  );
};
