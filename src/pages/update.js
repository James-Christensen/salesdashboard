import { React, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Month } from "../lib/helpers";
import ForecastTable from "@/components/ForecastTable";
import UpdateMonth from "@/components/UpdateMonth";
const monthColumnName = `${new Date().getMonth() + 1}`;

export default function AddData({ data }) {
  const [initialData, setInitialData] = useState(
    JSON.parse(JSON.stringify(data))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [monthData, setMonthData] = useState(data);

  const hasRowChanged = (original, updated) => {
    return (
      original.Forecast !== updated.Forecast ||
      original.Current !== updated.Current
    );
  };

  const updateMonthlyForecast = async (segment, newData) => {
    const { data, error } = await supabase
      .from("monthly_forecast")
      .update(newData)
      .eq("segment", segment);

    console.log("success");

    if (error) {
      console.error("Error updating monthly forecast:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    alert("Saving!");

    const updatePromises = monthData.map((item, index) => {
      if (hasRowChanged(initialData[index], item)) {
        return updateMonthlyForecast(item.segment, {
          Forecast: item.Forecast,
          Current: item.Current,
        });
      }
      return null;
    });

    await Promise.all(updatePromises);

    setIsEditing(!isEditing);
    setInitialData(JSON.parse(JSON.stringify(monthData)));
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
