const AboutUs = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to our cozy corner of sweetness! We are a small, family-run business
          that has been creating handcrafted cakes for over 20 years. Our passion for
          baking started in our grandmother’s kitchen, and has since been passed down
          through generations.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Every cake we make is a labor of love. We use only the finest ingredients —
          farm-fresh eggs, premium Belgian chocolate, and seasonal fruits — to create
          treats that not only look amazing but taste unforgettable.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Whether it’s a birthday, wedding, or just a craving for something sweet,
          we’re here to bring a little joy to your day with our cakes. Custom designs?
          No problem! We love turning your ideas into edible art.
        </p>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 text-md list-disc list-inside">
            <li>Over two decades of baking experience</li>
            <li>Handcrafted with love and attention to detail</li>
            <li>Only the highest quality, natural ingredients</li>
            <li>Custom cakes made to your vision</li>
            <li>Friendly, family-style service</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 italic">
            “Every cake has a story. Let us be part of yours.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
