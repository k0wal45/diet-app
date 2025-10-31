"use client";

import AddProduct from "@/components/app/products/AddProduct";
import ProductsList from "@/components/app/products/ProductsList";

const Page = () => {
  return (
    <section className="flex flex-col gap-8 p-8 w-full">
      <div className="flex gap-8">
        <AddProduct />
        <ProductsList />
      </div>
    </section>
  );
};

export default Page;
