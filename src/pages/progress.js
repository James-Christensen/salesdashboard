import React from "react";
import supabase from "../lib/supabaseClient";
import ProgressTable from "../components/ProgressTable";
//page for progress YTD and MTD for sales by segment against targets.
//Page displays one large table. The table is split into two sections.
//The first section is for the current month and the second is for the year to date.
export default function Progress({ targets, results, forecast }) {
  return (
    <div className="flex flex-col w-full md:w-10/12 justify-center align-middle h-full items-center mx-auto">
      <h1 className="text-center w-full mb-5">Month & Year Progress</h1>
      <ProgressTable targets={targets} results={results} forecast={forecast} />
    </div>
  );
}

export async function getServerSideProps() {
  const [targetData, resultData, forecastData] = await Promise.all([
    supabase
      .from("2023_targets")
      .select("*")
      .order("order", { ascending: false }),
    supabase
      .from("2023_results")
      .select("*")
      .order("order", { ascending: false }),
    supabase
      .from("monthly_forecast")
      .select("*")
      .order("order", { ascending: false }),
  ]);

  return {
    props: {
      targets: targetData.data,
      results: resultData.data,
      forecast: forecastData.data,
    },
  };
}
