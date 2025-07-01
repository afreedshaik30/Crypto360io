import banner from "../assets/banner2.jpg";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Table from "../components/Table";

const Homepage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to Crypto360
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 italic mb-6 max-w-xl">
            Track, trade & explore your favorite coins
          </p>

          {/* Carousel */}
          <div className="w-full max-w-6xl">
            <Carousel />
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="w-full px-4 sm:px-6 py-12 bg-[#14161a] text-white">
        <div className="w-full max-w-7xl mx-auto">
          <Table />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
