import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";

const CoinLeftBar = () => {
  const [coin, setcoin] = useState();
  const currency = useSelector((store) => store.currency.currency);
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(SingleCoin(id));
        setcoin(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchdata();
  }, [id]);

  return (
    <div className="w-[100vw] lg:w-[25vw] h-screen flex flex-col text-[#FAF0E6] p-3">
      <div className="w-full flex flex-col items-center">
        <img
          className="p-2 pb-0 w-[180px] h-[180px]"
          src={coin?.image.large}
          alt=""
        />
        <h3 className="p-2 pb-0 text-5xl font-bold">{coin?.name}</h3>
      </div>
      <div className="w-full flex flex-col items-start">
        <h6 className="p-2 pb-0 text-sm">
          {coin?.description?.en
            ? ReactHtmlParser(coin.description.en.split(". ")[0])
            : "No description available."}
        </h6>

        <h5 className="p-2 pb-0 text-lg flex justify-start">
          Rank: {coin?.market_cap_rank}
        </h5>
        <h5 className="p-2 pb-0 text-lg flex justify-start">
          Current Price: {currency === "usd" ? "$" : "₹"}{" "}
          {coin?.market_data.current_price[currency].toLocaleString()}
        </h5>
        <h5 className="p-2  text-lg flex justify-start">
          Market Cap: {currency === "usd" ? "$" : "₹"}{" "}
          {Number(
            (coin?.market_data.market_cap[currency] / 1000000).toFixed(0)
          ).toLocaleString()}{" "}
          M
        </h5>
      </div>
    </div>
  );
};
export default CoinLeftBar;
