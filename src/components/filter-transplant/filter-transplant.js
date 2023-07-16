import React from 'react';
import { connect } from 'react-redux';

import { updateCheckedList, toggleCheckAll } from '../../actions';

import styles from './filter-transplant.module.scss';
import enabled from './enable.svg';
import disable from './disable.svg';

const FilterTransplant = ({ plainOptions, checkedList, checkAll, onUpdateCheckedList, onToggleCheckAll }) => {
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
          <div className={styles.custom_checkbox}>
            <img src={isChecked ? enabled : disable} alt="checkbox" />
          </div>
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
          <div className={styles.custom_checkbox}>
            <img src={checkAll ? enabled : disable} alt="checkbox" />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterTransplant);
