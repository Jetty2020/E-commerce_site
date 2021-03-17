import React, { useState } from 'react';
import { products } from '../../../_datas/productsData.json';
import { Link } from 'react-router-dom';
import Numeral from 'numeral';
import styled from 'styled-components';
import { Button, Checkbox, Select, Icon, Modal } from 'antd';
import RecommendProduct from './Sections/RecommendProduct';
const { Option } = Select;

const AdminPage = () => {
  const SELLING = products.filter((product) => product.selling === true);
  const [selling, setSelling] = useState(SELLING);

  //styled-components
  const Table = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    letter-spacing: -1px;
  `;
  const TableRow = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 0;
    font-size: 0.9rem;
    letter-spacing: -1px;
    border-top: 1px solid #adb5bd;
    p {
      margin: 0;
      padding: 0;
    }
  `;

  //상품 선택
  const [checked, setChecked] = useState(false);
  const [checkedID, setCheckedID] = useState([]);
  const onCheckAll = () => {
    setChecked(!checked);
    setSelling(selling.map((product) => ({ ...product, checked: !checked })));
    if (!checked) {
      setCheckedID(selling.map((product) => product.id));
    } else {
      setCheckedID([]);
    }
  };
  const onCheckProduct = (id) => {
    setSelling(
      selling.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product,
      ),
    );
    let index = selling.findIndex((product) => product.id === id);
    if (!selling[index].checked) {
      setCheckedID((checkedID) => checkedID.concat(id));
    } else {
      checkedID.splice(checkedID.indexOf(id), 1);
    }
  };

  //상품 삭제
  const onRemove = (id) => {
    setSelling(selling.filter((product) => product.id !== id));
  };
  const onRemoveSelect = () => {
    setSelling(selling.filter((product) => !checkedID.includes(product.id)));
  };

  //추천 상품 모달
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //추천 상품 선택
  const recommendDefault = selling.filter(
    (product) => product.recommend === true,
  );
  const [recommended, setRecommended] = useState(recommendDefault);

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>판매자 상품 관리</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem 0',
        }}
      >
        <Select defaultValue={'all'} style={{ width: '150px' }}>
          <Option value="all">All</Option>
          <Option value="best">Best</Option>
          <Option value="new">New</Option>
          <Option value="hot">Hot</Option>
          <Option value="discount">Discount</Option>
        </Select>
      </div>

      <div
        style={{
          borderTop: '3px solid #343a40',
          borderBottom: '1px solid #343a40',
        }}
      >
        <Table>
          <Checkbox
            style={{ width: '5%' }}
            onClick={onCheckAll}
            checked={checked}
          />
          <div style={{ width: '35%' }}>상품 정보</div>
          <div style={{ width: '12%' }}>카테고리</div>
          <div style={{ width: '12%' }}>재고수량</div>
          <div style={{ width: '12%' }}>판매금액</div>
          <div style={{ width: '12%' }}>배송비</div>
          <div style={{ width: '12%' }}>선택</div>
        </Table>
        {selling.map((product) => (
          <div key={product.id}>
            <TableRow>
              {/* 체크박스 */}
              <Checkbox
                style={{ width: '5%', textAlign: 'center' }}
                checked={product.checked}
                onClick={() => onCheckProduct(product.id)}
              />

              {/* 상품 정보 */}
              <Link to={`/product/${product.id}`} style={{ width: '35%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={product.image}
                    width="100px"
                    height="100px"
                    alt="img"
                  />
                  <div style={{ marginLeft: '15px' }}>
                    {product.recommend ? (
                      <p style={{ fontSize: '0.75rem', color: '#3e91f7' }}>
                        <Icon type="like" />
                        <span> 추천 상품</span>
                      </p>
                    ) : null}
                    <p style={{ fontWeight: 'bold', color: '#555' }}>
                      {product.name}
                    </p>
                  </div>
                </div>
              </Link>

              {/* 카테고리 */}
              <div
                style={{
                  width: '12%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Select
                  style={{ minWidth: '100px' }}
                  defaultValue={
                    product.best
                      ? 'best'
                      : product.new
                      ? 'new'
                      : product.hot
                      ? 'hot'
                      : null
                  }
                >
                  <Option value="all">All</Option>
                  <Option value="best">Best</Option>
                  <Option value="new">New</Option>
                  <Option value="hot">Hot</Option>
                </Select>
              </div>

              {/* 재고 수량 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                <p>{Numeral(product.stock).format(0, 0)}개</p>
              </div>

              {/* 판매금액 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                {product.discountRate > 0 ? (
                  <>
                    <p>
                      <span style={{ color: '#fa5252', fontWeight: 'bold' }}>
                        {product.discountRate}%{' '}
                      </span>
                      {Numeral(
                        product.price * (1 - product.discountRate * 0.01),
                      ).format(0, 0)}
                      원
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#868e96',
                        textDecoration: 'line-through',
                      }}
                    >
                      {Numeral(product.price).format(0, 0)}원
                    </p>
                  </>
                ) : (
                  <p>{Numeral(product.price).format(0, 0)}원</p>
                )}
              </div>

              {/* 배송비 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                {product.delivery > 0 ? (
                  <p>{Numeral(product.delivery).format(0, 0)}원</p>
                ) : (
                  <p>무료배송</p>
                )}
              </div>

              {/* 선택 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                <p style={{ margin: '2.5px 0' }}>
                  <Button style={{ fontSize: '0.75rem' }}>
                    <Link to="/admin/update">수정</Link>
                  </Button>
                </p>
                <p style={{ margin: '2.5px 0' }}>
                  <Button
                    type="primary"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => onRemove(product.id)}
                  >
                    삭제
                  </Button>
                </p>
              </div>
            </TableRow>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 0',
        }}
      >
        <div>
          <Button>
            <Link to="/admin/upload">상품 등록</Link>
          </Button>
          <Button style={{ marginLeft: '5px' }} onClick={showModal}>
            추천상품 관리
          </Button>
          <Modal
            title="추천상품"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="완료"
            cancelText="취소"
          >
            <RecommendProduct products={selling} />
          </Modal>
        </div>
        <Button
          type="primary"
          style={{ marginLeft: '5px' }}
          onClick={() => onRemoveSelect()}
        >
          선택상품 삭제
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
