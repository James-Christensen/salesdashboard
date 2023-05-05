import React from "react";
import { options } from "../lib/helpers";

export default function UpdateMonth({ data, onUpdate }) {
  const handleInputChange = (e, order, key) => {
    const value = Number(e.target.value); // convert value to number
    const index = data.findIndex((row) => row.order === order);
    const newData = [...data];
    newData[index][key] = value;
    // Update the Grand Total
    if (order !== 0) {
      const totalCurrent = newData
        .filter((row) => row.order !== 0)
        .reduce((acc, row) => acc + row.Current, 0);
      const totalForecast = newData
        .filter((row) => row.order !== 0)
        .reduce((acc, row) => acc + row.Forecast, 0);

      const grandTotalIndex = newData.findIndex((row) => row.order === 0);
      newData[grandTotalIndex].Current = totalCurrent;
      newData[grandTotalIndex].Forecast = totalForecast;
    }

    onUpdate(newData);
  };

  const renderRow = (row) => {
    return (
      <tr className="text-center" key={row.order}>
        <td className="text-center">{row.segment}</td>
        <td className="text-center p-0 m-0">
          <input
            type="number"
            value={row.Current}
            placeholder={row.Current.toLocaleString("en-US", options)}
            className="input input-warning p-0 m-0 max-w-xs"
            onChange={(e) => handleInputChange(e, row.order, "Current")}
          />
        </td>
        <td className="text-center p-0 m-0">
          <input
            type="number"
            value={row.Forecast}
            placeholder={row.Forecast.toLocaleString("en-US", options)}
            className="input input-warning  p-0 m-0 max-w-xs"
            onChange={(e) => handleInputChange(e, row.order, "Forecast")}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto mb-5 flex flex-col justify-center border rounded-sm border-warning w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center">
            <th className="text-center">Segment</th>
            <th className="text-center">Orders</th>
            <th className="text-center">Forecast</th>
          </tr>
        </thead>
        <tbody>{data.map((row) => renderRow(row))}</tbody>
      </table>
    </div>
  );
}
