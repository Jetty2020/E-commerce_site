import React, { useState } from 'react';
import './ProductDetails.css';
import ProductReviews from './ProductReviews';
import ProductQnA from './ProductQnA';

function ProductDetails(props) {
  //reviews
  const [reviews, setReviews] = useState([
    {
      no: 1,
      rate: 4.5,
      userID: 'eunb**',
      date: '2021-02-28',
      text: '너무 마음에 들어요~~~',
      clicked: false,
    },
    {
      no: 2,
      rate: 4,
      userID: 'lee***',
      date: '2021-03-01',
      text: '재구매하러 올게요!!!',
      clicked: false,
    },
    {
      no: 3,
      rate: 5,
      userID: 'abc12**',
      date: '2021-03-02',
      text: '퀄리티가 진짜 좋네요 좋은 제품 감사합니다 :)',
      clicked: false,
    },
  ]);

  const onClickReview = (no) => {
    setReviews(
      reviews.map((review) =>
        review.no === no
          ? { ...review, clicked: true }
          : { ...review, clicked: false },
      ),
    );
  };

  //Q & A
  const [qna, setQnA] = useState([
    {
      no: 1,
      userID: 'eunb**',
      date: '2021-02-28',
      text: '상품 문의합니다.',
      secret: true,
      answer: true,
    },
    {
      no: 2,
      userID: 'eunb**',
      date: '2021-02-28',
      text: '배송 문의합니다.',
      secret: false,
      answer: true,
    },
    {
      no: 3,
      userID: 'lee***',
      date: '2021-02-28',
      text: '재입고 문의합니다.',
      secret: true,
      answer: false,
    },
  ]);

  //tabs
  const content1 = () => {
    return (
      <div>
        <img style={{ width: '100%' }} src={props.product.descImg} alt='descImg' />
      </div>
    );
  };
  const content2 = () => {
    return <ProductReviews reviews={reviews} onClickReview={onClickReview} />;
  };
  const content3 = () => {
    return <ProductQnA qna={qna} />;
  };

  const [tabs, setTabs] = useState([
    { id: 1, title: '상품 설명', content: content1(), selected: true },
    { id: 2, title: '리뷰', content: content2(), selected: false },
    { id: 3, title: '상품 Q&A', content: content3(), selected: false },
  ]);

  const onSelectTab = (id) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === id
          ? { ...tab, selected: true }
          : { ...tab, selected: false },
      ),
    );
  };

  return (
    <>
      <div className="tabs_box" style={{ paddingTop: '3px' }}>
        <ul className="tabs_list">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`tab ${tab.selected ? 'on' : 'off'}`}
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
        {tabs.map((tab) => (
          <div key={tab.id}>{tab.selected ? tab.content : null}</div>
        ))}
      </div>
    </>
  );
}

export default ProductDetails;
