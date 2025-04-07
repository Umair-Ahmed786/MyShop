import React, { useState, useContext, useEffect, useRef } from "react";
import { SalesContext } from "../context/sales/SalesContext";
import { ItemsContext } from "../context/Items/ItemsContext";
import html2canvas from "html2canvas";

const Sales = () => {
  const { sales, addSale, fetchTodaySales } = useContext(SalesContext);
  const { items, fetchItems } = useContext(ItemsContext);

  const tableRef = useRef(null);

  const [itemId, setItemId] = useState("");
  const [ItemQuantity, setItemQuantity] = useState("");
  const [filterDate, setFilterDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchItems();
    fetchTodaySales(filterDate.day, filterDate.month, filterDate.year);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemId && ItemQuantity) {
      await addSale(itemId, ItemQuantity);
      setItemId("");
      setItemQuantity("");
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilterDate((prevDate) => ({ ...prevDate, [name]: value }));
  };

  const handleFetchSales = () => {
    fetchTodaySales(filterDate.day, filterDate.month, filterDate.year);
  };

  //for saving sales of the day as an Image
  // Save as Image
  const saveAsImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `sales_${filterDate.day}-${filterDate.month}-${filterDate.year}.png`;
    link.click();
  };

  return (
    <div className="container mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center mt-5 mb-4">Sales Management</h2>

      {/* Sale Recording Form */}
      <form onSubmit={handleSubmit} className="space-y-4 row" style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
        padding: "20px",
        maxWidth: "90%",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>

        <div className='col col-lg-4 col-md-4 col-sm-12 text-center' style={{ display: 'inline' }}>
          <label htmlFor="item" className="block text-sm font-medium text-gray-700 mx-2">
            Item:
          </label>
          <select
            id="item"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className='col col-lg-4 col-md-4 col-sm-12 text-center' style={{ display: 'inline' }}>
          <label htmlFor="ItemQuantity" className="block text-sm font-medium text-gray-700 mx-1">
            Quantity:
          </label>
          <input
            type="number"
            id="ItemQuantity"
            value={ItemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            min="1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="col col-lg-4 col-md-4 col-sm-12 text-center" style={{ display: 'inline' }}>
          <button
            type="submit"
            className="btn btn-outline-primary text-center"
          >
            Record Sale
          </button>
        </div>
      </form>


      {/* Today's Sales Section */}
      <div className="mt-5" style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
        padding: "20px",
        maxWidth: "90%",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
        <h2 className="text-2xl font-bold mb-4 text-center">Today's Sales</h2>
        <div className="gap-4 mb-4 row" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="col col-lg-4 col-md-3 col-sm-12 text-center">
            <label htmlFor="day" className="block text-sm font-medium text-gray-700" style={{ display: 'block' }}>
              Day
            </label>
            <input
              type="number"
              id="day"
              name="day"
              value={filterDate.day}
              onChange={handleDateChange}
              className="w-full p-2 border rounded-lg mx-2"
            />
          </div>
          <div className="col col-lg-3 col-md-3 col-sm-12 text-center">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
              Month
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
          <div className="col col-lg-3 col-md-3 col-sm-12 text-center">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
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

        <div ref={tableRef} className="mt-5 p-4 bg-white rounded-lg shadow-md">

          {sales.length > 0 ? (
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
                  <th style={headerStyle}>Quantity</th>
                  <th style={headerStyle}>Price</th>
                  <th style={headerStyle}>Total Price</th>
                  <th style={headerStyle}>Profit</th>
                  {/* <th style={headerStyle}>Selling Price (RS)</th>
             <th style={headerStyle}>Cost Price (RS)</th> */}
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id} className="border-b" style={{
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #ddd",
                    transition: "background-color 0.3s",
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}>

                    {/* <td className="p-4">{sale.itemName}</td>
                  <td className="p-4">{sale.quantitySold}</td>
                  <td className="p-4">${sale.totalPrice}</td> */}


                    <td style={cellStyle}>{sale.itemName}</td>
                    <td style={cellStyle}>{sale.quantitySold}</td>
                    <td style={cellStyle}>{sale.totalPrice / sale.quantitySold}</td>
                    <td style={cellStyle}>{sale.totalPrice}</td>
                    <td style={cellStyle}>{sale.profit}</td>


                  </tr>

                ))}
                {/* Calculate Grand Profit */}

                {/* Grand Profit row */}
                <tr>
                  <td colSpan="4" style={{ ...cellStyle, textAlign: "Center", fontWeight: "bold", backgroundColor: "#007BFF", color: "#fff" }}>
                    Grand Profit
                  </td>
                  <td style={{ ...cellStyle, fontWeight: "bold", color: "#28a745" }}>
                    {sales.reduce((acc, sale) => acc + sale.profit, 0).toFixed(2)}
                  </td>
                </tr>

              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No sales found for today.</p>
          )}
        </div>
        {/* Save Buttons */}
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button onClick={saveAsImage} className="btn btn-danger">Save as Image</button>
          {/* <button onClick={saveAsPDF} className="btn btn-outline-danger">Save as PDF</button> */}
        </div>


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


export default Sales;
