import SortingSelector from "../components/SortingSelector";
import CategorySidebar from "../components/CategorySidebar";
import ListGridToggler from "../components/ListGridToggler";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const Products = () => {
  const [view, setView] = useState("grid");

  const cakes = [
    {
      id: 1,
      cakeName: "Chocolate Cake",
      cakeDescription: "A delicious chocolate cake with rich cocoa flavor.",
      cakeImages: ["https://via.placeholder.com/150"],
      cakeOptions: [{ size: "Small", price: 25 }]
    },
    {
      id: 2,
      cakeName: "Vanilla Cake",
      cakeDescription: "Classic vanilla cake with a soft and fluffy texture.",
      cakeImages: ["https://via.placeholder.com/150"],
      cakeOptions: [{ size: "Medium", price: 30 }]
    },
    {
      id: 3,
      cakeName: "Strawberry Cake",
      cakeDescription: "A fruity strawberry cake made with fresh berries.",
      cakeImages: ["https://via.placeholder.com/150"],
      cakeOptions: [{ size: "Large", price: 35 }]
    },
    {
      id: 4,
      cakeName: "Cheesecake",
      cakeDescription: "A creamy cheesecake with a buttery biscuit base.",
      cakeImages: ["https://via.placeholder.com/150"],
      cakeOptions: [{ size: "Standard", price: 40 }]
    }
  ];
  
  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <div className="mx-auto mb-5 max-w-7xl px-2 py-5 sm:px-4">
      {/* sort by block */}
      <div className="flex items-center justify-between gap-4 md:justify-end">
        <div className="flex items-center md:hidden">
        </div>
        <div className="flex items-center gap-4">
          <SortingSelector />
          <ListGridToggler view={view} handleChange={handleChange} />
        </div>
      </div>

      {/* main content */}
      <div className="mt-5 gap-4 border-t border-gray-200 md:grid md:grid-cols-[200px_1fr]">
        <div className="col-span-1 hidden border-r border-gray-200 pt-3 md:block">
          <CategorySidebar />
        </div>
        <div className="col-span-1 mt-3">
          <div
            className={`grid gap-4 ${view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
          >
           {cakes.map((cake) => (
              <ProductCard key={cake.id} cake={cake} view={view} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
