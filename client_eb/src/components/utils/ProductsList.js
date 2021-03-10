import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';

function CreateProducts({ products, onRemove }) {
  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  const Li = styled.li`
    position: relative;
    width: 300px;
    margin: 0 5px 60px;
    cursor: pointer;

    &:hover .wishlist {
      display: block;
    }
  `;
  const Name = styled.p`
    margin-top: 0.75rem;
    font-size: 1.075rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  `;
  const Price = styled.p`
    margin-top: -0.5rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.65);
  `;
  const Text = styled.p`
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
      color: #868e96;
      text-decoration: line-through;
    }
  `;
  const Likes = styled.div`
    margin-top: 2rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.65);
  `;
  const Wishlist = styled.div`
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 40px;
    color: #fff;
    z-index: 5;
  `;

  return (
    <Ul>
      {products.map((product) => (
        <Li key={product.id}>
          <Link to="/product/:productId">
            {product.image && (
              <img
                src={product.image}
                style={{ width: '300px', height: '370px' }}
              />
            )}
            {product.name && <Name>{product.name}</Name>}
            {product.price && !product.discountRate && (
              <Price>{product.price}원</Price>
            )}
            {product.text && <Text>{product.text}</Text>}
            {product.discountRate && (
              <Discount>
                <span className="rate">{product.discountRate}% </span>
                <span className="discount">
                  {product.price * (1 - product.discountRate * 0.01)}원
                </span>
                <span className="price">{product.price}원</span>
              </Discount>
            )}
            {product.likes && (
              <Likes>
                <span style={{ marginRight: '1rem' }}>
                  <Icon type="heart" /> {product.likes}
                </span>
                <span>
                  <Icon type="message" /> {product.reviews}
                </span>
              </Likes>
            )}
          </Link>

          {product.wishlist && (
            <Wishlist className="wishlist" onClick={() => onRemove(product.id)}>
              <Icon type="close" />
            </Wishlist>
          )}
        </Li>
      ))}
    </Ul>
  );
}

export default CreateProducts;
