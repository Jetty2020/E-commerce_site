import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

function KakaoBtn(props) {
	
	const KaKaoBtn = styled.button`
		margin-top: 8px;	
	  width: 350px;
	  height: 32px;
	  color: #000000;
	  background-color: #FFEB01;
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

	const Logo = styled.img`
	  width: 25px;
	  height: 25px;
	`;

	return (
		<div>
			<a href="http://localhost:4000/api/users/oauth/kakao">
			<KaKaoBtn type="button" >
			<Logo src={"/imgs/kakao.png"} alt="kakao" />
				카카오 로그인
			</KaKaoBtn>
			</a>
		</div>
	);
};

export default withRouter(KakaoBtn);