import PropTypes from "prop-types";

const ProductCard = ({ cake, view }) => {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-gray-100 shadow-lg ${
        view === "list" ? "flex" : ""
      }`}
    >
      <div
        className={`relative ${view === "list" ? "sm:w-1/4 md:w-1/5" : "1/3"}`}
      >
        <img
          src={cake.cakeImages[0]}
          alt="product"
          className={`${view === "list" ? "h-44" : "h-48"} w-full object-cover`}
        />
        <div className="absolute top-0 left-0 bg-yellow-600 px-2 py-1 text-white">
          20% OFF
        </div>
      </div>
      <div className={`p-3 ${view === "list" ? "w-4/5" : ""}`}>
        <h3
          className={`${view === "list" ? "" : "line-clamp-2 min-h-[3rem]"} text-lg font-semibold text-gray-900`}
        >
          {cake.cakeName}
        </h3>
        {view === "list" && (
          <p className="mt-1 line-clamp-3 text-gray-700">
            {cake.cakeDescription}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-gray-900">
            NZ$ {cake.cakeOptions[0].price}
          </span>
          <button className="rounded-lg bg-yellow-600 px-3 py-1 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  cake: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};

export default ProductCard;
