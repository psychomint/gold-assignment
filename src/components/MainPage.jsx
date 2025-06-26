// GoldDashboard.jsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const goldChart = [];
for (let i = 0; i < 20; i++) {
  goldChart.push({
    time: `17:${10 + i} PM`,
    price: 32.7 - Math.random() * 0.1,
  });
}

const dummyData = {
    goldPrices: [
      { karat: "24K", price: 32.712 },
      { karat: "22K", price: 29.995 },
      { karat: "21K", price: 28.636 },
      { karat: "20K", price: 24.561 },
      { karat: "19K", price: 24.561 },
      { karat: "18K", price: 24.561 },
    ],
    silverPrice: 397.7,
    ouncePrice: 3317.786,
    ounceChange: -0.46,
    ounceDelta: -15.49,
    goldChart: goldChart,
};

const MainPage = () => {
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    setData(dummyData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s === 1 ? 10 : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="bg-[#0d1117] text-white min-h-screen px-4 py-8 md:px-10">
      <div className="text-lg md:text-xl font-semibold mb-8 text-center leading-snug">
        Prices will be updated in <span className="text-yellow-400">{seconds}</span> seconds.
        Last updated: <span className="text-yellow-400">19:56:09</span>
      </div>

      {/* Gold Price & Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gold Card */}
        <div className="bg-[#161b22] border border-yellow-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-yellow-400">GOLD</span>
            <span className="text-sm text-gray-400">(US$ / OZ)</span>
          </h2>
          <div className="text-4xl md:text-5xl font-bold">
            {data.ouncePrice.toLocaleString()}
            <span className="text-red-400 text-base ml-3">
              {data.ounceChange}% ({data.ounceDelta})
            </span>
          </div>
        </div>

        {/* Gold Bar Chart */}
        <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Gold Chart</h2>
          <p className="text-sm text-gray-400 mb-4">
            Price of 24K gold (per gram) in KD
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.goldChart}>
              <XAxis
                dataKey="time"
                stroke="#ccc"
                fontSize={12}
                tickMargin={10}
              />
              <YAxis stroke="#ccc" fontSize={12} domain={[24.3, 32.9]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="price" fill="#facc15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gold */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.goldPrices.map((g) => (
          <div
            key={g.karat}
            className="bg-[#161b22] p-4 rounded-xl text-center border border-slate-700 shadow-md"
          >
            <div className="text-yellow-400 font-semibold text-lg">
              {g.karat}
            </div>
            <div className="text-2xl font-medium mt-1">
              {g.price.toFixed(3)} KD
            </div>
            <div className="text-red-400 text-sm mt-2">▼</div>
          </div>
        ))}
      </div>

      {/* Silver */}
      <div className="mt-10">
        <div className="bg-[#161b22] border border-yellow-500 p-6 rounded-2xl text-center max-w-md mx-auto shadow-lg">
          <div className="text-yellow-400 font-semibold text-lg mb-1">
            Silver (per Kilo)
          </div>
          <div className="text-3xl font-bold">{data.silverPrice} KD</div>
          <div className="text-red-400 text-sm mt-1">▼</div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
