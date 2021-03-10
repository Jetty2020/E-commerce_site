import React from 'react';
import { Icon } from 'antd';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p className="company">Company</p>
      <ul>
        <li>회사소개</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>공지사항</li>
        <li>고객센터</li>
      </ul>
      <p>
        서울특별시 성동구 상왕십리동 &nbsp; | &nbsp; 대표 홍길동 &nbsp; | &nbsp;
        고객센터 1599-0000 &nbsp; | &nbsp; FAX 02-0000-0000
      </p>
      <p>
        사업자등록번호 : 123-45-67890 &nbsp; | &nbsp; 통신판매업 신고번호 제
        2021-서울-12345 <button>사업자 정보확인</button>
      </p>
      <p className="copyright">&copy; 2021 Company all rights reserved</p>
    </div>
  );
}

export default Footer;
