import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio } from 'antd';

import { setCheaperTickets, setFasterTickets, setOptimalTickets } from '../../actions';
import './filter-prices.scss';

const FilterPrices = ({ onCheaperButton, onFasterButton, onOptimalButton }) => {
  return (
    <Radio.Group className="button-group" defaultValue="a" buttonStyle="solid">
      <Radio.Button onClick={onCheaperButton} className="button" value="a">
        <div>Самый дешевый</div>
      </Radio.Button>
      <Radio.Button onClick={onFasterButton} className="button" value="b">
        <div>Самый быстрый</div>
      </Radio.Button>
      <Radio.Button onClick={onOptimalButton} className="button" value="c">
        <div>Оптимальный</div>
      </Radio.Button>
    </Radio.Group>
  );
};

const mapDispatchToProps = {
  onCheaperButton: setCheaperTickets,
  onFasterButton: setFasterTickets,
  onOptimalButton: setOptimalTickets,
};

FilterPrices.propTypes = {
  onCheaperButton: PropTypes.func.isRequired,
  onFasterButton: PropTypes.func.isRequired,
  onOptimalButton: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FilterPrices);
