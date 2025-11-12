import React, { useState } from "react";
import "./css/category.css";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaThLarge, FaLaptop, FaTshirt, FaHome, FaFootballBall, FaBlender } from "react-icons/fa";

const categories = [
  { name: "Todas", icon: <FaThLarge />, className: "todas" },
  { name: "Tecnología", icon: <FaLaptop />, className: "tecnologia" },
  { name: "Moda", icon: <FaTshirt />, className: "moda" },
  { name: "Hogar", icon: <FaHome />, className: "hogar" },
  { name: "Deportes", icon: <FaFootballBall />, className: "deportes" },
  { name: "Electrodomésticos", icon: <FaBlender />, className: "electrodomesticos" },
];



const allProducts = {
    Todas: [
        {
            id: 1,
            name: "Laptop Gaming RTX 4060",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 2800000,
            oldPrice: 3200000,
            discount: "-12%",
            rating: 4.8,
            reviews: 156,
        },
        {
            id: 2,
            name: "iPhone 15 Pro Max 256GB",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 5200000,
            oldPrice: 5800000,
            discount: "-10%",
            rating: 4.9,
            reviews: 243,
        },
        {
            id: 3,
            name: "Chaqueta de Cuero azul y negra",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 320000,
            oldPrice: 450000,
            discount: "-29%",
            rating: 4.5,
            reviews: 89,
        },
        {
            id: 4,
            name: "Mesa de Centro Moderna",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 580000,
            oldPrice: 780000,
            discount: "-26%",
            rating: 4.6,
            reviews: 67,
        },
    ],
    Tecnología: [
        {
            id: 5,
            name: "Smartwatch Pro",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 900000,
            oldPrice: 1200000,
            discount: "-25%",
            rating: 4.4,
            reviews: 110,
        },
        {
            id: 6,
            name: "Audífonos Bluetooth",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 150000,
            oldPrice: 200000,
            discount: "-25%",
            rating: 4.7,
            reviews: 98,
        },
    ],
    Moda: [
        {
            id: 7,
            name: "Camisa Casual Hombre",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 75000,
            oldPrice: 100000,
            discount: "-25%",
            rating: 4.3,
            reviews: 64,
        },
        {
            id: 8,
            name: "Vestido de Verano",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 120000,
            oldPrice: 180000,
            discount: "-33%",
            rating: 4.5,
            reviews: 87,
        },
    ],
    Hogar: [
        {
            id: 9,
            name: "Sofá Moderno",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 1800000,
            oldPrice: 2500000,
            discount: "-28%",
            rating: 4.6,
            reviews: 142,
        },
        {
            id: 10,
            name: "Lámpara Decorativa",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 130000,
            oldPrice: 200000,
            discount: "-35%",
            rating: 4.4,
            reviews: 55,
        },
    ],
    Deportes: [
        {
            id: 11,
            name: "Bicicleta de Montaña",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 1500000,
            oldPrice: 2000000,
            discount: "-25%",
            rating: 4.7,
            reviews: 76,
        },
        {
            id: 12,
            name: "Balón de Fútbol",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 70000,
            oldPrice: 100000,
            discount: "-30%",
            rating: 4.8,
            reviews: 130,
        },
    ],
    Electrodomésticos: [
        {
            id: 13,
            name: "Refrigerador No Frost",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 2200000,
            oldPrice: 2800000,
            discount: "-21%",
            rating: 4.9,
            reviews: 200,
        },
        {
            id: 14,
            name: "Microondas Digital",
            img: "https://cdn.ipadizate.com/2023/09/iPhone-15-Pro-Max.jpg",
            price: 450000,
            oldPrice: 600000,
            discount: "-25%",
            rating: 4.6,
            reviews: 99,
        },
    ],
};

const Category = () => {
    const [activeCategory, setActiveCategory] = useState("Todas");

    const products = allProducts[activeCategory] || [];

    return (
        <div className="category-section">
            <div className="categories">
                <h2>Categorías populares</h2>
                <p>Encuentra productos por categoría</p>
                <div className="category-buttons">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            className={`${cat.className} ${activeCategory === cat.name ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat.name)}
                        >
                            <i>{cat.icon}</i>
                            {cat.name}
                        </button>
                    ))}
                </div>


            </div>
            <hr />
            <div className="products">
                <h2>Productos destacados</h2>
                <p>{products.length} productos encontrados</p>
                <div className="product-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="product-img">
                                <span className="discount">{product.discount}</span>
                                <img src={product.img} alt={product.name} />
                                <FaRegHeart className="fav" />
                                <span className="free">Envío gratis</span>
                            </div>
                            <h3>{product.name}</h3>
                            <div className="rating">
                                ⭐ {product.rating} ({product.reviews})
                            </div>
                            <p className="old-price">${product.oldPrice.toLocaleString()}</p>
                            <p className="price">${product.price.toLocaleString()}</p>
                            <p className="saving">
                                Ahorra ${(product.oldPrice - product.price).toLocaleString()}
                            </p>
                            <button className="cart-btn">Agregar al carrito</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
