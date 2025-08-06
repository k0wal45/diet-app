import { Client } from "@/lib/Types";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

const ClientItem = ({ client }: { client: Client }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl shadow-lg text-black">
      <div className="flex gap-4">
        {client.sex.toLowerCase() === "male" ? <FaMale /> : <FaFemale />}
      </div>
    </div>
  );
};

export default ClientItem;
