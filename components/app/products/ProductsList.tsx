"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import { Product } from "@/lib/Types";
import React, { useEffect, useState } from "react";

interface GroupedProduct {
  category: string;
  products: Product[];
}

const ProductsList = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<GroupedProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchWithCache(
          "products",
          "/api/products/getProducts"
        );

        const grouped = data.reduce(
          (acc: GroupedProduct[], product: Product) => {
            const category = product.category || "Uncategorized";
            let group = acc.find((g) => g.category === category);
            if (!group) {
              group = { category, products: [] };
              acc.push(group);
            }
            group.products.push(product);
            return acc;
          },
          []
        );

        setProductsData(grouped);

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
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-wrap">
          {productsData.map((item: GroupedProduct) => (
            <div key={item.category} className="flex flex-col">
              <h2 className="text-xl font-semibold">{item.category}</h2>
              <ul className="p-2 flex flex-col">
                {item.products.map((product: Product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsList;
