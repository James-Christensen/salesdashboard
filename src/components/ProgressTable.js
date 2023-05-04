import React from "react";
import {
  getCurrentMonthAndRatio,
  calculateYtdData,
  sumForMonths,
  options,
} from "../lib/helpers";

const { currentMonth, currentMonthRatio } = getCurrentMonthAndRatio();

//component for progress table. The table shows the progress for the current month and the year to date.
//The rows include a header row, and a row for each product segment.The product segments are Contract,Non-Contract, Indirect MIPS Solutions, and APM Solutions .
//MIPS Soltuions Total is the sum of Direct, Non-Contract, and Indirect.
//There is also a row for the Total Bookings that is the sum of MIPS Solutions and APM Solutions.
//The columns include the following groupings: Segment, Current Month, and YTD.
//Current Month is broken into the following columns: Acutal, Forecast, Target, Forecast: Target, and Actual:Target.
//The YTD columns are 2023 YTD, 2023 Financial Target, and YTD Progress Percent.
export default function ProgressTable({ targets, results, forecast }) {
  const {
    Contract: contract,
    "Non-Contract": non_contract,
    Indirect: indirect,
    "APM Solutions": apm_solutions,
    "Grand Total": grand_total,
  } = calculateYtdData(targets, results, currentMonth, currentMonthRatio);

  const MIPS_target = contract.target + non_contract.target + indirect.target;
  const MIPS_progress =
    contract.progress + non_contract.progress + indirect.progress;
  const MIPS_monthly_progress =
    results[0][currentMonth] +
    results[1][currentMonth] +
    results[2][currentMonth];
  const MIPS_monthly_target =
    targets[0][currentMonth] +
    targets[1][currentMonth] +
    targets[2][currentMonth];

  const MIPS_monthly_forecast =
    forecast[0].Forecast + forecast[1].Forecast + forecast[2].Forecast;

  return (
    <div className="overflow-x-auto mb-5 flex flex-col justify-center border rounded-sm border-primary">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-xs">
            <th rowSpan="1" className="text-center text-xs"></th>
            <th colSpan="5" className="text-center text-xs ">
              Current Month
            </th>
            <th colSpan="3" className="text-center text-xs">
              Year to Date
            </th>
          </tr>
          <tr className="text-center text-xs">
            <th className="text-center text-xs">Segment</th>
            <th className="text-center text-xs">Actual</th>
            <th className="text-center text-xs">Forecast</th>
            <th className="text-center text-xs">Target</th>
            <th className="text-center text-xs">Forecast: Target</th>
            <th className="text-center text-xs">Actual: Target</th>
            <th className="text-center text-xs">2023 YTD</th>
            <th className="text-center text-xs">2023 Financial Target</th>
            <th className="text-center text-xs">Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">Contract</td>
            <td className="text-center text-xs">
              {results[0][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {forecast[0].Forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {targets[0][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {(
                (forecast[0].Forecast / targets[0][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {(
                (results[0][currentMonth] / targets[0][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {results[0].segment_total.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {contract.target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {contract.percent.toFixed(0) + "%"}
            </td>
          </tr>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">Non-Contract</td>
            <td className="text-center text-xs">
              {results[1][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {forecast[1].Forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {targets[1][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {(
                (forecast[1].Forecast / targets[1][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {(
                (results[1][currentMonth] / targets[1][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {results[1].segment_total.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {non_contract.target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {non_contract.percent.toFixed(0) + "%"}
            </td>
          </tr>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">Indirect</td>
            <td className="text-center text-xs">
              {results[2][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {forecast[2].Forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {targets[2][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {(
                (forecast[2].Forecast / targets[2][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {(
                (results[2][currentMonth] / targets[2][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {results[2].segment_total.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {indirect.target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {indirect.percent.toFixed(0) + "%"}
            </td>
          </tr>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">MIPS Solutions</td>
            <td className="text-center text-xs">
              {MIPS_monthly_progress.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {MIPS_monthly_forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {MIPS_monthly_target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {((MIPS_monthly_forecast / MIPS_monthly_target) * 100).toFixed(
                0
              ) + "%"}
            </td>
            <td className="text-center text-xs">
              {((MIPS_monthly_progress / MIPS_monthly_target) * 100).toFixed(
                0
              ) + "%"}
            </td>
            <td className="text-center text-xs">
              {MIPS_progress.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {MIPS_target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {((MIPS_progress / MIPS_target) * 100).toFixed(0) + "%"}
            </td>
          </tr>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">APM Solutions</td>
            <td className="text-center text-xs">
              {results[3][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {forecast[3].Forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {targets[3][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {(
                (forecast[3].Forecast / targets[3][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {(
                (results[3][currentMonth] / targets[3][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {results[3].segment_total.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {apm_solutions.target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {apm_solutions.percent.toFixed(0) + "%"}
            </td>
          </tr>
          <tr className="text-center text-xs">
            <td className="text-center text-xs">Total Bookings</td>
            <td className="text-center text-xs">
              {results[4][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {forecast[4].Forecast.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {targets[4][currentMonth].toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {(
                (forecast[4].Forecast / targets[4][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {(
                (results[4][currentMonth] / targets[4][currentMonth]) *
                100
              ).toFixed(0) + "%"}
            </td>
            <td className="text-center text-xs">
              {results[4].segment_total.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {grand_total.target.toLocaleString("en-US", options)}
            </td>
            <td className="text-center text-xs">
              {grand_total.percent.toFixed(0) + "%"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
