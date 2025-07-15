import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./hero.css";
import { AppContext } from '../App';
import HeroSwiper from './HeroSwiper';

function Hero() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, selectedItem ,setSelectedItem} = useContext(AppContext);
  const [filteredItems, setFilteredItems] = useState(items);

  // Handle filter from URL query
  const query = new URLSearchParams(location.search);
  const genderFilter = query.get('filter');
  const scrollTarget = query.get("scroll");

  useEffect(() => {
    if (scrollTarget) {
      const section = document.getElementById(scrollTarget);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay to allow Hero page to render
      }
    }
  }, [location.search]);
  

  useEffect(() => {
    if (genderFilter) {
      const result = items.filter(item => item.gender.toLowerCase() === genderFilter.toLowerCase());
      setFilteredItems(result);
    } else {
      setFilteredItems(items);
    }
  }, [genderFilter, items]);

  const handleShopNow = () => {
    navigate('/product');
  };

  const activeItem = selectedItem || filteredItems[0] || items[0];
  const bgImg = process.env.PUBLIC_URL + (activeItem?.bgImg || '');

  const womenItems = items.filter(item => item.gender.toLowerCase() === 'women');
  const menItems = items.filter(item => item.gender.toLowerCase() === 'men');

  return (
    <div>
      <div id="home" className="banner" style={{ background: `url(${bgImg}) center center / cover no-repeat` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-subtitle">{activeItem?.subtitle}</p>
            <h1 className="hero-title">{activeItem?.title}</h1>
            <a onClick={handleShopNow} className="mainButton">
              SHOP NOW <i className="bi bi-cart2"></i>
            </a>
            <a href="#" className="markButton">
              <i className="bi bi-bookmark-plus-fill"></i>
            </a>
          </div>
          <div className="hero-right">
            <div className="side-row">
              <span className="side-title">SPRING & SUMMER COLLECTIONS</span>
              <span className="side-number">0{activeItem?._id}</span>
              <div className="side-line"></div>
            </div>
            <div className="hero-center">
              <HeroSwiper slides={filteredItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Women Section */}
      <section className="product-section">
        <h2 id="women-section" className="section-title">WOMEN</h2>
        <div className="products-grid">
          {womenItems.map(item => (
            <div key={item._id} className="product-card">
              <img onClick= { () => {
                setSelectedItem(item);
                navigate("/product");

              }} src={process.env.PUBLIC_URL + item.bgImg} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section> 

      {/*Men Section*/}
      <section className="product-section">
        <h2 id="men-section" className="section-title">MEN</h2>
        <div className="products-grid">
          {menItems.map(item => (
            <div key={item._id} className="product-card">
              <img onClick={()=>{
               setSelectedItem(item);
                navigate("/product");
              }} 
              src={process.env.PUBLIC_URL + item.bgImg} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;
