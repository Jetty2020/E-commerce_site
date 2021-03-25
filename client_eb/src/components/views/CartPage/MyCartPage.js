import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart, removeCart } from '../../../_actions/user_actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Checkbox, Icon } from 'antd';
import Numeral from 'numeral';

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

const MyCartPage = () => {
  const dispatch = useDispatch();
  // const CART = products.filter((product) => product.cart === true);
  const [myCart, setMyCart] = useState();
  const [checked, setChecked] = useState(false);
  const [checkedID, setCheckedID] = useState([]);
  if (!myCart) {
    dispatch(loadCart())
      .then((response) => {
        if (response.payload.success) {
          if (response.payload.cart) {
            setMyCart(response.payload.cart);
          } else {
            setMyCart([]);
          }
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  //상품 선택
  const onCheckAll = useCallback(() => {
    setChecked(!checked);
    setMyCart(myCart.map((product) => ({ ...product, checked: !checked })));
    if (!checked) {
      setCheckedID(myCart.map((product) => product.id));
    } else {
      setCheckedID([]);
    }
  }, [myCart]);
  const onCheckProduct = useCallback(
    (id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? { ...product, checked: !product.checked }
            : product
        )
      );
      let index = myCart.findIndex((product) => product.id === id);
      if (!myCart[index].checked) {
        setCheckedID((checkedID) => checkedID.concat(id));
      } else {
        checkedID.splice(checkedID.indexOf(id), 1);
      }
    },
    [myCart]
  );

  // console.log(myCart.reduce((acc, cur) => acc.quantity + cur.quantity));
  // console.log(myCart.map((product) => product.quantity));

  //선택상품 삭제
  const onRemoveSelect = useCallback(() => {
    checkedID.map((id) => {
      // console.log(id);
      dispatch(removeCart(id))
        .then((response) => {
          if (response.payload.success) {
          } else {
            console.log(response.payload);
          }
        })
        .catch((err) => {
          alert(err);
        });
    });
    setMyCart(myCart.filter((product) => !checkedID.includes(product.id)));
  }, [myCart]);

  //상품 수량
  const onChangeQuantity = useCallback(
    (e, id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: e.currentTarget.value,
              }
            : product
        )
      );
    },
    [myCart]
  );
  const onIncrease = useCallback(
    (id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    },
    [myCart]
  );
  const onDecrease = useCallback(
    (id) => {
      setMyCart(
        myCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    },
    [myCart]
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
          <div style={{ width: '15%' }}>배송구분</div>
        </Table>
        {myCart && myCart.length > 0 ? (
          myCart.map((product) => (
            <TableRow key={product.id}>
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
                  <img
                    src={product.mainImg}
                    width="100px"
                    height="100px"
                    alt="mainImg"
                  />
                  <div style={{ marginLeft: '15px' }}>
                    <p style={{ fontWeight: 'bold', color: '#555' }}>
                      {product.productName}
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
                  onChange={() => onChangeQuantity(product.id)}
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
                {product.rate > 0 ? (
                  <>
                    <p>
                      <span style={{ color: '#fa5252', fontWeight: 'bold' }}>
                        {product.rate}%{' '}
                      </span>
                      {Numeral(
                        product.price * (1 - product.rate * 0.01)
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
                      적립금 {product.price * (1 - product.rate * 0.01) * 0.01}
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

              {/* 배송구분 */}
              <div style={{ width: '15%', textAlign: 'center' }}>
                <p>기본배송</p>
              </div>
            </TableRow>
          ))
        ) : (
          <TableRow style={{ justifyContent: 'center', padding: '30px 0' }}>
            장바구니에 등록된 상품이 없습니다.
          </TableRow>
        )}
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

      {/* 금액 정보 */}
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
          {/* 총 주문금액 */}
          <div style={{ width: '32.6%' }}>
            <p>
              {myCart && myCart.length > 0
                ? Numeral(
                    myCart.reduce(
                      (acc, cur) =>
                        acc.price * acc.quantity +
                        cur.price * (1 - cur.rate * 0.01) * cur.quantity
                    )
                  ).format(0, 0)
                : '0'}
              원
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                fontWeight: 'normal',
                color: '#adb5bd',
              }}
            >
              {myCart && myCart.length > 0
                ? Numeral(
                    myCart.reduce((acc, cur) => acc.quantity + cur.quantity)
                  ).format(0, 0)
                : '0'}
              개
            </p>
          </div>
          <Icon type="plus" style={{ width: '1%' }} />
          {/* 총 배송비 */}
          <div style={{ width: '32.6%' }}>
            {myCart && myCart.length > 0 ? '2,500원' : '0원'}
          </div>
          <Icon
            type="pause"
            style={{ width: '1%', transform: 'rotate(90deg)' }}
          />
          {/* 총 결제금액 */}
          <div style={{ width: '32.6%' }}>
            {myCart && myCart.length > 0
              ? Numeral(
                  myCart.reduce(
                    (acc, cur) =>
                      acc.price * acc.quantity +
                      cur.price * (1 - cur.rate * 0.01) * cur.quantity +
                      2500
                  )
                ).format(0, 0)
              : '0'}
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
            fontSize: '1.05rem',
          }}
        >
          전체상품 주문
        </Button>
        <Button
          style={{
            height: 'unset',
            margin: '0 2.5px',
            padding: '10px 25px',
            fontSize: '1.05rem',
          }}
        >
          선택상품 주문
        </Button>
      </div>
    </div>
  );
};

export default MyCartPage;
