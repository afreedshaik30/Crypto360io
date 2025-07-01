import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Header from "./components/Header";

// import Modal from "./components/Modal";

// Lazy loading pages
const Home = lazy(() => import("./pages/HomePage"));
const Coin = lazy(() => import("./pages/CoinPage"));

function App() {
  // const [modal, setModal] = useState(false);

  // const openmodal = () => setModal(true);
  // const closemodal = () => setModal(false);

  return (
    <div className="w-screen h-screen bg-[#14161a]">
      <Header />
      <Suspense
        fallback={
          <div className="text-white text-center mt-10">Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </Suspense>
      {/* {modal && (
        <Modal openmodal={openmodal} closemodal={closemodal} modal={modal} />
      )} */}
    </div>
  );
}

export default App;
