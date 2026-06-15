import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, createContext } from 'react';

import './components/Header';
import itemsData from './api/itemsData.json'; 
import Header from './components/Header';
import Hero from './components/Hero';
import ProductDetails from './components/ProductDetails';
import ShoppingBag from './components/ShoppingBag';
import { ShoppingBagProvider } from './components/ShoppingBagContext';


export const AppContext = createContext();


function App() {
  
  const [items, setItems] = useState(itemsData.items);
  
  const [selectedItem, setSelectedItem] = useState(null);

  
//routing for the app

  return (
   
    <AppContext.Provider value={{ items, setItems, selectedItem, setSelectedItem }}>
      <ShoppingBagProvider>

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/bag" element={<ShoppingBag />} />

      </Routes>
    </Router>
    </ShoppingBagProvider>
  </AppContext.Provider>
   
  
  );
}

export default App;

