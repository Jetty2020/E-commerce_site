import React, { useState } from 'react';
import { Typography, Button, Form, Input, Select } from 'antd';
import FileUpload from '../../../utils/FileUpload';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UpdateProduct(props) {
  const [NameValue, setNameValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [CategoryValue, setCategoryValue] = useState('all');
  const [StockValue, setStockValue] = useState(1);
  const [OptionValue, setOptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [DiscountRateValue, setDiscountRateValue] = useState(0);
  const [DeliveryValue, setDeliveryValue] = useState(0);
  const [Images, setImages] = useState([]);

  const onNameChange = (e) => {
    setNameValue(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescriptionValue(e.currentTarget.value);
  };

  const onPriceChange = (e) => {
    setPriceValue(e.currentTarget.value);
  };

  const onDiscountRateChange = (e) => {
    setDiscountRateValue(e.currentTarget.value);
  };

  const onStockChange = (e) => {
    setStockValue(e.currentTarget.value);
  };

  const onOptionChange = (e) => {
    setOptionValue(e.currentTarget.value);
  };

  const onDeliveryChange = (e) => {
    setDeliveryValue(e.currentTarget.value);
  };

  const onCategorySelectChange = (e) => {
    setCategoryValue(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !NameValue ||
      !DescriptionValue ||
      !PriceValue ||
      !CategoryValue ||
      !StockValue ||
      !DeliveryValue ||
      !Images
    ) {
      return alert('상품 정보를 올바르게 입력해 주세요.');
    }

    const variables = {
      seller: props.user.userData.userID,
      name: NameValue,
      description: DescriptionValue,
      category: CategoryValue,
      price: PriceValue,
      stock: StockValue,
      option: OptionValue,
      delivery: DeliveryValue,
      images: Images,
    };

    Axios.post('/api/product/uploadProduct', variables).then((response) => {
      if (response.data.success) {
        alert('상품이 등록되었습니다.');
        props.history.push('/admin');
      } else {
        alert('상품 등록을 실패하였습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Title level={3}>상품 등록</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '150px',
          }}
        >
          <Select
            onChange={onCategorySelectChange}
            defaultValue="all"
            value={CategoryValue}
          >
            <Option value="all">All</Option>
            <Option value="best">Best</Option>
            <Option value="new">New</Option>
            <Option value="discount">Discount</Option>
          </Select>
        </div>
        <br />
        <label>상품명</label>
        <Input onChange={onNameChange} value={NameValue} />
        <br />
        <br />
        <label>상품 설명</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>판매금액(원)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <label>할인율(%)</label>
        <Input
          onChange={onDiscountRateChange}
          value={DiscountRateValue}
          type="number"
        />
        <br />
        <br />
        <label>옵션</label>{' '}
        <span style={{ color: '#adb5bd' }}> , 로 구분하여 입력해 주세요.</span>
        <Input onChange={onOptionChange} value={OptionValue} type="text" />
        <br />
        <br />
        <label>재고수량(개)</label>
        <Input onChange={onStockChange} value={StockValue} type="number" />
        <br />
        <br />
        <label>
          배송비(원){' '}
          <span style={{ color: '#adb5bd' }}>
            무료일 경우 0으로 입력해 주세요.
          </span>
        </label>
        <Input
          onChange={onDeliveryChange}
          value={DeliveryValue}
          type="number"
        />
        <br />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <Button type="primary" style={{ margin: '0 2px' }} onClick={onSubmit}>
            수정
          </Button>
          <Button style={{ margin: '0 2px' }}>
            <Link to="/admin">취소</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateProduct;
