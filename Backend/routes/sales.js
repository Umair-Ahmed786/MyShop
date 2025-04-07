const express = require('express');
const router = express.Router();
const Item = require('../models/Items');
const Sale = require('../models/Sales');

router.post('/itemsold/:id', async (req, res) => {
    
    const {ItemQuantity} = req.body;
    const itemId = req.params.id;

    console.log('Quantity: ', ItemQuantity, ' Id: ',itemId)
    try {
      // Find the item and update its availableQuantity
      const item = await Item.findById(itemId);
      if (!item) return res.status(404).json({ message: 'Item not found' });
  
      if (item.availableQuantity < ItemQuantity) {
        return res.status(400).json({ message: `Not enough stock available, Remaining Items are ${item.availableQuantity}` });
      }
  
      item.availableQuantity -= ItemQuantity;
      await item.save();
  
      // Record the sale
      const sale = new Sale({
        itemId,
        itemName: item.name,
        // sellingPrice: item.sellingPrice,
        quantitySold: ItemQuantity,
        totalPrice: ItemQuantity * item.sellingPrice,
        profit: ItemQuantity * (item.sellingPrice - item.costPrice),
        date: new Date(),
      });
      await sale.save();
  
      res.status(201).json({sale, price: item.sellingPrice});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// 2 Get sales for today
router.get('/today', async (req, res) => {
    const { day, month, year } = req.query; 

    console.log('inside todays get: ',day, month, year)
    if (!day || !month || !year) {
      return res.status(400).json({ error: 'Please provide day, month, and year.' });
    }
  
    try {
      // Convert the day, month, and year into numbers
      const dayInt = parseInt(day);
      const monthInt = parseInt(month);
      const yearInt = parseInt(year);
  
     // Create start and end of the day in UTC
     const startOfDay = new Date(Date.UTC(yearInt, monthInt - 1, dayInt, 0, 0, 0));
     const endOfDay = new Date(Date.UTC(yearInt, monthInt - 1, dayInt, 23, 59, 59, 999));

     // Debug: Print the start and end of the day
     console.log('Start of Day:', startOfDay);
     console.log('End of Day:', endOfDay);

     // MongoDB query to match sales within the specific day range
     const sales = await Sale.find({
         date: {
             $gte: startOfDay, // Greater than or equal to start of the day
             $lt: endOfDay,    // Less than the end of the day
         },
     });

    
      // Check if sales are found
      if (sales.length === 0) {
        return res.status(404).json({ success: false, message: 'No sales found for the specified date.' });
    }
  
      res.status(200).json({ success: true, sales });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });


// 3 Get sales for a specific month
// router.get('/month', async (req, res) => {
//     const { month, year } = req.query;
  
//     console.log('inside month is: ',month )
//     if (!month || !year) {
//       return res.status(400).json({ error: 'Please provide month and year.' });
//     }
  
//     try {
//       const monthInt = parseInt(month);
//       const yearInt = parseInt(year);
  
//       // MongoDB query to match month and year
//       const sales = await Sale.find({
//         $expr: {
//           $and: [
//             { $eq: [{ $month: '$date' }, monthInt] }, // Match month
//             { $eq: [{ $year: '$date' }, yearInt] },   // Match year
//           ],
//         },
//       });
  
//       res.status(200).json({ success: true, sales });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });
router.get('/month', async (req, res) => {
  const { month, year } = req.query;

  console.log('Inside month get:', month, year);

  // Validate the month and year
  if (!month || !year) {
      return res.status(400).json({ error: 'Please provide both month and year.' });
  }

  try {
      // Convert month and year into numbers
      const monthInt = parseInt(month);
      const yearInt = parseInt(year);

      // Validate the month and year range
      if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
          return res.status(400).json({ error: 'Month must be between 1 and 12.' });
      }
      if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
          return res.status(400).json({ error: 'Year must be a valid 4-digit number.' });
      }

      // Create the start and end of the month in UTC
      const startOfMonth = new Date(Date.UTC(yearInt, monthInt - 1, 1, 0, 0, 0));
      const endOfMonth = new Date(Date.UTC(yearInt, monthInt, 0, 23, 59, 59, 999));

      // Debug: Print the start and end of the month
      console.log('Start of Month:', startOfMonth);
      console.log('End of Month:', endOfMonth);

      // MongoDB query to match sales within the specific month and year range
      const sales = await Sale.find({
          date: {
              $gte: startOfMonth, // Greater than or equal to the start of the month
              $lt: endOfMonth,    // Less than the end of the month
          },
      });

      // Check if sales are found
      if (sales.length === 0) {
          return res.status(404).json({ success: false, message: `No sales found for ${month}/${year}.` });
      }

      res.status(200).json({ success: true, sales });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

  
  module.exports = router;