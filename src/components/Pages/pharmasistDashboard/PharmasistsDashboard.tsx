/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../privateRoute/AuthContext";
import toast from "react-hot-toast";

const getMonthName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PharmasistsDashboard = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<{
    name: string;
    sales: number;
  } | null>(null);

  const { user } = useAuth();
  const userId = user?._id;

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       const response = await axios.get(
  //         "https://pharma-door-frontend.vercel.app/api/v1/users",
  //         {
  //           headers: {
  //             Authorization: `${token}`,
  //           },
  //         }
  //       );
  //       const users = response.data?.data || [];
  //       setTotalUsers(users.length);
  //     } catch (error) {
  //       console.error("Failed to fetch users", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchOrderedMedicines = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Access Token does not exist in localStorage");
          return;
        }

        const res = await axios.get(
          "https://pharma-door-backend.vercel.app/api/v1/order/ordered-medicine",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const orders = res.data?.data || [];

        const pharmacistOrders = orders.filter((order: any) =>
          order.products?.some((p: any) => p.pharmacist === userId)
        );

        const sales = pharmacistOrders.reduce(
          (sum: number, order: any) => sum + order.totalPrice,
          0
        );
        const profit = pharmacistOrders.reduce(
          (sum: number, order: any) => sum + order.totalPrice * 0.2,
          0
        );

        setTotalSales(sales);
        setTotalProfit(profit);

        const monthlySalesMap: Record<string, number> = {};
        pharmacistOrders.forEach((order: any) => {
          const month = getMonthName(order.createdAt);
          if (!monthlySalesMap[month]) {
            monthlySalesMap[month] = 0;
          }
          monthlySalesMap[month] += order.totalPrice;
        });

        const chartDataArray = monthOrder.map((month) => ({
          name: month,
          sales: parseFloat((monthlySalesMap[month] || 0).toFixed(2)),
        }));

        setChartData(chartDataArray);
      } catch (err) {
        console.error("Error fetching ordered medicines:", err);
      }
    };

    if (userId) {
      fetchOrderedMedicines();
    }
  }, [userId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Welcome to Pharmacist Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalSales.toFixed(2)} TK
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Profit</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalProfit.toFixed(2)} TK
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-white via-slate-50 to-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
          Monthly Sales Performance
        </h2>

        {chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                onClick={(data: any) => {
                  if (data?.activeLabel && data?.activePayload?.length > 0) {
                    const clickedMonth = data.activeLabel;
                    const clickedSales = data.activePayload[0].payload.sales;
                    setSelectedMonth({
                      name: clickedMonth,
                      sales: clickedSales,
                    });
                  }
                }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
                  formatter={(value: any) => [`$${value}`, "Sales"]}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>

            {selectedMonth && (
              <p className="mt-4 text-center text-lg font-medium text-gray-700">
                🔎 <span className="font-semibold">{selectedMonth.name}</span>{" "}
                Sales:{" "}
                <span className="text-indigo-600 font-bold">
                  ${selectedMonth.sales}
                </span>
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No sales data available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PharmasistsDashboard;
