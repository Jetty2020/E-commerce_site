import React, { useRef, useCallback } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';

function VisualSlider() {
  //sample
  const images = [
    {
      src: 'https://anedit.com/anedit/main/main03.jpg',
      title: '1',
    },
    {
      src: 'http://ahwe.co.kr/morenvyimg/main01.jpg',
      title: '2',
    },
    {
      src:
        'https://img.ssfshop.com/display/category/THM/A31/A01/contents/10782_133427_29_KOR_20210310113430.jpg',
      title: '3',
    },
    {
      src: 'http://ahwe.co.kr/morenvyimg/event_ban01.jpg',
      title: '4',
    },
  ];

  const Wrap = styled.div`
    position: relative;
    overflow: hidden;
    margin-top: -7px;

    //dots
    .slick-dots.slick-thumb {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        position: relative;
        display: inline-block;
        &.slick-active {
          span {
            filter: none;
          }
        }
      }
    }
  `;
  //slide
  const Slide = styled.div`
    width: 100%;
    height: 500px;
    text-align: center;
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      vertical-align: top;
    }
  `;
  //prev, next button
  const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 25px);
    padding: 0 10px;
    font-size: 40px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0.5;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  `;
  const PrevButton = styled.button`
    ${defaultButtonStyle} left: 40px;
  `;
  const NextButton = styled.button`
    ${defaultButtonStyle} right: 40px;
  `;
  //pagination
  const Pagination = styled.a`
    display: block;
    width: 50px;
    height: 50px;
  `;
  const Page = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border-radius: 50%;
    filter: grayscale(1);
  `;

  const slickRef = useRef(null);
  const prevSlide = useCallback(() => slickRef.current.slickPrev(), []);
  const nextSlide = useCallback(() => slickRef.current.slickNext(), []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    paging: function () {
      return (
        <Pagination>
          <Page />
        </Pagination>
      );
    },
  };

  return (
    <Wrap>
      <Slick ref={slickRef} {...settings}>
        {images.map((img, i) => {
          return (
            <Slide key={`${img.title}_${i}`}>
              <img src={img.src} />
            </Slide>
          );
        })}
      </Slick>
      <>
        <PrevButton onClick={prevSlide}>
          <Icon type="left" /> <span className="hidden"></span>
        </PrevButton>
        <NextButton onClick={nextSlide}>
          <Icon type="right" /> <span className="hidden"></span>
        </NextButton>
      </>
    </Wrap>
  );
}

export default VisualSlider;
