import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseRepresentation = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 10, left: 60, bottom: 5 }}
      >
        <XAxis tick={false} axisLine={false} type="number" domain={[0, 450]} />
        <YAxis
          dataKey="category"
          type="category"
          tick={{
            fontSize: 12,
            fill: "black",
          }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Bar
          maxBarSize={200}
          barSize={21}
          radius={[0, 20, 20, 0]}
          dataKey="amount"
          fill="#8784D2"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseRepresentation;
