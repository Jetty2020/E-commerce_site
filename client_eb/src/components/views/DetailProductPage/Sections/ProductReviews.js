import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, loadReview } from '../../../../_actions/review_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, Input, Rate } from 'antd';

const ReviewButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10xp 5px;
`;
const ReviewContainer = styled.div`
  width: 75%;
  margin: 10px auto;
  .rate {
    min-width: 155px;
    font-size: 1.5rem;
  }
  .review_input {
    width: 100%;
    margin: 5px 0;
  }
  .review_error {
    margin-bottom: 22px;
    padding-top: 10px;
    font-size: 0.725rem;
  }
  .review_button {
    width: 49.5%;
    &:last-child {
      margin-left: 0.5%;
    }
  }
  @media only screen and (min-width: 1000px) {
    display: flex;
    justify-content: center;
    align-items: center;
    .rate {
      margin-right: 10px;
    }
    .review_input {
      width: 440px;
      margin-right: 5px;
    }
    .review_error {
      margin-bottom: unset;
    }
    .review_button {
      width: unset;
      &:last-child {
        margin-right: 5px;
      }
    }
  }
`;

function ProductReviews({ id, onClickReview }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState();
  const [rate, setRate] = useState(3);
  const changeRate = (value) => {
    setRate(value);
  }
  useEffect(() => {
    if (!reviews) {
      dispatch(loadReview(id))
        .then((response) => {
          if (response.payload.success) {
            setReviews(response.payload.review);
          } else {
            console.log(response.payload);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [reviews]);
  const [reviewInput, setReviewInput] = useState(false);
  const toggleReviewInput = useCallback(() => {
    setReviewInput(!reviewInput);
  }, [reviewInput]);

  return (
    <>
      <ReviewButtonContainer>
        {!reviewInput && <Button onClick={toggleReviewInput}>리뷰쓰기</Button>}
      </ReviewButtonContainer>
      {reviewInput && (
        <Formik
          initialValues={{
            review: '',
          }}
          validationSchema={Yup.object().shape({
            review: Yup.string().required('리뷰를 입력해 주세요'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                review: values.review,
                rate,
              };
              dispatch(addReview(id, dataToSubmit))
                .then((response) => {
                  if (response.payload.success) {
                    setReviews(
                      [
                        {
                          id: response.payload.review.id,
                          text: values.review,
                          date: response.payload.review.date,
                          rate,
                          user: { userID: userData.userID },
                        },
                      ].concat(reviews),
                    );
                  } else {
                  }
                })
                .catch((err) => {
                  alert(err);
                });
              toggleReviewInput();
              setSubmitting(true);
              setReviewInput(false);
            }, 0);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <ReviewContainer>
                <Rate 
                  onChange={changeRate}
                  />
                <div>
                  <Input
                    type="text"
                    name="review"
                    disabled={isSubmitting}
                    value={values.review}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`review_input
                      ${
                        errors.review && touched.review
                          ? 'text-input error'
                          : 'text-input'
                      }
                    `}
                  />
                  {errors.review && touched.review && (
                    <div className="review_error input-feedback">
                      {errors.review}
                    </div>
                  )}
                </div>
                <Button
                  type="primary"
                  className="review_button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  등록
                </Button>
                <Button className="review_button" onClick={toggleReviewInput}>
                  취소
                </Button>
              </ReviewContainer>
            );
          }}
        </Formik>
      )}

      {reviews ? (
        <ul>
          {reviews.map((review) => (
            <li
              key={review.id}
              style={{
                padding: '20px 10px',
                borderBottom: '1px solid #e9ecef',
                cursor: 'pointer',
              }}
              onClick={() => onClickReview(review.id)}
            >
              <div
                style={{
                  overflow: 'hidden',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Rate
                    disabled
                    defaultValue={review.rate}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div style={{ float: 'left', marginLeft: '10px' }}>
                  {review.user.userID}
                </div>
                <div style={{ float: 'right' }}>{review.date}</div>
              </div>
              <div style={{ position: 'relative', marginTop: '5px' }}>
                <div
                  style={{
                    width: '85%',
                    margin: '5px 0 15px',
                    color: '#212529',
                  }}
                >
                  {review.text}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: '60px 0', textAlign: 'center' }}>
          작성된 리뷰가 없습니다.
        </p>
      )}
    </>
  );
}

export default ProductReviews;
