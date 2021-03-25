import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWishlist, addCart } from '../../../../_actions/user_actions';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import Numeral from 'numeral';

const InfoContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  @media only screen and (min-width: 1000px) {
    width: 50%;
    padding: 0 2.5%;
  }
`;

function ProductInfo(props) {
  const dispatch = useDispatch();

  //상품 수량
  const [quantity, setQuantity] = useState(1);

  const onIncrease = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);
  const onDecrease = useCallback(() => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }, [quantity]);

  //위시리스트 추가
  const onAddWishlist = () => {
    dispatch(addWishlist(props.product.id))
      .then((response) => {
        if (response.payload.success) {
          alert('위시리스트에 추가되었습니다.');
        } else {
          alert('에러가 발생했습니다.');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //장바구니 추가
  const onAddCart = () => {
    dispatch(addCart(props.product.id))
      .then((response) => {
        if (response.payload.success) {
          alert('장바구니에 추가되었습니다.');
        } else {
          alert('에러가 발생했습니다.');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <InfoContainer>
      <h3
        style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '15px 8px' }}
      >
        {props.product.productName}
      </h3>

      <table style={{ border: 'hidden', marginTop: '30px' }}>
        <tr>
          <td colSpan="2" style={{ fontSize: '1rem', padding: '0 8px 80px' }}>
            {Numeral(props.product.price).format(0, 0)}원
          </td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
          <td
            colSpan="2"
            style={{
              border: 'hidden',
              fontSize: '0.75rem',
              padding: '0 8px 20px',
            }}
          >
            <p>적립금 {props.product.price * 0.01}p</p>
          </td>
        </tr>
        <tr>
          <td style={{ border: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100px',
                padding: '5px',
                border: '1px solid rgba(0,0,0,0.45)',
                fontSize: '0.75rem',
              }}
            >
              <Icon
                type="minus"
                style={{ cursor: 'pointer' }}
                onClick={onDecrease}
              />
              <input
                type="text"
                value={quantity}
                style={{
                  width: '30px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255,255,255,0)',
                  border: 'none',
                  outline: 'none',
                }}
              />
              <Icon
                type="plus"
                style={{ cursor: 'pointer' }}
                onClick={onIncrease}
              />
            </div>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
          <td colSpan="2" style={{ paddingTop: '50px', textAlign: 'right' }}>
            총 구매금액{'  '}
            <b style={{ fontSize: '1.1rem' }}>
              {Numeral(props.product.price * quantity).format(0, 0)}원
            </b>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
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
                onClick={onAddCart}
              >
                장바구니 담기
              </Button>
              <Button
                onClick={onAddWishlist}
                size="large"
                style={{ width: '50%', fontSize: '0.9rem' }}
              >
                위시리스트
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </InfoContainer>
  );
}

export default ProductInfo;
