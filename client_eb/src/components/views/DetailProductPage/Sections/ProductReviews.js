import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Input, Rate } from "antd";

function ProductReviews({ reviews, onClickReview }) {
  const [reviewInput, setReviewInput] = useState(false);
  const showReviewInput = () => {
    setReviewInput(!reviewInput);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <Button onClick={showReviewInput}>리뷰쓰기</Button>
      </div>
      {/* {reviewInput && (
        <Formik
          initialValues={{
            review: "",
          }}
          validationSchema={Yup.object().shape({
            review: Yup.string().required("리뷰를 입력해 주세요"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // let dataToSubmit = {
              //   userID: userData.userID,
              //   userreview: values.review,
              // };
              // dispatch(editUserSendMail(dataToSubmit)).then((response) => {
              //   if (response.payload.success) {
              //     alert("인증번호가 전송되었습니다.");
              //   } else {
              //     // console.log(response.payload.err);
              //     alert(response.payload.message);
              //   }
              // });
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
              <div>
                <div>
                  <Input
                    type="text"
                    name="review"
                    disabled={isSubmitting}
                    value={values.review}
                    style={{ width: "70%" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.review && touched.review
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  <Button
                    type="primary"
                    style={{ margin: "0 10px", fontSize: "0.85rem" }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    작성 완료
                  </Button>
                </div>
                {errors.review && touched.review && (
                  <div
                    className="input-feedback"
                    style={{ marginTop: "5px", marginLeft: "105px" }}
                  >
                    {errors.review}
                  </div>
                )}
              </div>
            );
          }}
        </Formik>
      )} */}

      <ul>
        {reviews.map((review) => (
          <li
            key={review.no}
            style={{
              padding: "20px 10px",
              borderBottom: "1px solid #e9ecef",
              cursor: "pointer",
            }}
            onClick={() => onClickReview(review.no)}
          >
            <div
              style={{
                overflow: "hidden",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ float: "left" }}>
                <Rate
                  allowHalf
                  defaultValue={review.rate}
                  style={{ fontSize: "0.8rem" }}
                />
              </div>
              <div style={{ float: "left", marginLeft: "10px" }}>
                {review.userID}
              </div>
              <div style={{ float: "right" }}>{review.date}</div>
            </div>
            <div style={{ position: "relative", marginTop: "5px" }}>
              {review.clicked ? (
                <>
                  <div
                    style={{
                      width: "85%",
                      margin: "5px 0 15px",
                      color: "#212529",
                    }}
                  >
                    {review.text}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      marginTop: "5px",
                      paddingRight: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordBreak: "break-all",
                    }}
                  >
                    {review.text}
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
