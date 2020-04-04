import React from 'react';

const onlineHistory = props => {
  const { currentposition, player, turn, value } = props;
  const cl = `btnNuocdi ${currentposition}`;
  return (
    <button type="button" className={cl}>
      {player} - Lượt {turn} tại ({value % 20} x {Math.floor(value / 20)})
    </button>
  );
};
export default onlineHistory;
