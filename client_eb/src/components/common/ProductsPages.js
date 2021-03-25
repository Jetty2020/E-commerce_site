import { Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const PageLi = styled.li`
  margin: 0 4px;
  font-size: 1.025rem;

  &:hover {
    text-decoration: underline;
    color: #308ade;
    cursor: pointer;
  }
`;
const PageNumber = styled.div`
  padding: 0 7px 1px;

  &.active {
    border: 1px solid #308ade;
    border-radius: 2px;
    font-weight: 600;
    color: #308ade;
  }
`;
const PageButton = styled.button`
  all: unset;
  margin: 0 4px;
  padding: 3px 7px 0;
  cursor: pointer;

  &.inactive {
    color: #ababab;
    cursor: default;
  }
`;

function ProductsPages({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  // page number
  const pageNumbers = [];
  let i = 1, maxPage = Math.ceil(totalProducts / productsPerPage);
  if (currentPage > 5) {
    i = currentPage - 4;
  }
  if (maxPage > currentPage + 4) {
    maxPage = currentPage + 4;
  }
  for (i; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PageUl>
        {currentPage > 1 ? (
          <>
            <PageButton onClick={() => paginate(1)}>
              <Icon type="double-left" />
            </PageButton>
            <PageButton onClick={() => paginate(currentPage - 1)}>
              <Icon type="left" />
            </PageButton>
          </>
        ) : (
          <>
            <PageButton className="inactive">
              <Icon type="double-left" />
            </PageButton>
            <PageButton className="inactive">
              <Icon type="left" />
            </PageButton>
          </>
        )}
        {pageNumbers.map((number) => (
          <PageLi key={number} onClick={() => paginate(number)}>
            {number === currentPage ? (
              <PageNumber className="active">{number}</PageNumber>
            ) : (
              <PageNumber>{number}</PageNumber>
            )}
          </PageLi>
        ))}
        {currentPage < pageNumbers.length ? (
          <>
            <PageButton onClick={() => paginate(currentPage + 1)}>
              <Icon type="right" />
            </PageButton>
            <PageButton onClick={() => paginate(pageNumbers.length)}>
              <Icon type="double-right" />
            </PageButton>
          </>
        ) : (
          <>
            <PageButton className="inactive">
              <Icon type="right" />
            </PageButton>
            <PageButton className="inactive">
              <Icon type="double-right" />
            </PageButton>
          </>
        )}
      </PageUl>
    </>
  );
}

export default ProductsPages;
