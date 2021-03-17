import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../../_datas/productsData.json';
import styled from 'styled-components';
import { Button, Checkbox, Icon } from 'antd';
import Numeral from 'numeral';

const MyCartPage = () => {
  const CART = products.filter((product) => product.cart === true);
  const [myCart, setMyCart] = useState(CART);

  //styled-components
  const Table = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    letter-spacing: -1px;
  `;
  const TableRow = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 0;
    font-size: 0.9rem;
    letter-spacing: -1px;
    border-top: 1px solid #adb5bd;
    p {
      margin: 0;
      padding: 0;
    }
  `;

  //상품 선택
  const [checked, setChecked] = useState(false);
  const [checkedID, setCheckedID] = useState([]);

  const onCheckAll = () => {
    setChecked(!checked);
    setMyCart(myCart.map((product) => ({ ...product, checked: !checked })));
    if (!checked) {
      setCheckedID(myCart.map((product) => product.id));
    } else {
      setCheckedID([]);
    }
  };
  const onCheckProduct = (id) => {
    setMyCart(
      myCart.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product,
      ),
    );
    let index = myCart.findIndex((product) => product.id === id);
    if (!myCart[index].checked) {
      setCheckedID((checkedID) => checkedID.concat(id));
    } else {
      checkedID.splice(checkedID.indexOf(id), 1);
    }
  };

  //선택상품 삭제
  const onRemoveSelect = () => {
    setMyCart(myCart.filter((product) => !checkedID.includes(product.id)));
  };

  //상품 수량
  const onIncrease = useCallback(
    (id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      );
    },
    [myCart],
  );
  const onDecrease = useCallback(
    (id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      );
    },
    [myCart],
  );

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>장바구니</h2>

      <div
        style={{
          borderTop: '3px solid #343a40',
          borderBottom: '1px solid #343a40',
        }}
      >
        <Table>
          <Checkbox
            style={{ width: '7%' }}
            checked={checked}
            onClick={onCheckAll}
          />
          <div style={{ width: '48%' }}>상품 정보</div>
          <div style={{ width: '15%' }}>수량</div>
          <div style={{ width: '15%' }}>주문금액</div>
          <div style={{ width: '15%' }}>배송비</div>
        </Table>
        {myCart.map((product) => (
          <>
            <TableRow>
              {/* 체크박스 */}
              <Checkbox
                style={{ width: '7%', textAlign: 'center' }}
                checked={product.checked}
                onClick={() => onCheckProduct(product.id)}
              />

              {/* 상품 정보 */}
              <Link to={`/product/${product.id}`} style={{ width: '48%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img src={product.image} width="100px" height="100px" />
                  <div style={{ marginLeft: '15px' }}>
                    <p style={{ fontWeight: 'bold', color: '#555' }}>
                      {product.name}
                    </p>
                  </div>
                </div>
              </Link>

              {/* 수량 */}
              <div
                style={{
                  width: '15%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                }}
              >
                <Icon
                  type="minus"
                  style={{ cursor: 'pointer' }}
                  onClick={
                    product.quantity > 1 ? () => onDecrease(product.id) : null
                  }
                />
                <input
                  type="text"
                  value={product.quantity}
                  style={{
                    width: '30px',
                    textAlign: 'center',
                    border: 'none',
                    margin: '0 5px',
                  }}
                />
                <Icon
                  type="plus"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onIncrease(product.id)}
                />
              </div>

              {/* 주문금액 */}
              <div style={{ width: '15%', textAlign: 'center' }}>
                {product.discountRate > 0 ? (
                  <>
                    <p>
                      <span style={{ color: '#fa5252', fontWeight: 'bold' }}>
                        {product.discountRate}%{' '}
                      </span>
                      {Numeral(
                        product.price * (1 - product.discountRate * 0.01),
                      ).format(0, 0)}
                      원
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#868e96',
                        textDecoration: 'line-through',
                      }}
                    >
                      {Numeral(product.price).format(0, 0)}원
                    </p>
                    <p
                      style={{
                        marginTop: '5px',
                        fontSize: '0.8rem',
                        color: '#adb5bd',
                      }}
                    >
                      적립금{' '}
                      {product.price * (1 - product.discountRate * 0.01) * 0.01}
                    </p>
                  </>
                ) : (
                  <>
                    <p>{Numeral(product.price).format(0, 0)}원</p>
                    <p
                      style={{
                        marginTop: '5px',
                        fontSize: '0.8rem',
                        color: '#adb5bd',
                      }}
                    >
                      적립금 {product.price * 0.01}
                    </p>
                  </>
                )}
              </div>

              {/* 배송비 */}
              <div style={{ width: '15%', textAlign: 'center' }}>
                {product.delivery > 0 ? (
                  <p>{Numeral(product.delivery).format(0, 0)}원</p>
                ) : (
                  <p>무료배송</p>
                )}
              </div>
            </TableRow>
          </>
        ))}
      </div>

      {/* 결제금액 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '20px 0',
        }}
      >
        <Button onClick={() => onRemoveSelect()}>선택상품 삭제</Button>
      </div>

      <div
        style={{
          marginTop: '100px',
          borderTop: '3px solid #343a40',
          borderBottom: '1px solid #343a40',
        }}
      >
        <Table style={{ justifyContent: 'space-around' }}>
          <div>총 주문금액</div>
          <div>총 배송비</div>
          <div>총 결제금액</div>
        </Table>
        <TableRow
          style={{
            padding: '30px 0',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
          }}
        >
          <div style={{ width: '32.6%' }}>
            <p>
              {Numeral(
                myCart.reduce(
                  (acc, cur) =>
                    acc.price * acc.quantity +
                    cur.price * (1 - cur.discountRate * 0.01) * cur.quantity,
                ),
              ).format(0, 0)}
              원
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                fontWeight: 'normal',
                color: '#adb5bd',
              }}
            >
              {Numeral(
                myCart.length > 0
                  ? myCart.reduce((acc, cur) => acc.quantity + cur.quantity)
                  : '0',
              ).format(0, 0)}
              개
            </p>
          </div>
          <Icon type="plus" style={{ width: '1%' }} />
          <div style={{ width: '32.6%' }}>
            {Numeral(
              myCart.reduce((acc, cur) => acc.delivery + cur.delivery),
            ).format(0, 0)}
            원
          </div>
          <Icon
            type="pause"
            style={{ width: '1%', transform: 'rotate(90deg)' }}
          />
          <div style={{ width: '32.6%' }}>
            {Numeral(
              myCart.reduce(
                (acc, cur) =>
                  acc.price * acc.quantity +
                  cur.price * (1 - cur.discountRate * 0.01) * cur.quantity +
                  (acc.delivery + cur.delivery),
              ),
            ).format(0, 0)}
            원
          </div>
        </TableRow>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '50px 0 100px',
        }}
      >
        <Button
          type="primary"
          style={{
            height: 'unset',
            margin: '0 2.5px',
            padding: '10px 25px',
            fontSize: '1.1rem',
          }}
        >
          전체상품 주문
        </Button>
        <Button
          style={{
            height: 'unset',
            margin: '0 2.5px',
            padding: '10px 25px',
            fontSize: '1.1rem',
          }}
        >
          선택상품 주문
        </Button>
      </div>
    </div>
  );
};

export default MyCartPage;
