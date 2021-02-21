import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

function KakaoBtn(props) {

  const NaverBtn = styled.button`
  	margin-top: 8px;	
    width: 350px;
    height: 32px;
    color: #FFFFFF;
    background-color: #1EC800;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover {
      /* box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2); */
    }
  `;
  
  const NaverLogo = styled.img`
    width: 30px;
    height: 30px;
  `;

	return (
    <div>
      <a 
      href="/oauth/naver"
      >
        <NaverBtn type="button" >
        <NaverLogo src={"/imgs/naver.png"} alt="naver" />
          네이버 로그인
        </NaverBtn>
      </a>
    </div>
	);
};

export default withRouter(KakaoBtn);