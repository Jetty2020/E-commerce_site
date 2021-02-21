import React from "react";
import { withRouter } from "react-router-dom";
import { kkoLogin } from "../../../_actions/user_actions";
import styled from "styled-components";
import { useDispatch } from "react-redux";

function KakaoBtn(props) {
	
	const dispatch = useDispatch(); //dispatch for redux

	const onSubmitHandler = (event) => {
		event.preventDefault();

		dispatch(kkoLogin())
				.then(response => {
						if (response.payload.success) {
								props.history.push('/')
						} else {
								alert('Error˝')
						}
				})


}

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
			<KaKaoBtn type="button" onClick={onSubmitHandler} >
			<Logo src={"/imgs/kakao.png"} alt="kakao" />
				카카오 로그인
			</KaKaoBtn>
		</div>
	);
};

export default withRouter(KakaoBtn);