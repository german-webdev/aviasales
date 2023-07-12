import React from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';

import { setCheaperTickets, setFasterTickets, setOptimalTickets } from '../../actions';
import './filter-prices.scss';

const FilterPrices = ({ onCheaperButton, onFasterButton, onOptimalButton }) => {
  return (
    <Radio.Group className="button-group" defaultValue="a" buttonStyle="solid">
      <Radio.Button onClick={onCheaperButton} className="button" value="a">
        Самый дешевый
      </Radio.Button>
      <Radio.Button onClick={onFasterButton} className="button" value="b">
        Самый быстрый
      </Radio.Button>
      <Radio.Button onClick={onOptimalButton} className="button" value="c">
        Оптимальный
      </Radio.Button>
    </Radio.Group>
  );
};

const mapStateToProps = (state) => {
  return {
    cheaper: state.price.cheaper,
    faster: state.price.faster,
    optimal: state.price.optimal,
  };
};

const mapDispatchToProps = {
  onCheaperButton: setCheaperTickets,
  onFasterButton: setFasterTickets,
  onOptimalButton: setOptimalTickets,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrices);
