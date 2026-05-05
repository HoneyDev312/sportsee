import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

export const MyBarChart = () => {
  const data = [
    {
      name: "S1",
      Km: 10,
    },
    {
      name: "S2",
      Km: 21,
    },
    {
      name: "S3",
      Km: 4,
    },
    {
      name: "S4",
      Km: 14,
    },
  ];
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
