import React from 'react';
import { Button, Rate } from 'antd';

function ProductReviews({ reviews, onClickReview }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          margin: '5px',
        }}
      >
        <Button>리뷰쓰기</Button>
      </div>

      <ul>
        {reviews.reverse().map((review) => (
          <li
            key={review.no}
            style={{
              padding: '20px 10px',
              borderBottom: '1px solid #e9ecef',
              cursor: 'pointer',
            }}
            onClick={() => onClickReview(review.no)}
          >
            <div
              style={{
                overflow: 'hidden',
                fontSize: '0.9rem',
              }}
            >
              <div style={{ float: 'left' }}>
                <Rate
                  allowHalf
                  defaultValue={review.rate}
                  style={{ fontSize: '0.8rem' }}
                />
              </div>
              <div style={{ float: 'left', marginLeft: '10px' }}>
                {review.userID}
              </div>
              <div style={{ float: 'right' }}>{review.date}</div>
            </div>
            <div style={{ position: 'relative', marginTop: '5px' }}>
              <div style={{ color: '#adb5bd' }}>[옵션] {review.option}</div>
              {review.clicked ? (
                <>
                  <div
                    style={{
                      width: '85%',
                      margin: '5px 0 15px',
                      color: '#212529',
                    }}
                  >
                    {review.text}
                  </div>
                  <img width="250px" height="250px" src={review.image} />
                </>
              ) : (
                <>
                  <div
                    style={{
                      marginTop: '5px',
                      paddingRight: '150px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-all',
                    }}
                  >
                    {review.text}
                  </div>
                  <div>
                    <img
                      src={review.image}
                      style={{ position: 'absolute', top: '5px', right: '0' }}
                      width="50px"
                      height="50px"
                    />
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductReviews;
