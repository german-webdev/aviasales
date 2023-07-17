import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { updateCheckedList, toggleCheckAll } from '../../actions';

import styles from './filter-transplant.module.scss';

const FilterTransplant = ({ plainOptions, checkedList, checkAll, onUpdateCheckedList, onToggleCheckAll }) => {
  const toggleCheckbox = (className, additionalClass, condition) => {
    return classNames(className, {
      [additionalClass]: condition,
    });
  };

  const onChange = (list) => {
    onUpdateCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    const allValues = plainOptions.map((option) => option.value);
    onUpdateCheckedList(e.target.checked ? allValues : []);
    onToggleCheckAll(e.target.checked);
  };

  const renderCheckbox = (option) => {
    const isChecked = checkedList.includes(option.value);

    const handleChange = () => {
      const updatedList = isChecked
        ? checkedList.filter((value) => value !== option.value)
        : [...checkedList, option.value];
      onChange(updatedList);
    };

    return (
      <div className={styles.checkbox_item} key={option.value}>
        <input type="checkbox" id={option.value} checked={isChecked} onChange={handleChange} />
        <label className={styles.checkbox_item__label} htmlFor={option.value}>
          <span className={toggleCheckbox(styles.custom_checkbox, styles.checked, isChecked)} />
          <span className={styles.checkbox_item__text}>{option.label}</span>
        </label>
      </div>
    );
  };

  return (
    <div className={styles.checkbox_container}>
      <h5 className={styles.checkbox_container__header}>Количество пересадок</h5>
      <div className={styles.check_all}>
        <input type="checkbox" id="check_all" checked={checkAll} onChange={onCheckAllChange} />
        <label className={styles.checkbox_label} htmlFor="check_all">
          <span className={toggleCheckbox(styles.custom_checkbox, styles.checked, checkAll)} />
          <span className={styles.checkbox_label__text}>Все</span>
        </label>
      </div>
      <div className={styles.checkbox_items}>{plainOptions.map(renderCheckbox)}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  plainOptions: state.filter.plainOptions,
  checkedList: state.filter.checkedList,
  checkAll: state.filter.checkAll,
});

const mapDispatchToProps = {
  onUpdateCheckedList: updateCheckedList,
  onToggleCheckAll: toggleCheckAll,
};

FilterTransplant.propTypes = {
  plainOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedList: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkAll: PropTypes.bool.isRequired,
  onUpdateCheckedList: PropTypes.func.isRequired,
  onToggleCheckAll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTransplant);
