"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import { Product } from "@/lib/Types";
import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface GroupedProduct {
  category: string;
  products: Product[];
}

const ProductsList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<GroupedProduct[]>([]);
  const [layoutState, setLayoutState] = useState<Record<string, boolean>>({});

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

        // initialize layoutState: keys are category names, values are false
        const initialLayout = grouped.reduce(
          (acc: Record<string, boolean>, g) => {
            acc[g.category] = false;
            return acc;
          },
          {}
        );
        setLayoutState(initialLayout);

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
    <section className="flex gap-4 flex-col w-full">
      <h1 className="text-3xl font-semibold">List of all products</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col rounded-xl w-full overflow-hidden">
          {productsData.map((item: GroupedProduct) => (
            <div
              className="flex items-center justify-between p-4 w-full bg-neutral-300"
              key={item.category}
            >
              <p>{item.category}</p>
              <RiArrowDownSLine
                className={`${
                  layoutState[item.category] ? "rotate-180" : ""
                } cursor-pointer transition-transform text-2xl`}
                onClick={() =>
                  setLayoutState((prev) => ({
                    ...prev,
                    [item.category]: !prev[item.category],
                  }))
                }
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsList;
