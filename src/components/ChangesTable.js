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
export default function ChangesTable({ data, title }) {
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
              <th className="text-center text-xs ">Product</th>
              <th className="text-center text-xs">Segment</th>
              {/* Create a table header for each key in the first object of the data array */}
              {Object.keys(data[0])
                .filter(
                  (key) =>
                    key !== "id" &&
                    key !== "date" &&
                    key !== "order" &&
                    key !== "product" &&
                    key !== "segment"
                )
                .map((key) => (
                  <th
                    className="text-center text-xs w-40"
                    key={key}
                    colSpan="2"
                  >
                    {key.replaceAll("_", " ")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {/* Create a table row for each object in the data array */}
            {data.map((row) => (
              <tr className="text-center text-xs" key={row.id}>
                <td className="text-center text-xs">{row.product}</td>
                <td className="text-center text-xs">{row.segment}</td>
                {/* Create a table cell for each value in the object */}
                {Object.entries(row)
                  .filter(
                    ([key]) =>
                      key !== "id" &&
                      key !== "date" &&
                      key !== "order" &&
                      key !== "product" &&
                      key !== "segment"
                  )
                  .flatMap(([key, value]) => [
                    <td
                      className={`text-center text-xs ${
                        isNaN(value.absolute) || key === "closed_lost"
                          ? ""
                          : value.absolute === 0
                          ? "text-warning"
                          : value.absolute > 0
                          ? "text-success"
                          : "text-error"
                      }`}
                      key={key}
                    >
                      {isNaN(value.absolute)
                        ? value.absolute
                        : value.absolute.toLocaleString("en-US", options)}
                    </td>,
                    <td
                      className={`text-center text-xs ${
                        isNaN(value.percentage) ||
                        key === "closed_won" ||
                        key === "closed_lost"
                          ? ""
                          : value.percentage === 0
                          ? "text-warning"
                          : value.percentage > 0
                          ? "text-success"
                          : "text-error"
                      }`}
                      key={`${key}_percentage`}
                    >
                      {isNaN(value.percentage)
                        ? value.percentage
                        : `${Math.ceil(
                            parseFloat(value.percentage)
                          ).toLocaleString("en-US")}%`}
                    </td>,
                  ])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
