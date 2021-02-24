import React from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function NnHList() {
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
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={
          <h2 style={{ padding: '0 2.5rem', fontSize: '1.5rem' }}>
            New Products
          </h2>
        }
        key="1"
      >
        <ul className="main_list" style={{ marginTop: '0.5rem' }}>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt='new' />
              <p style={{ fontWeight: 'bold' }}>New {product.name}</p>
              <span>New product explains</span>
            </li>
          ))}
        </ul>
      </TabPane>
      <TabPane
        tab={
          <h2 style={{ padding: '0 2.5rem', fontSize: '1.5rem' }}>
            Hot Products
          </h2>
        }
        key="2"
      >
        <ul className="main_list" style={{ marginTop: '0.5rem' }}>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt='hot' />
              <p style={{ fontWeight: 'bold' }}>Hot {product.name}</p>
              <span>Hot product explains</span>
            </li>
          ))}
        </ul>
      </TabPane>
    </Tabs>
  );
};

export default NnHList;