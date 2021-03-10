import React, { useEffect, useState } from 'react';
import { Button, Select, Icon } from 'antd';

function ProductInfo(props) {
  const { Option } = Select;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  //상품 옵션
  const optionList = [
    { id: 1, title: 'option1', quantity: 1 },
    { id: 2, title: 'option2', quantity: 1 },
    { id: 3, title: 'option3', quantity: 1 },
  ];
  const [options, setOptions] = useState([]);
  const onClick = (id) => {
    if (options.find((option) => option.id === id)) {
      return alert('이미 선택한 옵션입니다.');
    }
    setOptions(options.concat(optionList[id - 1]));
  };
  const onRemove = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  //상품 수량
  const onIncrease = (id) => {
    setOptions(
      options.map((option) =>
        option.id === id
          ? { ...option, quantity: option.quantity + 1 }
          : option,
      ),
    );
  };
  const onDecrease = (id) => {
    setOptions(
      options.map((option) =>
        option.id === id
          ? { ...option, quantity: option.quantity - 1 }
          : option,
      ),
    );
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0 8px' }}>
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
          <td colSpan="2" style={{ border: 'hidden' }}>
            <Select defaultValue="option" style={{ width: '100%' }}>
              <Option value="option">- 옵션을 선택해 주세요 -</Option>
              {optionList.map((option) => (
                <Option value={option.title} onClick={() => onClick(option.id)}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </td>
        </tr>
        {options.map((option) => (
          <tr style={{ backgroundColor: '#fff' }}>
            <td style={{ border: 'hidden' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  paddingBottom: '5px',
                  borderBottom: '1px solid #dee2e6',
                  fontSize: '0.8rem',
                }}
              >
                <div style={{ width: '78%', paddingLeft: '20px' }}>
                  {option.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  <Icon
                    type="minus"
                    style={{ cursor: 'pointer' }}
                    onClick={
                      option.quantity > 1 ? () => onDecrease(option.id) : null
                    }
                  />
                  <input
                    type="text"
                    value={option.quantity}
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
                    onClick={() => onIncrease(option.id)}
                  />
                </div>
                <div
                  style={{
                    width: '10%',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  <Icon
                    type="close-square"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onRemove(option.id)}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
        <tr style={{ backgroundColor: '#fff' }}>
          <td colSpan="2" style={{ paddingTop: '25px', textAlign: 'right' }}>
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
