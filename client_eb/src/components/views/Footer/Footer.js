import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 5rem;
  font-size: 0.725rem;
  letter-spacing: -0.5px;
  .company {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    font-weight: bold;
  }
  ul {
    margin-bottom: 1.5rem;
    li {
      display: inline-block;
      margin: 0 1rem;
      cursor: pointer;
    }
  }
  button {
    border: none;
    background-color: rgba(255, 255, 255, 0);
    text-decoration: underline;
    margin-left: 4px;
    cursor: pointer;
  }
  .copyright {
    margin-top: 2rem;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <p className="company">29CONCEPT</p>
      <ul>
        <li>회사소개</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>공지사항</li>
        <li>고객센터</li>
      </ul>
      <p>
        서울특별시 영등포구 당산로 &nbsp; | &nbsp; 대표 홍길동 &nbsp; | &nbsp;
        고객센터 1599-0000 &nbsp; | &nbsp; FAX 02-0000-0000
      </p>
      <p>
        사업자등록번호 : 123-45-67890 &nbsp; | &nbsp; 통신판매업 신고번호 제
        2021-서울-12345 <button>사업자 정보확인</button>
      </p>
      <p className="copyright">&copy; 2021 Company all rights reserved</p>
    </FooterContainer>
  );
}

export default Footer;
