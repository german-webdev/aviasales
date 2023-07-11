import React from 'react';

import styles from './show-more.module.scss';

const ShowMore = () => {
  return <button type="button" className={styles.button}><span className={styles.button_text}>Показать еще 5 билетов!</span></button>;
};

export default ShowMore;