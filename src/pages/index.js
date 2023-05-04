import Head from "next/head";
//import supabase client from /lib/supabaseClient.js
import supabase from "../lib/supabaseClient";
//Supabase auth imports
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  console.log(sales);
  //test variable to get a single row of data from the sales array.
  const singleRow = sales[0];

  //Array of all pipeline_totals for each week in the sales array.
  const pipelineTotals = sales.map((row) =>
    row.pipeline_total.toLocaleString("en-US", options)
  );
  //array containing the unique values for dates in the sales array.
  const weeks = sales.map((row) => row.date);
  //remove duplicate values from weeks array
  const uniqueWeeks = [...new Set(weeks)];
  console.log(uniqueWeeks);
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
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sales}
              width={500}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="week"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="pipeline_total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          
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
