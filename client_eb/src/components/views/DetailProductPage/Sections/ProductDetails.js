import React, { useState } from 'react';
import './ProductDetails.css';
import ProductReviews from './ProductReviews';
import ProductQnA from './ProductQnA';

function ProductDetails(props) {
  //tabs
  const content1 = () => {
    return (
      <div style={{ width: '80%', margin: '30px auto' }}>
        <img style={{ width: '100%' }} src={props.product.descImg} alt='descImg' />
      </div>
    );
  };
  const content2 = () => {
    return <ProductReviews id={props.product.id} />;
  };
  const content3 = () => {
    return <ProductQnA id={props.product.id} />;
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
