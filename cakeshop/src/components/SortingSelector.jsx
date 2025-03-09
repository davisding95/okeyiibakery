const SortingSelector = () => {
  return (
    <form className="flex items-center justify-center gap-2">
      <label htmlFor="categories" className="text-sm font-medium text-gray-900">
        Sort By
      </label>
      <select
        id="categories"
        defaultValue={"default"}
        className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="default">Default</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="priceAsc">Price: Low to High</option>
      </select>
    </form>
  );
};
export default SortingSelector;
