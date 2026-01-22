"use client";
import fetchWithCache from "@/lib/fetchWithCache";
import { Product } from "@/lib/Types";
import React, { Fragment, useEffect, useState } from "react";
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
          "/api/products/getProducts",
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
          [],
        );

        setProductsData(grouped);

        // initialize layoutState: keys are category names, values are false
        const initialLayout = grouped.reduce(
          (acc: Record<string, boolean>, g: GroupedProduct) => {
            acc[g.category] = false;
            return acc;
          },
          {},
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
            <Fragment key={item.category}>
              <div
                className={`relative grid grid-cols-5 p-4 w-full ${
                  layoutState[item.category]
                    ? "bg-neutral-400"
                    : "bg-neutral-300"
                } transform-color`}
              >
                <p>{item.category}</p>
                <p>Carbs</p>
                <p>Fats</p>
                <p>Protein</p>
                <p>kcal</p>
                <RiArrowDownSLine
                  className={`${
                    layoutState[item.category] ? "rotate-180" : ""
                  } cursor-pointer transition-transform text-2xl absolute top-1/2 right-12 -translate-y-1/2`}
                  onClick={() =>
                    setLayoutState((prev) => ({
                      ...prev,
                      [item.category]: !prev[item.category],
                    }))
                  }
                />
              </div>
              {item.products.map((product, index) => (
                <ul
                  className={`grid grid-cols-5 p-4 ${
                    index % 2 == 0 ? "bg-neutral-50" : ""
                  } ${layoutState[item.category] ? "block" : "hidden"}`}
                  key={index}
                >
                  <li className="flex gap-1">{product.name}</li>
                  <li className="flex gap-1">
                    {product.carbs}
                    <span className="block text-neutral-600">g</span>
                  </li>
                  <li className="flex gap-1">
                    {product.fat}
                    <span className="block text-neutral-600">g</span>
                  </li>
                  <li className="flex gap-1">
                    {product.protein}
                    <span className="block text-neutral-600">g</span>
                  </li>
                  <li className="flex gap-1">
                    {product.kcal}
                    <span className="block text-neutral-600">kcal</span>
                  </li>
                </ul>
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsList;
