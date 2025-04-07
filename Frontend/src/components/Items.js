
import React, { useEffect, useContext, useState } from "react";
import { ItemsContext } from "../context/Items/ItemsContext";
// import Button from 'react-bootstrap/Button';

const Items = () => {
  const { items, loading, fetchItems, addItem, updateItem, deleteItem } = useContext(ItemsContext);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    availableQuantity: "",
    sellingPrice: "",
    costPrice: "",
    lowStockAlert: ""
  });

  const [EditingItem, setEditingItem] = useState(null);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ShowEditingModal, setShowEditingModal] = useState(false);
  const [DeletingItem, setDeletingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addItem(formData);
    setFormData({
      name: "",
      quantity: "",
      availableQuantity: "",
      sellingPrice: "",
      costPrice: "",
      lowStockAlert: ""
    });
  };

  // Handle edit form submit
  const handleUpdateItem = async (event) => {
    event.preventDefault();
    await updateItem(EditingItem._id, EditingItem);
    setShowEditingModal(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {


    setShowEditingModal(true);
    setEditingItem(item);
  };

  const handleDelete = () => {
    deleteItem(DeletingItem._id);
    setShowDeleteModal(false)
  };

  const handleModal = (item) => {

    setDeletingItem(item);
    setShowDeleteModal(true);

  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
        padding: "20px",
        maxWidth: "90%",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Available Stock(Items) List
      </h2>

      {/* Add/Update Item Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div className="mt-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mt-3">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label>Available Quantity:</label>
          <input
            type="number"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            // required
            style={inputStyle}
          />
        </div>
        <div className="mt-3">
          <label>Selling Price (RS):</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mt-3">
          <label>Cost Price (RS):</label>
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mt-3">
          <label>Low Stock Alert:</label>
          <input
            type="number"
            name="lowStockAlert"
            value={formData.lowStockAlert}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Item
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: "center", color: "#555" }}>Loading items...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007BFF", color: "#fff" }}>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Quantity</th>
              <th style={headerStyle}>Available Quantity</th>
              <th style={headerStyle}>Selling Price (RS)</th>
              <th style={headerStyle}>Cost Price (RS)</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                style={{
                  // backgroundColor: "#fff",
                  backgroundColor: "#fff",
                  color: item.availableQuantity <= item.lowStockAlert ? "red" : "",
                  fontSize: item.availableQuantity <= item.lowStockAlert ? "1.5rem" : "",
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => {e.currentTarget.style.backgroundColor = "#f1f1f1"}}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              >
                <td style={cellStyle}>{item.name}</td>
                <td style={cellStyle}>{item.quantity}</td>
                <td style={cellStyle}>{item.availableQuantity}</td>
                <td style={cellStyle}>{item.sellingPrice}</td>
                <td style={cellStyle}>{item.costPrice}</td>
                <td style={cellStyle}>
                  <button className='btn btn-sm btn-outline-primary' style={{ marginRight: '0.4rem' }}
                    // onClick={() => handleEdit(item)}
                    onClick={(e) => { setShowEditingModal(true); setEditingItem(item); }}

                  >Edit</button>
                  <button className='btn btn-sm btn-outline-danger btn-md' onClick={() => handleModal(item)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Delete Confirmation */}
      {ShowDeleteModal && (
        <div
          style={modalOverlayStyle}
        >
          <div
            style={modalStyle}
          >
            <h3>Are you sure you want to delete item? <b style={{ color: 'red' }}>{DeletingItem.name}</b> </h3>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button onClick={handleDelete}
                className="btn btn-md btn-danger"

              // style={modalButtonStyle}
              >
                Yes, Delete
              </button>
              <button className="btn btn-md btn-primary"
                onClick={() => { setShowDeleteModal(false); setDeletingItem(null) }}

              // style={modalButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {ShowEditingModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Edit Item</h3>
            <form onSubmit={handleUpdateItem} style={formStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Field</th>
                    <th style={thStyle}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>Name</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={EditingItem.name}
                        onChange={(e) => setEditingItem({ ...EditingItem, name: e.target.value })}
                        placeholder="Name"
                        required
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Quantity</td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={EditingItem.quantity}
                        onChange={(e) => setEditingItem({ ...EditingItem, quantity: e.target.value })}
                        placeholder="Original Quantity"
                        required
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Available Quantity</td>
                    <td>
                      <input
                        type="number"
                        name="availableQuantity"
                        value={EditingItem.availableQuantity}
                        onChange={(e) => setEditingItem({ ...EditingItem, availableQuantity: e.target.value })}
                        placeholder="Available Quantity"
                        required
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Selling Price (RS)</td>
                    <td>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={EditingItem.sellingPrice}
                        onChange={(e) => setEditingItem({ ...EditingItem, sellingPrice: e.target.value })}
                        placeholder="Selling Price"
                        required
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={tdStyle}>Low Stock Alert</td>
                    <td>
                      <input
                        type="number"
                        name="costPrice"
                        value={EditingItem.costPrice}
                        onChange={(e) => setEditingItem({ ...EditingItem, costPrice: e.target.value })}
                        placeholder="Cost Price"
                        required
                        style={inputStyle}
                      />
                    </td>
                    </tr>
                    <tr>
                    <td style={tdStyle}>Cost Price (RS)</td>
                    <td>
                      <input
                        type="number"
                        name="lowStockAlert"
                        value={EditingItem.lowStockAlert}
                        onChange={(e) => setEditingItem({ ...EditingItem, lowStockAlert: e.target.value })}
                        placeholder="LowStockAlert"
                        required
                        style={inputStyle}
                      />
                    </td>
                    </tr>
                  
                </tbody>
              </table>
              <div style={buttonContainerStyle}>
                <button type="submit" className="btn btn-success btn-md" >Update</button>
                <button onClick={() => setShowEditingModal(false)} className="btn btn-primary btn-md" >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};



// Styles for the modal and buttons
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "25%",
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

const inputStyle = {
  padding: "8px",
  margin: "5px",
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px",
};


//for updating modal
const modalTitleStyle = {
  textAlign: "center",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#007BFF",
  marginBottom: "15px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const thStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  fontSize: "16px",
};



const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};




export default Items;

