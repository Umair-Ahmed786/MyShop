const express = require('express');
const router = express.Router();
const Item = require('../models/Items');

// Add a new item
router.post('/add', async (req, res) => {
  const { name, costPrice, sellingPrice, quantity, lowStockAlert } = req.body;

  try {
    const newItem = new Item({
      name,
      costPrice,
      sellingPrice,
      quantity,
      availableQuantity: quantity,
      lowStockAlert,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all items with stock details
router.get('/', async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 
// DELETE Item by ID
  router.delete('/item/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByIdAndDelete(itemId);
      console.log('In the delete Items: ',itemId)
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });  

 
// PUT Update Item by ID
router.put('/item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    console.log('In the Update Items: ',itemId)


    const item = await Item.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
  

module.exports = router;
