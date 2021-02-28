import React from 'react'



function SaleList() {
  const products = [
    {
      id: 1,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Product 1',
      price: '00000￦',
    },
    {
      id: 2,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Product 2',
      price: '00000￦',
    },
    {
      id: 3,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Product 3',
      price: '00000￦',
    },
    {
      id: 4,
      image:
        'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg',
      name: 'Product 4',
      price: '00000￦',
    }
  ];
  return (
    <div style={{ margin: '8rem 0' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Sales</h2>
      <ul className="main_list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt='sale' />
            <p>Sale {product.name}</p>
            <span className="discount_rate" style={{ color: '#fa5252', fontWeight: 'bold' }}>
              10%{' '}
            </span>
            <span className="discount_rate" >{product.price}</span>
            <span
              style={{
                display: 'block',
                marginTop: '0.15rem',
                color: '#868e96',
                textDecoration: 'line-through',
              }}
            >
              {product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleList;