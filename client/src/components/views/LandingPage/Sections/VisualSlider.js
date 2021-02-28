import React from 'react'
import { Carousel } from 'antd';
import { 
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

function VisualSlider() {
  return (
    <div>
      <div className="visual_box">
        <Carousel autoplay style={{ marginTop: '-7px' }}>
          <div>
            <h3 className="visual_slide">Visual image 1</h3>
          </div>
          <div>
            <h3 className="visual_slide">Visual image 2</h3>
          </div>
          <div>
            <h3 className="visual_slide">Visual image 3</h3>
          </div>
          <div>
            <h3 className="visual_slide">Visual image 4</h3>
          </div>
        </Carousel>
        <LeftOutlined className="visual_button prev" />
        <RightOutlined className="visual_button next" />
      </div>     
    </div>
  );
};

export default VisualSlider;