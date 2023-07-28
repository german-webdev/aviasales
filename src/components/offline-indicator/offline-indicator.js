import './offline-indicator.scss';

import offline from './kingdom-63.png';

const OfflineIndicator = () => {
  return (
    <div className="offline-box">
      <img className="offline-box__img" src={offline} alt="Offline Icon" />
      <span className="offline-box__message">
        Интернет соединение отсутствует, проверьте соединение и повторите снова
      </span>
    </div>
  );
};

export default OfflineIndicator;
