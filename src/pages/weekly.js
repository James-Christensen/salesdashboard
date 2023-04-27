import React from "react";
import supabase from "../lib/supabaseClient";
import Table from "@/components/Table";
import Changes from "@/components/Changes";
//Page for the weekly view of the total pipeline data. Includes two tables.
//One for the most recent week and one for the previous week.

export default function Weekly({ weekOne, weekTwo }) {
  console.log(weekOne);
  console.log(weekTwo);
  //function to convert string to date
  const date = weekOne[0].date;
  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const localOffset = new Date().getTimezoneOffset() * 60000; // Get the local timezone offset in milliseconds
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleString("en-US", {
    ...dateOptions,
    timeZone: "UTC",
  });

  //conditional rendering based on if data has loaded or not.
  if (!weekOne || !weekTwo) {
    return <p>Waiting on Data...</p>;
  }
  //show three tables if data has loaded.
  //The first table is for the most recent week.
  //The second table is for the previous week.
  //The third table is for the difference between the two weeks.
  return (
    <div className="flex flex-col w-full md:w-10/12 justify-center align-middle h-full items-center mx-auto">
      {/* Title for Page */}
      <div className="mb-5">
        <h1 className="text-center w-full">
          Pipeline: Week Ending {formattedDate}
        </h1>
        <h1 className="text-center w-full text-sm ">
          Snapshot & Weekly Changes
        </h1>
      </div>

      {/* First Table */}
      <Table data={weekOne} title={'Pipeline Total'} />

      {/* Second Table showing changes */}
      <Changes weekTwo={weekTwo} weekOne={weekOne} />
    </div>
  );
}

//use getServerSideProps to fetch data for the two most recent weeks from supabase.
export async function getServerSideProps() {
  //fetch the the most recent 12 rows of data from weekly_pipeline table after sorting by descending date.
  const { data, error } = await supabase
    .from("weekly_pipeline")
    .select("*")
    .order("date", { ascending: false })
    .range(0, 11);
  //console.log any errors
  if (error) console.log(error);
  //split the data into two arrays for the two weeks
  const weekOneData = data.slice(0, 6);
  const weekTwoData = data.slice(6, 12);

  //return data
  return {
    props: {
      weekOne: weekOneData,
      weekTwo: weekTwoData,
    },
  };
}
