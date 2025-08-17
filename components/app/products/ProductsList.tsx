"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchWithCache(
          "products",
          "/api/products/getProducts"
        );
        setProductsData(data);
        setLoading(false);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        return;
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex gap-4 flex-col">
      <h1 className="text-xl font-semibold">Products</h1>
      {loading ? <p>loading...</p> : <div className="">Products here</div>}
    </section>
  );
};

export default ProductsList;
