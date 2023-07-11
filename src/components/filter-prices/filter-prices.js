import React from 'react';
import { Radio } from 'antd';

import './filter-prices.scss';

const FilterPrices = () => {
  return (
    <Radio.Group className="button-group" defaultValue="a" buttonStyle="solid">
      <Radio.Button className="button" value="a">
        Самый дешевый
      </Radio.Button>
      <Radio.Button className="button" value="b">
        Самый быстрый
      </Radio.Button>
      <Radio.Button className="button" value="c">
        Оптимальный
      </Radio.Button>
    </Radio.Group>
  );
};

export default FilterPrices;
