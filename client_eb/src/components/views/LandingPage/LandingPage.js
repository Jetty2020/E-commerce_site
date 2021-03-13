import React from 'react';
import { Tabs } from 'antd';
import ProductsList from '../../utils/ProductsList';
import VisualSlider from './Sections/VisualSlider';
import './LandingPage.css';
import { products } from '../../../_datas/productsData.json';

function LandingPage() {
  //new & hot products
  const { TabPane } = Tabs;

  const RECOMMEND = products.filter((product) => product.recommend === true);
  const NEW = products.filter((product) => product.new === true);
  const HOT = products.filter((product) => product.hot === true);
  const DISCOUNT = products.filter((product) => product.discount === true);
  console.log(RECOMMEND);

  return (
    <div>
      {/* Visual Image */}
      <VisualSlider />

      <div style={{ width: '75%', margin: '0 auto' }}>
        {/* Recommendation Products */}
        <div style={{ margin: '8rem 0 4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            추천 상품
          </h2>
          <ProductsList products={RECOMMEND} />
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
            <ProductsList products={NEW} />
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
            <ProductsList products={HOT} />
          </TabPane>
        </Tabs>

        {/* Discounted Products */}
        <div style={{ margin: '4rem 0 8rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            할인 상품
          </h2>
          <ProductsList products={DISCOUNT} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
