import { Client } from "@/lib/Types";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

const ClientItem = ({ client }: { client: Client }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl shadow-lg text-black">
      <div className="flex gap-6 text-lg items-center w-60">
        {client.sex.toLowerCase() === "male" ? <FaMale /> : <FaFemale />}
        <p className="font-semibold">{client.name}</p>
      </div>

      <div className="flex gap-4 items-center">
        {/* age */}
        <div className="flex flex-col">
          <p>Age</p>
          <p className="text-lg font-semibold">{client.age}</p>
        </div>
        {/* height */}
        <div className="flex flex-col">
          <p>Height</p>
          <p className="text-lg font-semibold">{client.height}</p>
        </div>
        {/* weight */}
        <div className="flex flex-col">
          <p>Weight</p>
          <p className="text-lg font-semibold">{client.weight}</p>
        </div>
        {/* weight */}
        <div className="flex flex-col">
          <p>Activity</p>
          <p className="text-lg font-semibold">{client.activityFactor}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientItem;
