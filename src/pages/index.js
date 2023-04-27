import Head from "next/head";
//import supabase client from /lib/supabaseClient.js
import supabase from "../lib/supabaseClient";
//Supabase auth imports
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

//options to convert number to formatted US dollar currency
const options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export default function Home({ sales }) {
  //variables for Supabase auth:
  const session = useSession();
  const supabase = useSupabaseClient();

  //test variable to get a single row of data from the sales array.
  const singleRow = sales[0];
  console.log(singleRow);
  //destructure the singleRow object to get the data for id, product, segment.
  const {
    id,
    product,
    segment,
    date,
    meeting_demo,
    needs_analysis,
    negotiation_review,
    pipeline_total,
    proposal_price_quote,
    prospecting,
    qualification,
    closed_won,
    closed_lost,
  } = singleRow;

  //function to convert string to date
  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const localOffset = new Date().getTimezoneOffset() * 60000; // Get the local timezone offset in milliseconds
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleString("en-US", {
    ...dateOptions,
    timeZone: "UTC",
  });
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        //Auth component from Supabase UI. This is the login page.
        <div className="container px-12 pt-20 w-full md:w-8/12 lg:w-1/3 mx-auto">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-center">Home Page</h1>
          <table className="table-auto border-collapse border border-slate-400 ">
            <thead className="text-center text-sm ">
              <tr>
                <th className="border border-slate-300 px-2">Week Ending</th>
                <th className="border border-slate-300 px-2">Product</th>
                <th className="border border-slate-300 px-2">Segment</th>
                <th className="border border-slate-300 px-2">Prospecting</th>
                <th className="border border-slate-300 px-2">Qualification</th>
                <th className="border border-slate-300 px-2">Needs Analysis</th>
                <th className="border border-slate-300 px-2">Meeting Demo</th>
                <th className="border border-slate-300 px-2">Proposal</th>
                <th className="border border-slate-300 px-2">Negotiation</th>
                <th className="border border-slate-300 px-2">Pipeline Total</th>
                <th className="border border-slate-300 px-2">Closed Won</th>
                <th className="border border-slate-300 px-2">Closed Lost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs text-center px-2">
                <td>{formattedDate}</td>
                <td>{product}</td>
                <td>{segment}</td>
                <td>{prospecting.toLocaleString("en-US", options)}</td>
                <td>{qualification.toLocaleString("en-US", options)}</td>
                <td>{needs_analysis.toLocaleString("en-US", options)}</td>
                <td>{meeting_demo.toLocaleString("en-US", options)}</td>
                <td>{proposal_price_quote.toLocaleString("en-US", options)}</td>
                <td>{negotiation_review.toLocaleString("en-US", options)}</td>
                <td>{pipeline_total.toLocaleString("en-US", options)}</td>
                <td>{closed_won.toLocaleString("en-US", options)}</td>
                <td>{closed_lost.toLocaleString("en-US", options)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

//use getServerSideProps to fetch data from supabase
export async function getServerSideProps() {
  //fetch data from supabase
  const { data, error } = await supabase.from("weekly_pipeline").select("*");
  //handle error by console.loggin it.
  if (error) console.log(error);

  //return data
  return {
    props: {
      sales: data,
    },
  };
}
