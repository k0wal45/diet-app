import { Diet, Meal } from "@/lib/Types";
import React, { useState, useRef, useEffect } from "react";
import { FaMagnifyingGlass, FaXmark, FaTrash } from "react-icons/fa6";

// Przykładowy typ dla produktu (dostosuj do swojego z bazy danych)
interface Product {
  id: string;
  name: string;
}

// Przykładowa lista produktów do wyszukiwarki
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Pierś z kurczaka" },
  { id: "2", name: "Ryż basmati" },
  { id: "3", name: "Awokado" },
  { id: "4", name: "Oliwa z oliwek" },
  { id: "5", name: "Jajka" },
];

const AddMealForm = ({
  setAddMeal,
  setDietData,
}: {
  setAddMeal: React.Dispatch<React.SetStateAction<boolean>>;
  setDietData: React.Dispatch<
    React.SetStateAction<Omit<Diet, "id" | "createdAt">>
  >;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Meal, "id" | "createdAt">>({
    name: "",
    description: "",
    mealProducts: [],
    dietMeals: [],
  });
  const [macros, setMacros] = useState({
    kcal: 0,
    fats: 0,
    carbs: 0,
    protein: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    { product: Product; weight: number | undefined }[]
  >([]);

  // Referencja do zamykania dropdownu po kliknięciu poza niego
  const searchRef = useRef<HTMLDivElement>(null);

  // exit mechanism
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // macros update
  useEffect(() => {
    setMacros();
  }, [formData]);

  // Filtrowanie produktów na podstawie wpisanego tekstu
  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prev) => [...prev, { product, weight: 100 }]); // Domyślnie 100g
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleRemoveProduct = (indexToRemove: number) => {
    setSelectedProducts((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleWeightChange = (index: number, newWeight: string) => {
    // Remove leading zeros and non-digit characters
    const sanitized = newWeight.replace(/^0+/, "").replace(/\D/g, "");
    // If empty, set to undefined
    const weight = sanitized ? parseInt(sanitized) : undefined;
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index].weight = weight;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Saving meal with products:", selectedProducts);
    } catch (error) {
      console.error("Error adding diet:", error);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData: Omit<Meal, "id" | "createdAt">) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="relative w-120 rounded-xl z-10 p-4 bg-white border border-neutral-300 flex flex-col gap-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <FaXmark
        className="absolute top-4 right-4 hover:text-red-500 duration-100 cursor-pointer text-xl"
        onClick={() => setAddMeal(false)}
      />
      <p className="text-xl font-semibold">Add Meal</p>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-neutral-600">
          Name
        </label>
        <input
          placeholder="e.g. Breakfast"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          required
          onChange={handleInputChange}
          className="px-4 py-2 border-2 border-neutral-300 rounded-xl active:outline-none focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-neutral-600"
        >
          Description
        </label>
        <input
          placeholder="Optional description"
          type="text"
          name="description"
          id="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          className="px-4 py-2 border-2 border-neutral-300 rounded-xl active:outline-none focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Podsumowanie Makro */}
      <div className="grid grid-cols-4 w-full divide-x-2 divide-neutral-300 p-3 rounded-xl bg-neutral-100 mt-2">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xs text-neutral-500 uppercase font-bold">kcal</p>
          <p className="text-lg font-semibold text-neutral-800">100</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xs text-neutral-500 uppercase font-bold">Carbs</p>
          <p className="text-lg font-semibold text-neutral-800">100g</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xs text-neutral-500 uppercase font-bold">
            Protein
          </p>
          <p className="text-lg font-semibold text-neutral-800">100g</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xs text-neutral-500 uppercase font-bold">Fat</p>
          <p className="text-lg font-semibold text-neutral-800">100g</p>
        </div>
      </div>

      <hr className="my-2 border-neutral-200" />

      {/* Wyszukiwarka Produktów (Combobox) */}
      <div className="relative flex flex-col gap-2" ref={searchRef}>
        <div className="relative flex items-center">
          <FaMagnifyingGlass className="absolute left-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search and add product..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-10 pr-4 py-2 border-2 border-neutral-300 rounded-xl active:outline-none focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Dropdown z wynikami */}
        {isDropdownOpen && searchTerm && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border-2 border-neutral-300 rounded-xl shadow-lg max-h-40 overflow-y-auto z-20">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleAddProduct(p)}
                  className="px-4 py-2 hover:bg-neutral-100 cursor-pointer transition-colors"
                >
                  {p.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-neutral-500">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lista dodanych produktów */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
          {selectedProducts.map((item, index) => (
            <div
              key={`${item.product.id}-${index}`}
              className="flex items-center justify-between bg-neutral-50 border border-neutral-200 p-2 rounded-lg"
            >
              <span className="font-medium text-neutral-700 truncate max-w-[50%]">
                {item.product.name}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={item.weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  className="w-20 px-2 py-1 border border-neutral-300 rounded-md text-right focus:outline-none focus:border-primary"
                />
                <span className="text-sm text-neutral-500">g</span>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Przycisk zapisu całego posiłku */}
      <button
        type="submit"
        className="mt-2 px-4 py-3 bg-primary text-white font-semibold text-lg hover:brightness-90 active:scale-95 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Meal"}
      </button>
    </form>
  );
};

export default AddMealForm;
