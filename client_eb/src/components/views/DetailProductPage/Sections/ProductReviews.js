import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview, loadReview } from '../../../../_actions/review_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Rate } from 'antd';

function ProductReviews({ id, onClickReview }) {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState();
  const [rate, setRate] = useState(3);
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
  const [reviewInput, setReviewInput] = useState(false);
  const showReviewInput = () => {
    setReviewInput(!reviewInput);
  };

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
        {!reviewInput && <Button onClick={showReviewInput}>리뷰쓰기</Button>}
      </div>
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
                    // setReviews(response.payload.product);
                    // alert(response.payload.success);
                    // setReviews([...reviews, {rate, text: values.review, created_at: }])
                  } else {
                    console.log(response.payload);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
              showReviewInput();
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 0 30px',
                }}
              >
                <Input
                  type="text"
                  name="review"
                  disabled={isSubmitting}
                  value={values.review}
                  style={{ width: '60%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.review && touched.review
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <Button
                  type="primary"
                  style={{ margin: '0 10px', fontSize: '0.85rem' }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  작성하기
                </Button>
                {errors.review && touched.review && (
                  <div
                    className="input-feedback"
                    style={{ marginTop: '5px', marginLeft: '105px' }}
                  >
                    {errors.review}
                  </div>
                )}
              </div>
            );
          }}
        </Formik>
      )}

      <ul>
        {reviews &&
          reviews.map((review) => (
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
    </>
  );
}

export default ProductReviews;
