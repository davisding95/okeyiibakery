import SortingSelector from "../components/SortingSelector";
import ListGridToggler from "../components/ListGridToggler";
import ProductCard from "../components/ProductCard";
import CategorySidebar from "../components/CategorySidebar";
import { useContext, useState } from "react";
import CakeContext from "../contexts/CakeContext";
import FilterDrawer from "../components/FilterDrawer";

const Products = () => {
  const useCake = useContext(CakeContext);
  const { cakes, isLoading } = useCake;
  const [view, setView] = useState("grid");

  if (isLoading) {
    return (
      <div className="mx-auto mt-5 max-w-7xl px-2 py-1 sm:px-4 sm:py-5">
        <h1 className="text-2xl font-semibold text-gray-900">Loading...</h1>
      </div>
    );
  }

  console.log(cakes);

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
          <FilterDrawer />
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
