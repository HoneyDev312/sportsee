import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useUser } from "~/user/user";
import { formatDayOfWeek } from "~/helpers/formatters";

export const MyComposedChart = () => {
  const { activity } = useUser();

  const data = activity.map(
    (session: {
      date: string;
      heartRate: { min: number; max: number; average: number };
    }) => ({
      name: formatDayOfWeek(session.date),
      min: session.heartRate.min,
      max: session.heartRate.max,
      avg: session.heartRate.average,
    }),
  );

  return (
    <ComposedChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
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
        dataKey="min"
        fill="#FCC1B6"
        radius={999}
        barSize={16}
        stroke="##FCC1B6"
        strokeWidth={2}
      />
      <Bar
        dataKey="max"
        fill="#F4320B"
        radius={999}
        barSize={16}
        stroke="#ffffff"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="avg"
        activeDot={{ fill: "#0B23F4", strokeWidth: 1, r: 4 }}
        dot={{ fill: "#0B23F4", stroke: "#FFFFFF", strokeWidth: 1, r: 4 }}
        stroke="#F2F3FF"
        strokeWidth={3}
        isAnimationActive={true}
      />
      <RechartsDevtools />
    </ComposedChart>
  );
};
