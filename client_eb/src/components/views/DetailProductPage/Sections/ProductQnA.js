import React from 'react';
import { Button, Icon } from 'antd';

const ProductQnA = ({ qna }) => {
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
        <Button>Q&amp;A 쓰기</Button>
      </div>

      <ul>
        {qna.reverse().map((qna) => (
          <li
            key={qna.no}
            style={{
              padding: '20px 10px',
              borderBottom: '1px solid #e9ecef',
              cursor: 'pointer',
            }}
            onClick={() => qna.secret && alert('비밀글입니다.')}
          >
            <p style={{ marginBottom: '0', color: '#adb5bd' }}>[{qna.sort}]</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {qna.secret ? (
                <div>
                  <Icon type="lock" />
                  <span style={{ marginLeft: '5px' }}>비밀글입니다.</span>
                </div>
              ) : (
                <div>{qna.text}</div>
              )}
              <div>
                <span>{qna.userID}</span>
                <span style={{ margin: '0 15px' }}>{qna.date}</span>
                <span>
                  {qna.answer ? (
                    <Button type="primary">Yes</Button>
                  ) : (
                    <Button type="primary">No</Button>
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductQnA;
