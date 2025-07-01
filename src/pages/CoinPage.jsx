import CoinLeftBar from "../components/CoinLeftBar";
import Chart from "../components/Chart";
const CoinPage = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-screen h-120">
        <CoinLeftBar />
        <Chart />
      </div>
    </>
  );
};

export default CoinPage;
