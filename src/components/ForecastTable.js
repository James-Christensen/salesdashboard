import React from "react";
import { options } from "../lib/helpers";

const formatCurrency = (value) => {
  const formattedValue = Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedValue;
};

export default function ForecastTable({ data }) {
  return (
    <div className="overflow-x-auto mb-5 flex flex-col justify-center border rounded-sm border-primary w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-lg">
            <th className="text-center ">Segment</th>
            <th className="text-center ">Orders</th>
            <th className="text-center ">Forecast</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className="text-center" key={row.order}>
              <td className="text-center ">{row.segment}</td>
              <td className="text-center">{formatCurrency(row.Current)}</td>
              <td className="text-center">{formatCurrency(row.Forecast)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
