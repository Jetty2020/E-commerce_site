import React, { useState } from 'react';
import './ProductDetails.css';
import ProductsList from '../../../utils/ProductsList';
import ProductReviews from './ProductReviews';
import ProductQnA from './ProductQnA';

function ProductDetails() {
  //example
  const imageUrl =
    'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg';
  const exampleRelated = [
    {
      id: 1,
      image: imageUrl,
      name: 'Related Product 1',
      price: 20000,
    },
    {
      id: 2,
      image: imageUrl,
      name: 'Related Product 2',
      price: 20000,
    },
    {
      id: 3,
      image: imageUrl,
      name: 'Related Product 3',
      price: 20000,
    },
    {
      id: 4,
      image: imageUrl,
      name: 'Related Product 4',
      price: 20000,
    },
  ];

  //reviews
  const [reviews, setReviews] = useState([
    {
      no: 1,
      rate: 4.5,
      userID: 'eunb**',
      date: '2021-02-28',
      option: 'option1',
      text:
        '너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~ 너무 마음에 들어요~~~',
      image: imageUrl,
      clicked: true,
    },
    {
      no: 2,
      rate: 4,
      userID: 'lee***',
      date: '2021-03-01',
      option: 'option3',
      text: '재구매하러 올게요!!!',
      image: imageUrl,
      clicked: false,
    },
    {
      no: 3,
      rate: 5,
      userID: 'abc12**',
      date: '2021-03-01',
      option: 'option2',
      text: '퀄리티가 진짜 좋네요 좋은 제품 감사합니다 :)',
      image: imageUrl,
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
      sort: '상품문의',
      text: '상품 문의합니다.',
      secret: true,
      answer: true,
    },
    {
      no: 2,
      userID: 'eunb**',
      date: '2021-02-28',
      sort: '배송문의',
      text: '배송 문의합니다.',
      secret: false,
      answer: true,
    },
    {
      no: 3,
      userID: 'lee***',
      date: '2021-02-28',
      sort: '재입고문의',
      text: '재입고 문의합니다.',
      secret: true,
      answer: false,
    },
  ]);

  //tabs
  const content1 = () => {
    return <div>Images</div>;
  };
  const content2 = () => {
    return <ProductsList products={exampleRelated} />;
  };
  const content3 = () => {
    return <ProductReviews reviews={reviews} onClickReview={onClickReview} />;
  };
  const content4 = () => {
    return <ProductQnA qna={qna} />;
  };

  const [tabs, setTabs] = useState([
    { id: 1, title: '상품 설명', content: content1(), selected: true },
    { id: 2, title: '관련 상품', content: content2(), selected: false },
    { id: 3, title: '리뷰', content: content3(), selected: false },
    { id: 4, title: '상품 Q&A', content: content4(), selected: false },
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
