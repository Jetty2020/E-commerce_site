import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Checkbox, Select, Icon, Modal } from 'antd';
// import UploadProduct from './Sections/UploadProduct';
// import UpdateProduct from './Sections/UpdateProduct';
import RecommendProduct from './Sections/RecommendProduct';

const MyCartPage = () => {
  const { Option } = Select;

  const imageUrl =
    'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg';
  const [products, setProducts] = useState([
    {
      id: 1,
      image: imageUrl,
      name: 'product1',
      category: 'all',
      stock: 1000,
      option: ['option1', 'option2', 'option3'],
      price: 30000,
      discountRate: 10,
      delivery: 0,
      checked: false,
      recommend: false,
      delete: false,
    },
    {
      id: 2,
      image: imageUrl,
      name: 'product2',
      category: 'best',
      stock: 1500,
      option: ['option1', 'option2', 'option3'],
      price: 25000,
      discountRate: 0,
      delivery: 0,
      checked: false,
      recommend: false,
      delete: false,
    },
    {
      id: 3,
      image: imageUrl,
      name: 'product3',
      category: 'new',
      stock: 1000,
      option: ['option1', 'option2', 'option3'],
      price: 35000,
      delivery: 2500,
      checked: false,
      recommend: true,
      delete: false,
    },
  ]);

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

  //카테고리
  const [CategoryValue, setCategoryValue] = useState('all');

  const onChangeCategory = (e) => {
    setCategoryValue(e.currentTarget.value);
  };

  //상품 선택
  const [checked, setChecked] = useState(false);
  const [checkedID, setCheckedID] = useState([]);
  const onCheckAll = () => {
    setChecked(!checked);
    setProducts(products.map((product) => ({ ...product, checked: !checked })));
    if (!checked) {
      setCheckedID(products.map((product) => product.id));
    } else {
      setCheckedID([]);
    }
  };
  const onCheckProduct = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product,
      ),
    );
    let index = products.findIndex((product) => product.id === id);
    if (!products[index].checked) {
      setCheckedID((checkedID) => checkedID.concat(id));
      console.log(index);
    } else {
      checkedID.splice(checkedID.indexOf(id), 1);
    }
  };

  //상품 삭제
  const onRemove = (id) => {
    console.log(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  //추천 상품
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
          <div style={{ width: '23%' }}>상품 정보</div>
          <div style={{ width: '12%' }}>카테고리</div>
          <div style={{ width: '12%' }}>재고수량</div>
          <div style={{ width: '12%' }}>판매금액</div>
          <div style={{ width: '12%' }}>상품 옵션</div>
          <div style={{ width: '12%' }}>배송비</div>
          <div style={{ width: '12%' }}>선택</div>
        </Table>
        {products.map((product) => (
          <>
            <TableRow>
              {/* 체크박스 */}
              <Checkbox
                style={{ width: '5%', textAlign: 'center' }}
                checked={product.checked}
                onClick={() => onCheckProduct(product.id)}
              />

              {/* 상품 정보 */}
              <div
                style={{ width: '23%', display: 'flex', alignItems: 'center' }}
              >
                <img src={product.image} width="100px" height="100px" />
                <div style={{ marginLeft: '15px' }}>
                  {product.recommend ? (
                    <p style={{ fontSize: '0.75rem', color: '#3e91f7' }}>
                      <Icon type="like" />
                      <span> 추천 상품</span>
                    </p>
                  ) : null}
                  <p style={{ fontWeight: 'bold' }}>{product.name}</p>
                </div>
              </div>

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
                  defaultValue={product.category}
                  value={product.category}
                >
                  <Option value="all">All</Option>
                  <Option value="best">Best</Option>
                  <Option value="new">New</Option>
                  <Option value="discount">Discount</Option>
                </Select>
              </div>

              {/* 재고 수량 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                <p>{product.stock}개</p>
              </div>

              {/* 판매금액 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                {product.discountRate > 0 ? (
                  <>
                    <p>
                      <span style={{ color: '#fa5252', fontWeight: 'bold' }}>
                        {product.discountRate}%{' '}
                      </span>
                      {product.price * (1 - product.discountRate * 0.01)}원
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#868e96',
                        textDecoration: 'line-through',
                      }}
                    >
                      {product.price}원
                    </p>
                  </>
                ) : (
                  <p>{product.price}원</p>
                )}
              </div>

              {/* 상품 옵션 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                {product.option.map((option) => (
                  <p style={{ fontSize: '0.8rem' }}>{option}</p>
                ))}
              </div>

              {/* 배송비 */}
              <div style={{ width: '12%', textAlign: 'center' }}>
                {product.delivery > 0 ? (
                  <p>{product.delivery}원</p>
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
          </>
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
            <RecommendProduct products={products} />
          </Modal>
        </div>
        <Button
          type="primary"
          style={{ marginLeft: '5px' }}
          onClick={() => onRemove(checked.id)}
        >
          선택상품 삭제
        </Button>
      </div>
    </div>
  );
};

export default MyCartPage;
