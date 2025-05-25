import React, { useContext, useState } from 'react';
import OrderContext  from '../contexts/OrderProvider';
import dayjs from 'dayjs';

const getTopSalesByDateRange = (orders, startDate, endDate) => {
  const salesMap = new Map();
  const start = new Date(startDate);
  const end = new Date(endDate);

  orders.forEach(order => {
    const orderDate = new Date(order.createdDate);
    if (orderDate >= start && orderDate <= end) {
      order.orderItems.forEach(item => {
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

  return Array.from(salesMap.values()).sort((a, b) => b.totalQuantity - a.totalQuantity);
};

const TopSale = () => {
  const { orders } = useContext(OrderContext);
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));

  const topSales = getTopSalesByDateRange(orders, startDate, endDate);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Top Selling Cakes</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ marginLeft: '1rem' }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {topSales.length === 0 ? (
        <p>No sales in this date range.</p>
      ) : (
        <ul>
          {topSales.slice(0, 10).map((cake, index) => (
            <li key={cake.cakeId} style={{ marginBottom: '1rem' }}>
              <strong>{index + 1}. {cake.cakeName}</strong> -
              <span> Quantity Sold: {cake.totalQuantity}</span><br />
              <img src={cake.cakeImage} alt={cake.cakeName} style={{ width: '100px', height: 'auto', marginTop: '0.5rem' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopSale;
