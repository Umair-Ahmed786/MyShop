import React, { useState, useContext, useEffect } from 'react';
import { SalesContext } from '../context/sales/SalesContext';

const MonthlySales = () => {
  const { monthlysales, fetchMonthSales } = useContext(SalesContext);
  const [filterDate, setFilterDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchMonthSales(filterDate.month, filterDate.year);
  },[]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilterDate((prevDate) => ({ ...prevDate, [name]: value }));
  };

  const handleFetchSales = () => {
    fetchMonthSales(filterDate.month, filterDate.year);
  };

  return (
    <div className="container mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center mt-5 mb-4">Monthly Sales</h2>

      {/* Date Filter Section */}
      <div className="gap-4 mb-4 row" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col col-lg-4 col-md-4 col-sm-12 text-center">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Month:
          </label>
          <input
            type="number"
            id="month"
            name="month"
            value={filterDate.month}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-lg mx-2"
          />
        </div>
        <div className="col col-lg-4 col-md-4 col-sm-12 text-center">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year:
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={filterDate.year}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-lg mx-2"
          />
        </div>
        <button
          onClick={handleFetchSales}
          className="btn btn-outline-primary btn-md"
        >
          Fetch Sales
        </button>
      </div>

      {/* Sales Table Section */}
      <div>
        {monthlysales.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              tableLayout: "fixed"
            }}
          >
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#007BFF" }}>
              <tr style={{ backgroundColor: "#007BFF", color: "#fff" }}>
                <th style={headerStyle}>Item Name</th>
                <th style={headerStyle}>Quantity Sold</th>
                <th style={headerStyle}>Price</th>
                <th style={headerStyle}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {monthlysales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-b"
                  style={{
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #ddd",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  <td style={cellStyle}>{sale.itemName}</td>
                  <td style={cellStyle}>{sale.quantitySold}</td>
                  <td style={cellStyle}>{sale.totalPrice / sale.quantitySold}</td>
                  <td style={cellStyle}>{sale.totalPrice}</td>
                </tr>
              ))}

               {/* Grand Profit row */}
               <tr>
                  <td colSpan="3" style={{ ...cellStyle, textAlign: "Center", fontWeight: "bold", backgroundColor: "#007BFF", color: "#fff" }}>
                    Grand Profit
                  </td>
                  <td style={{ ...cellStyle, fontWeight: "bold", color: "#28a745" }}>
                    {monthlysales.reduce((acc, sale) => acc + sale.profit, 0).toFixed(2)}
                  </td>
                </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No sales found for this month.</p>
        )}
      </div>
    </div>
  );
};

const headerStyle = {
  padding: "10px",
  textAlign: "center",
  fontWeight: "bold",
  border: "1px solid #ddd",
};

const cellStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ddd",
};

export default MonthlySales;