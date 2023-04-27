import React from "react";

//options to convert number to formatted US dollar currency
const options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

//React component that accepts data as a parameter and displays a table of the data.
//The data is an array of objects. Each object is a row in the table.
//The keys of the objects are the column names and the values are the data for the row.
export default function Table({ data, title }) {
  // sort the data based on the value of order
  data.sort((a, b) => {
    return b.order - a.order;
  });
  return (
    <div>
      <h1 className="text-sm mb-2 justify-self-start ml-1/5 mr-auto">
        {title}
      </h1>
      <div className="overflow-x-auto mb-5 flex flex-col justify-center border rounded-sm border-primary">
        <table className="table table-compact table-zebra w-full">
          <thead>
            <tr className="text-center text-xs">
              {/* Create a table header for each key in the first object of the data array */}
              {Object.keys(data[0])
                .filter(
                  (key) => key !== "id" && key !== "date" && key !== "order"
                )
                .map((key) => (
                  <th className="text-center text-xs" key={key}>
                    {key.replaceAll("_", " ")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {/* Create a table row for each object in the data array */}
            {data.map((row) => (
              <tr className="text-center text-xs" key={row.id}>
                {/* Create a table cell for each value in the object */}
                {Object.entries(row)
                  .filter(
                    ([key]) => key !== "id" && key !== "date" && key !== "order"
                  )
                  .map(([key, value]) => (
                    <td className="text-center text-xs">
                      {value.toLocaleString("en-US", options)}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
