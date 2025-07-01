import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { chartDays } from "../config/data";

// Register chart.js components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const currency = useSelector((store) => store.currency.currency);
  const [data, setData] = useState([]);
  const [days, setDays] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(HistoricalChart(id, days, currency));
        setData(response.data.prices);
      } catch (err) {
        console.error("Error fetching chart data:", err.message);
      }
    };
    fetchData();
  }, [days, currency, id]);

  return (
    <div className="w-[97vw] lg:w-[73vw] flex flex-col gap-6 pb-9 lg:pb-0 p-4 text-[#FAF0E6]">
      <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm">
        {chartDays.map((day) => (
          <button
            key={day.value}
            className={`h-[35px] w-[120px] sm:w-[130px] rounded-sm border border-white hover:bg-[#87CEEB] hover:text-black transition ${
              days === day.value
                ? "bg-[#87CEEB] text-black"
                : "text-white bg-transparent"
            }`}
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
      {data.length > 0 && (
        <Line
          data={{
            labels: data.map((coin) => {
              const date = new Date(coin[0]);
              const time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: data.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${
                  currency === "usd" ? "$" : "₹"
                }`,
                borderColor: "skyblue",
                tension: 0.2,
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: { color: "#87CEEB" },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#87CEEB",
                },
              },
              y: {
                ticks: {
                  color: "#87CEEB",
                },
              },
            },
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
