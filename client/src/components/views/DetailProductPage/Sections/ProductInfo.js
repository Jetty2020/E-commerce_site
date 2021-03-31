import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWishlist, addCart } from '../../../../_actions/user_actions';
import styled from 'styled-components';
import 'antd/dist/antd.css';
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
const ProductName = styled.h3`
  padding: 15px 8px;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Table = styled.table`
  border: hidden;
  margin-top: 30px;
`;
const TableRow = styled.tr`
  background: ${(props) => props.background};
`;
const TableData = styled.td`
  border: hidden;
  column-span: ${(props) => props.colSpan};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  text-align: ${(props) => props.textAlign};
`;
const Price = styled.p`
  margin-top: -0.5rem;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.65);
`;
const Discount = styled.div`
  .rate {
    font-size: 1rem;
    color: #fa5252;
    font-weight: bold;
  }
  .discount {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.65);
  }
  .price {
    display: block;
    margin-top: 0.15rem;
    text-decoration: line-through;
    font-size: 0.8rem;
    color: #868e96;
  }
`;
const Quantity = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  font-size: 0.75rem;
  input {
    width: 30px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    outline: none;
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
      <ProductName>{props.product.productName}</ProductName>

      <Table>
        <TableRow>
          <TableData colSpan="2" fontSize="1rem" padding="0 8px 80px">
            {props.product.price && !props.product.rate && (
              <Price>{Numeral(props.product.price).format(0, 0)}원</Price>
            )}
            {props.product.rate > 0 && (
              <Discount>
                <span className="rate">{props.product.rate}% </span>
                <span className="discount">
                  {Numeral(
                    props.product.price * (1 - props.product.rate * 0.01),
                  ).format(0, 0)}
                  원
                </span>
                <span className="price">
                  {Numeral(props.product.price).format(0, 0)}원
                </span>
              </Discount>
            )}
          </TableData>
        </TableRow>
        <TableRow style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
          <TableData
            colSpan="2"
            style={{
              border: 'hidden',
              fontSize: '0.75rem',
              padding: '0 8px 20px',
            }}
          >
            <p>적립금 {props.product.price * 0.01}p</p>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Quantity>
              <Icon
                type="minus"
                style={{ cursor: 'pointer' }}
                onClick={onDecrease}
              />
              <input type="text" value={quantity} />
              <Icon
                type="plus"
                style={{ cursor: 'pointer' }}
                onClick={onIncrease}
              />
            </Quantity>
          </TableData>
        </TableRow>
        <TableRow style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
          <TableData colSpan="2" padding="50px 10px 0" textAlign="right">
            총 구매금액{'  '}
            {props.product.price && !props.product.rate && (
              <b style={{ fontSize: '1.1rem' }}>
                {Numeral(props.product.price * quantity).format(0, 0)}원
              </b>
            )}
            {props.product.rate > 0 && (
              <b style={{ fontSize: '1.1rem' }}>
                {Numeral(
                  props.product.price *
                    (1 - props.product.rate * 0.01) *
                    quantity,
                ).format(0, 0)}
                원
              </b>
            )}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData colSpan="2">
            <Button
              size="large"
              type="primary"
              style={{ width: '100%', fontSize: '0.9rem' }}
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
          </TableData>
        </TableRow>
      </Table>
    </InfoContainer>
  );
}

export default ProductInfo;
