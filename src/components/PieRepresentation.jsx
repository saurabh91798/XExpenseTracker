/* eslint-disable react/prop-types */
import React from "react";
import "./PieRepresentation.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const CustomExpenseLegend = ({ payload }) => {
  return (
    <ul className="expenselegend">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ color: "white" }}>
          <span
            style={{
              marginRight: 4,
              backgroundColor: entry.color,
              display: "inline-block",
              width: 26,
              height: 8,
            }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const PieRepresentation = ({ data }) => {
  const COLORS = [
    "#A000FF",
    "#FF9304",
    "#FDE006",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FF8C33",
    "#33FFF7",
    "#8C33FF",
    "#FFD433",
    "#33FF8C",
    "#FF3333",
  ];
  return (
    <>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend content={CustomExpenseLegend} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieRepresentation;
