import { React, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Month } from "../lib/helpers";
import ForecastTable from "@/components/forecastTable";
import UpdateMonth from "@/components/UpdateMonth";

export default function AddData({ data }) {
  console.log(data);
  const [isEditing, setIsEditing] = useState(false);
  const [monthData, setMonthData] = useState(data);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    alert("Saving!");
    setIsEditing(!isEditing);
  };
  const handleInputChange = (newData) => {
    setMonthData(newData);
  };

  if (isEditing === true) {
    return (
      <div className="flex flex-col justify-center items-center w-1/2 mx-auto">
        <h1 className="mb-1 text-2xl  text-warning">Editing...</h1>
        <UpdateMonth data={monthData} onUpdate={handleInputChange} />
        <button
          onClick={handleSave}
          className="btn btn-outline btn-warning self-end"
        >
          Save
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2 mx-auto">
      <h1 className="mb-1 text-2xl">{`${Month} Bookings and Forecast`}</h1>
      <ForecastTable data={monthData} />
      <button
        onClick={handleEdit}
        className="btn btn-outline btn-info self-end"
      >
        Edit
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("monthly_forecast")
    .select("*")
    .order("order", { ascending: false });
  return {
    props: {
      data: data,
    },
  };
}
