import React from 'react';
import { Tabs } from 'antd';
import ProductsList from '../../utils/ProductsList';
import VisualSlider from './Sections/VisualSlider';
import './LandingPage.css';

function LandingPage() {
  //example
  const imageUrl =
    'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg';
  const exampleProducts = [
    {
      id: 1,
      image: imageUrl,
      name: 'Product 1',
      price: 30000,
    },
    {
      id: 2,
      image: imageUrl,
      name: 'Product 2',
      price: 30000,
    },
    {
      id: 3,
      image: imageUrl,
      name: 'Product 3',
      price: 30000,
    },
    {
      id: 4,
      image: imageUrl,
      name: 'Product 4',
      price: 30000,
    },
    {
      id: 5,
      image: imageUrl,
      name: 'Product 5',
      price: 30000,
    },
    {
      id: 6,
      image: imageUrl,
      name: 'Product 6',
      price: 30000,
    },
    {
      id: 7,
      image: imageUrl,
      name: 'Product 7',
      price: 30000,
    },
    {
      id: 8,
      image: imageUrl,
      name: 'Product 8',
      price: 30000,
    },
  ];
  const exampleNewProducts = [
    {
      id: 1,
      image: imageUrl,
      name: 'New Product 1',
      text: 'New product explains',
    },
    {
      id: 2,
      image: imageUrl,
      name: 'New Product 2',
      text: 'New product explains',
    },
    {
      id: 3,
      image: imageUrl,
      name: 'New Product 3',
      text: 'New product explains',
    },
    {
      id: 4,
      image: imageUrl,
      name: 'New Product 4',
      text: 'New product explains',
    },
    {
      id: 5,
      image: imageUrl,
      name: 'New Product 6',
      text: 'New product explains',
    },
    {
      id: 6,
      image: imageUrl,
      name: 'New Product 7',
      text: 'New product explains',
    },
    {
      id: 7,
      image: imageUrl,
      name: 'New Product 8',
      text: 'New product explains',
    },
    {
      id: 8,
      image: imageUrl,
      name: 'New Product 8',
      text: 'New product explains',
    },
  ];
  const exampleHotProducts = [
    {
      id: 1,
      image: imageUrl,
      name: 'Hot Product 1',
      text: 'Hot product explains',
    },
    {
      id: 2,
      image: imageUrl,
      name: 'Hot Product 2',
      text: 'Hot product explains',
    },
    {
      id: 3,
      image: imageUrl,
      name: 'Hot Product 3',
      text: 'Hot product explains',
    },
    {
      id: 4,
      image: imageUrl,
      name: 'Hot Product 4',
      text: 'Hot product explains',
    },
    {
      id: 5,
      image: imageUrl,
      name: 'Hot Product 5',
      text: 'Hot product explains',
    },
    {
      id: 6,
      image: imageUrl,
      name: 'Hot Product 6',
      text: 'Hot product explains',
    },
    {
      id: 7,
      image: imageUrl,
      name: 'Hot Product 7',
      text: 'Hot product explains',
    },
    {
      id: 8,
      image: imageUrl,
      name: 'Hot Product 8',
      text: 'Hot product explains',
    },
  ];
  const exampleDiscountedProducts = [
    {
      id: 1,
      image: imageUrl,
      name: 'Discounted Product 1',
      discountRate: 10,
      price: 30000,
    },
    {
      id: 2,
      image: imageUrl,
      name: 'Discounted Product 2',
      discountRate: 15,
      price: 30000,
    },
    {
      id: 3,
      image: imageUrl,
      name: 'Discounted Product 3',
      discountRate: 20,
      price: 30000,
    },
    {
      id: 4,
      image: imageUrl,
      name: 'Discounted Product 4',
      discountRate: 25,
      price: 30000,
    },
    {
      id: 5,
      image: imageUrl,
      name: 'Discounted Product 5',
      discountRate: 10,
      price: 30000,
    },
    {
      id: 6,
      image: imageUrl,
      name: 'Discounted Product 6',
      discountRate: 15,
      price: 30000,
    },
    {
      id: 7,
      image: imageUrl,
      name: 'Discounted Product 7',
      discountRate: 20,
      price: 30000,
    },
    {
      id: 8,
      image: imageUrl,
      name: 'Discounted Product 8',
      discountRate: 25,
      price: 30000,
    },
  ];

  //new & hot products
  const { TabPane } = Tabs;

  return (
    <div>
      {/* Visual Image */}
      <VisualSlider />

      <div style={{ width: '75%', margin: '0 auto' }}>
        {/* Search */}
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem auto',
          }}
        >
          <SearchFeature refreshFunction={updateSearchTerms} />
        </div> */}

        {/* Recommendation Products */}
        <div style={{ margin: '8rem 0 4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            추천 상품
          </h2>
          <ProductsList products={exampleProducts} />
        </div>

        {/* New & Hot Products */}
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <h2
                style={{
                  margin: '0.5rem 0',
                  padding: '0 2.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                새로 나온 상품
              </h2>
            }
            key="1"
          >
            <ProductsList products={exampleNewProducts} />
          </TabPane>
          <TabPane
            tab={
              <h2
                style={{
                  padding: '0 2.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                인기 상품
              </h2>
            }
            key="2"
          >
            <ProductsList products={exampleHotProducts} />
          </TabPane>
        </Tabs>

        {/* Discounted Products */}
        <div style={{ margin: '4rem 0 8rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            할인 상품
          </h2>
          <ProductsList products={exampleDiscountedProducts} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
