import React, { useState, useRef } from 'react';
import { 
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';



function RecoList() {
  const keywordsArray = [];
  const createKeywords = () => {
    for (let i = 1; i <= 10; i++) {
      keywordsArray.push({
        id: i,
        keyword: '#keyword',
      });
    }
    return keywordsArray;
  };

  const keywordsList = useRef();
  const [keywordSlide, setKeywordSlide] = useState({
    sliding: false,
  });
  const onClickLeft = () => {
    setKeywordSlide({
      sliding: false,
    });
  };
  const onClickRight = () => {
    setKeywordSlide({
      sliding: true,
    });
  };

  createKeywords();
  return (
    <div style={{ margin: '8rem 0' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Weekly Hot Keywords</h2>
      <div className="keywords_box">
      <LeftOutlined 
        className="keywords_button left"
        onClick={onClickLeft} 
      />
        <ul
          className="main_list keywords"
          ref={keywordsList}
          style={{
            left: keywordSlide.sliding ? 'unset' : '0',
            right: keywordSlide.sliding ? '0' : 'unset',
          }}
        >
          {keywordsArray.map((item) => (
            <li key={item.id}>
              <span>
                {item.keyword}
                {item.id}
              </span>
            </li>
          ))}
        </ul>
        <RightOutlined 
          className="keywords_button right"
          onClick={onClickRight}
        />
      </div>
    </div>
  );
};

export default RecoList;