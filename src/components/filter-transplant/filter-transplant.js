import React from 'react';
import { connect } from 'react-redux';

import { updateCheckedList, toggleCheckAll } from '../../actions';

import styles from './filter-transplant.module.scss';

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
      <div className={styles.checkboxItem} key={option.value}>
        <input type="checkbox" id={option.value} checked={isChecked} onChange={handleChange} />
        <label className={styles.checkboxLabel} htmlFor={option.value}>
          <div className={styles.customCheckbox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#9ABBCE" />
              {isChecked && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#2196F3" />
                  <path
                    d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z"
                    fill="#2196F3"
                  />
                </svg>
              )}
            </svg>
          </div>
          <span className={styles.labelAll}>{option.label}</span>
        </label>
      </div>
    );
  };

  return (
    <div className={styles.checkboxList}>
      <h5 className={styles.checkboxListHeader}>Количество пересадок</h5>
      <div className={styles.checkAll}>
        <input type="checkbox" id="checkAll" checked={checkAll} onChange={onCheckAllChange} />
        <label className={styles.checkboxLabel} htmlFor="checkAll">
          <div className={styles.customCheckbox}>
            {checkAll ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#2196F3" />
                <path
                  d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z"
                  fill="#2196F3"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#9ABBCE" />
              </svg>
            )}
          </div>
          <span className={styles.labelAll}>Все</span>
        </label>
      </div>
      <div className={styles.checkItems}>{plainOptions.map(renderCheckbox)}</div>
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
