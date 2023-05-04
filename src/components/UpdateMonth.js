import React from "react";
import { options } from "../lib/helpers";

export default function UpdateMonth({ data, onUpdate }) {
  const handleInputChange = (e, order, key) => {
    const value = e.target.value;
    // Ensure that value is a positive integer
    if (/^[1-9]\d*$/.test(value) || value === "") {
      const index = data.findIndex((row) => row.order === order);
      const newData = [...data];
      newData[index][key] = value;
      //may need to remove for database
      // newData[index][key] = Number(value).toLocaleString("en-US", options);
      onUpdate(newData);
    }
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
