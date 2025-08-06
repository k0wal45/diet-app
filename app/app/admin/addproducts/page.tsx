"use client";

import AddProduct from "@/components/app/admin/AddProduct";

const Page = () => {
  return (
    <section className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <p className="text-thin">Add products</p>
      </div>
      <AddProduct />
    </section>
  );
};

export default Page;
