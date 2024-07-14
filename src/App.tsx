import React from 'react';
import './App.css';
// import GroceryTable from './GroceryTable';
import GroceryTable from './Components/GroceryTable';

const groceryItems = [
    { id: 1, name: 'Bananas', section: 'Produce', price: 1.29, weight: 0.5 },
    { id: 2, name: 'Apples', section: 'Produce', price: 2.49, weight: 1 },
    { id: 3, name: 'Milk', section: 'Dairy', price: 3.99, weight: 1 },
    { id: 4, name: 'Eggs', section: 'Dairy', price: 2.19, weight: 0.5 },
    { id: 5, name: 'Bread', section: 'Bakery', price: 2.99, weight: 0.5 },
    { id: 6, name: 'Chicken Breast', section: 'Meat', price: 7.99, weight: 0.5 },
    { id: 7, name: 'Tomatoes', section: 'Produce', price: 1.99, weight: 0.3 },
    { id: 8, name: 'Cheese', section: 'Dairy', price: 4.49, weight: 0.2 },
    { id: 9, name: 'Yogurt', section: 'Dairy', price: 0.99, weight: 0.5 },
    { id: 10, name: 'Cereal', section: 'Breakfast', price: 3.79, weight: 0.4 },
    { id: 11, name: 'Salmon', section: 'Seafood', price: 10.99, weight: 0.3 },
    { id: 12, name: 'Orange Juice', section: 'Beverages', price: 2.29, weight: 1 },
    { id: 13, name: 'Pasta', section: 'Pantry', price: 1.79, weight: 0.5 },
    { id: 14, name: 'Potatoes', section: 'Produce', price: 1.49, weight: 1 },
    { id: 15, name: 'Butter', section: 'Dairy', price: 2.99, weight: 0.2 },
    { id: 16, name: 'Ice Cream', section: 'Frozen', price: 4.99, weight: 0.5 },
    { id: 17, name: 'Ground Beef', section: 'Meat', price: 5.99, weight: 0.5 },
    { id: 18, name: 'Lettuce', section: 'Produce', price: 1.29, weight: 0.2 },
    { id: 19, name: 'Cucumber', section: 'Produce', price: 0.99, weight: 0.3 },
    { id: 20, name: 'Chocolate', section: 'Snacks', price: 2.79, weight: 0.2 },
    { id: 21, name: 'Rice', section: 'Pantry', price: 2.19, weight: 1 },
    { id: 22, name: 'Soda', section: 'Beverages', price: 1.49, weight: 2 },
    { id: 23, name: 'Shrimp', section: 'Seafood', price: 12.99, weight: 0.5 },
    { id: 24, name: 'Avocado', section: 'Produce', price: 1.99, weight: 0.2 },
    { id: 25, name: 'Peanut Butter', section: 'Pantry', price: 3.49, weight: 0.5 },
    { id: 26, name: 'Ground Turkey', section: 'Meat', price: 6.49, weight: 0.5 },
    { id: 27, name: 'Onions', section: 'Produce', price: 0.79, weight: 0.5 },
    { id: 28, name: 'Mayonnaise', section: 'Condiments', price: 2.99, weight: 0.5 },
    { id: 29, name: 'Bacon', section: 'Meat', price: 8.99, weight: 0.5 },
    { id: 30, name: 'Sausages', section: 'Meat', price: 4.99, weight: 0.5 },
    { id: 31, name: 'Spinach', section: 'Produce', price: 1.49, weight: 0.3 },
    { id: 32, name: 'Tuna', section: 'Canned Goods', price: 1.99, weight: 0.2 },
    { id: 33, name: 'Bagels', section: 'Bakery', price: 2.99, weight: 0.5 },
    { id: 34, name: 'Orange', section: 'Produce', price: 0.79, weight: 0.2 },
    { id: 35, name: 'Lemons', section: 'Produce', price: 1.29, weight: 0.3 },
    { id: 36, name: 'Honey', section: 'Condiments', price: 4.99, weight: 0.3 },
    { id: 37, name: 'Salad Dressing', section: 'Condiments', price: 2.49, weight: 0.3 },
    { id: 38, name: 'Crackers', section: 'Snacks', price: 1.99, weight: 0.5 },
    { id: 39, name: 'Tofu', section: 'Produce', price: 2.49, weight: 0.5 },
    { id: 40, name: 'Soy Milk', section: 'Dairy', price: 3.49, weight: 1 },
    { id: 41, name: 'Soup', section: 'Canned Goods', price: 2.99, weight: 0.5 },
    { id: 42, name: 'Chips', section: 'Snacks', price: 1.99, weight: 0.2 },
    { id: 43, name: 'Frozen Pizza', section: 'Frozen', price: 5.99, weight: 1 },
    { id: 44, name: 'Frozen Vegetables', section: 'Frozen', price: 2.99, weight: 1 },
    { id: 45, name: 'Coffee', section: 'Beverages', price: 5.99, weight: 0.5 },
    { id: 46, name: 'Tea', section: 'Beverages', price: 3.49, weight: 0.1 },
    { id: 47, name: 'Granola Bars', section: 'Snacks', price: 3.99, weight: 0.3 },
    { id: 48, name: 'Olives', section: 'Canned Goods', price: 2.29, weight: 0.2 },
    { id: 49, name: 'Cherries', section: 'Produce', price: 3.99, weight: 0.5 },
    { id: 50, name: 'Grapes', section: 'Produce', price: 4.99, weight: 0.5 },
    { id: 51, name: 'Cottage Cheese', section: 'Dairy', price: 2.79, weight: 0.5 },
    { id: 52, name: 'Salad Mix', section: 'Produce', price: 2.99, weight: 0.5 },
    { id: 53, name: 'Frozen Berries', section: 'Frozen', price: 6.99, weight: 0.5 },
    { id: 54, name: 'Canned Beans', section: 'Canned Goods', price: 1.29, weight: 0.5 },
    { id: 55, name: 'Coconut Water', section: 'Beverages', price: 2.99, weight: 1 },
    { id: 56, name: 'Trail Mix', section: 'Snacks', price: 4.49, weight: 0.3 },
];

function App() {
  return (
    <div className="App">
      <GroceryTable items={groceryItems} />
    </div>
  );
}

export default App;
