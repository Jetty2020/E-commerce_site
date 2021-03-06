import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadWishlist, removeWishlist } from '../../../_actions/user_actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';
import Numeral from 'numeral';

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const Li = styled.li`
  position: relative;
  width: 300px;
  margin: 0 40px 60px 0;
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
  z-index: 10;
`;

function WishlistPage() {
  const dispatch = useDispatch();
  const [wishlists, setWishlists] = useState();
  const onRemove = (id) => {
    dispatch(removeWishlist(id))
      .then((response) => {
        if (response.payload.success) {
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
    setWishlists(wishlists.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (!wishlists) {
      dispatch(loadWishlist())
        .then((response) => {
          if (response.payload.success) {
            if (response.payload.wish) {
              setWishlists(response.payload.wish);
            } else {
              setWishlists([]);
            }
          } else {
            console.log(response.payload);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [wishlists]);

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>위시리스트</h2>

      {wishlists && wishlists.length > 0 ? (
        <Ul>
          {wishlists.map((product) => (
            <Li key={product.id}>
              <Link to={`/product/${product.id}`}>
                {product.mainImg && (
                  <img
                    src={product.mainImg}
                    style={{
                      width: '300px',
                      height: '370px',
                      objectFit: 'cover',
                    }}
                    alt="img"
                  />
                )}
                {product.productName && <Name>{product.productName}</Name>}
                {product.price && !product.rate && (
                  <Price>{Numeral(product.price).format(0, 0)}원</Price>
                )}
                {product.rate > 0 && (
                  <Discount>
                    <span className="rate">{product.rate}% </span>
                    <span className="discount">
                      {Numeral(
                        product.price * (1 - product.rate * 0.01),
                      ).format(0, 0)}
                      원
                    </span>
                    <span className="price">
                      {Numeral(product.price).format(0, 0)}원
                    </span>
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

              <Wishlist
                className="wishlist"
                onClick={() => onRemove(product.id)}
              >
                <Icon type="close" />
              </Wishlist>
            </Li>
          ))}
        </Ul>
      ) : (
        <p style={{ marginTop: '150px', textAlign: 'center' }}>
          위시리스트에 등록된 상품이 없습니다.
        </p>
      )}
    </div>
  );
}

export default WishlistPage;
