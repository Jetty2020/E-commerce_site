import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';

function ProductInfo(props) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      <h3
        style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '15px 8px' }}
      >
        상품명 {product.title}
      </h3>

      <table style={{ border: 'hidden', marginTop: '30px' }}>
        <tr>
          <td colSpan="2" style={{ fontSize: '1rem', padding: '0 8px 80px' }}>
            00000원
          </td>
        </tr>
        <tr style={{ backgroundColor: '#fff' }}>
          <td
            colSpan="2"
            style={{
              border: 'hidden',
              fontSize: '0.75rem',
              padding: '0 8px 30px',
            }}
          >
            <p>적립금 000p</p>
            <p>배송비 0000원</p>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#fff' }}>
          <td colSpan="2" style={{ paddingTop: '50px', textAlign: 'right' }}>
            총 구매금액
          </td>
        </tr>
        <tr style={{ backgroundColor: '#fff' }}>
          <td colSpan="2" style={{ border: 'hidden' }}>
            <Button
              size="large"
              type="primary"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                fontSize: '0.9rem',
              }}
            >
              바로 구매하기
            </Button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '5px 0',
              }}
            >
              <Button
                size="large"
                style={{ width: '50%', marginRight: '5px', fontSize: '0.9rem' }}
                onClick={addToCarthandler}
              >
                장바구니 담기
              </Button>
              <Button size="large" style={{ width: '50%', fontSize: '0.9rem' }}>
                위시리스트
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ProductInfo;
