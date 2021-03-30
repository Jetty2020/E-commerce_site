import React, { useState } from 'react';
import { Tabs } from 'antd';
import ProductsList from '../../common/ProductsList';
import VisualSlider from './Sections/VisualSlider';
import { useDispatch } from 'react-redux';
import { loadProduct } from '../../../_actions/product_actions';

function LandingPage() {
  const dispatch = useDispatch();
  const [RECOMMEND, setRECOMMEND] = useState();
  const [NEW, setNEW] = useState();
  const [BEST, setBEST] = useState();
  const [DISCOUNT, setDISCOUNT] = useState();

  if (!RECOMMEND) {
    dispatch(loadProduct('recoProduct'))
      .then((response) => {
        if (response.payload.success) {
          setRECOMMEND(response.payload.product.slice(0, 8));
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (!NEW) {
    dispatch(loadProduct('newProduct'))
      .then((response) => {
        if (response.payload.success) {
          setNEW(response.payload.product.slice(0, 8));
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (!BEST) {
    dispatch(loadProduct('bestProduct'))
      .then((response) => {
        if (response.payload.success) {
          setBEST(response.payload.product.slice(0, 8));
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (!DISCOUNT) {
    dispatch(loadProduct('discountProduct'))
      .then((response) => {
        if (response.payload.success) {
          setDISCOUNT(response.payload.product.slice(0, 8));
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  const { TabPane } = Tabs;

  return (
    <div>
      {/* 비주얼 슬라이더 */}
      <VisualSlider />
      {}
      <div style={{ width: '75%', margin: '0 auto' }}>
        {/* 추천 상품 */}
        <div style={{ margin: '8rem 0 4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            추천 상품
          </h2>
          {RECOMMEND && <ProductsList products={RECOMMEND} />}
        </div>

        {/* Best & New 상품 */}
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <h2
                style={{
                  padding: '0 2.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                베스트 상품
              </h2>
            }
            key="1"
          >
            {BEST && <ProductsList products={BEST} />}
          </TabPane>
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
            key="2"
          >
            {NEW && <ProductsList products={NEW} />}
          </TabPane>
        </Tabs>

        {/* 할인 상품 */}
        <div style={{ margin: '4rem 0 8rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
            할인 상품
          </h2>
          {DISCOUNT && <ProductsList products={DISCOUNT} />}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
