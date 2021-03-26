import React, { useState } from 'react';
import styled from 'styled-components';
import ProductReviews from './ProductReviews';
import ProductQnA from './ProductQnA';

const TabsBox = styled.div`
  margin-top: 100px;
  padding-top: 3px;
`;
const TabsList = styled.ul`
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
`;
const Tab = styled.li`
  width: 100%;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.color};
  border-bottom: ${(props) => props.borderBottom};
`;

function ProductDetails(props) {
  // 탭메뉴 콘텐츠
  const content1 = () => {
    return (
      <div style={{ width: '80%', margin: '30px auto' }}>
        <img
          style={{ width: '100%' }}
          src={props.product.descImg}
          alt="descImg"
        />
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
      <TabsBox>
        <TabsList>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              color={`${tab.selected ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.3)'}`}
              borderBottom={`${
                tab.selected ? '3px solid #1890ff' : '3px solid #ddd'
              } `}
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.title}
            </Tab>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <div key={tab.id}>{tab.selected ? tab.content : null}</div>
        ))}
      </TabsBox>
    </>
  );
}

export default ProductDetails;
