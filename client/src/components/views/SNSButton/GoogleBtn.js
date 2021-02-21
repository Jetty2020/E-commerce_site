import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

function GoogleBtn(props) {

  const GoogleBtn = styled.button`
  	margin-top: 8px;	
    width: 350px;
    height: 32px;
    color: #8E95A9;
    background-color: #FFFFFF;
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
      <a 
      href="/oauth/google"
      >
        <GoogleBtn type="button" >
        <Logo src={"/imgs/google.jpg"} alt="google" />
          구글 로그인
        </GoogleBtn>
      </a>
    </div>
	);
};

export default withRouter(GoogleBtn);