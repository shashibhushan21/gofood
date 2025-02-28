const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
  try {
    const foodItems = global.food_items;
    const foodCategory = global.food_category;
    // console.log(foodItems);
    if (!foodItems || !foodCategory) {
      return res.status(404).json({ message: "Food items not found" });
    }
    res.json({
        foodItems: foodItems,
        foodCategory: foodCategory
      });
  } catch (error) {
    console.error('Error fetching food data:', error);
    res.status(500).json({ message: "An error occurred while fetching food data" });
  }
});

module.exports = router;