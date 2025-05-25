import React, { useContext, useState } from "react";
import OrderContext from "../contexts/OrderProvider";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Input,
  Sheet,
  Card,
  CardContent,
  Select,
  Option,
} from "@mui/joy";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getTopSalesByDateRange = (orders, startDate, endDate) => {
  const salesMap = new Map();
  const start = new Date(startDate);
  const end = new Date(endDate);

  orders.forEach((order) => {
    const orderDate = new Date(order.createdDate);
    if (orderDate >= start && orderDate <= end) {
      order.orderItems.forEach((item) => {
        const key = item.cakeId;
        if (!salesMap.has(key)) {
          salesMap.set(key, {
            cakeId: item.cakeId,
            cakeName: item.cakeName,
            cakeImage: item.cakeImage,
            cakePrice: item.cakePrice,
            totalQuantity: 0,
          });
        }
        const current = salesMap.get(key);
        current.totalQuantity += item.quantity;
      });
    }
  });

  return Array.from(salesMap.values()).sort(
    (a, b) => b.totalQuantity - a.totalQuantity
  );
};

const TopSale = () => {
  const { orders } = useContext(OrderContext);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [topCount, setTopCount] = useState(10); 

  const topSales = getTopSalesByDateRange(orders, startDate, endDate);
  const chartData = topSales.slice(0, topCount).map((cake) => ({
    name: cake.cakeName,
    quantity: cake.totalQuantity,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        📊 Top Selling Cakes
      </Typography>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "lg",
          p: 2,
          mb: 4,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography level="body-md" sx={{ mb: 0.5 }}>
            Start Date:
          </Typography>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            size="sm"
          />
        </Box>

        <Box>
          <Typography level="body-md" sx={{ mb: 0.5 }}>
            End Date:
          </Typography>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            size="sm"
          />
        </Box>

        <Box>
          <Typography level="body-md" sx={{ mb: 0.5 }}>
            Show Top:
          </Typography>
          <Select
            value={topCount}
            onChange={(e, newVal) => setTopCount(newVal)}
            size="sm"
          >
            {[3, 5, 10, 15, 20].map((n) => (
              <Option key={n} value={n}>
                Top {n}
              </Option>
            ))}
          </Select>
        </Box>
      </Sheet>

      {topSales.length === 0 ? (
        <Typography>No sales in this date range.</Typography>
      ) : (
        <>
          {/* Chart */}
          <Sheet
            variant="soft"
            sx={{ p: 2, mb: 4, borderRadius: "lg", height: 300 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Sheet>

          {/* List */}
          <Box sx={{ display: "grid", gap: 2 }}>
            {topSales.slice(0, topCount).map((cake, index) => (
              <Card key={cake.cakeId} orientation="horizontal">
                <img
                  src={cake.cakeImage}
                  alt={cake.cakeName}
                  width="120"
                  height="auto"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "1rem",
                  }}
                />
                <CardContent>
                  <Typography level="title-md">
                    {index + 1}. {cake.cakeName}
                  </Typography>
                  <Typography level="body-sm" sx={{ mt: 0.5 }}>
                    Quantity Sold: <strong>{cake.totalQuantity}</strong>
                  </Typography>
                  <Typography level="body-sm" sx={{ mt: 0.5 }}>
                    Price: ${cake.cakePrice.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TopSale;
