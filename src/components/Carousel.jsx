import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Carousel = () => {
  const currency = useSelector((store) => store.currency.currency);
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TrendingCoins(currency));
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching trending coins:", error.message);
      }
    };
    fetchData();
  }, [currency]);

  const getPriceClass = (value) =>
    Number(value) < 0 ? "text-red-500 text-xs" : "text-green-500 text-xs";

  const items = coins.map((coin) => (
    <div
      key={coin.id}
      onClick={() => navigate(`/coins/${coin.id}`)}
      className="flex flex-col justify-center items-center cursor-pointer px-2"
    >
      <img
        src={coin.image}
        alt={coin.name}
        className="h-16 sm:h-20 object-contain mb-2"
      />
      <p className="text-sm font-medium">{coin.name}</p>
      <p className="text-sm">
        {currency === "usd" ? "$" : "₹"} {coin.current_price.toLocaleString()}
      </p>
      <span
        className={getPriceClass(coin.price_change_percentage_24h_in_currency)}
      >
        {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
      </span>
    </div>
  ));

  return (
    <div className="mt-6">
      <AliceCarousel
        autoPlay
        infinite
        autoPlayInterval={1800}
        disableButtonsControls
        disableDotsControls
        responsive={{
          0: { items: 2 },
          476: { items: 3 },
          768: { items: 4 },
          1024: { items: 6 },
        }}
        mouseTracking
        items={items}
      />
    </div>
  );
};

export default Carousel;
