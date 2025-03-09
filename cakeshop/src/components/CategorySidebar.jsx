const CategorySidebar = () => {
  return (
    <>
      <h2 className="text-md font-semibold text-gray-700">Categories</h2>
      <form className="mt-3 flex flex-col gap-2 text-gray-500">
        <div className="flex items-center gap-2">
          <input type="radio" id="all" name="category" value="all" />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" id="cakes" name="category" value="cakes" />
          <label htmlFor="cakes">Cakes</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" id="pastries" name="category" value="pastries" />
          <label htmlFor="pastries">Pastries</label>
        </div>
      </form>
    </>
  );
};
export default CategorySidebar;
