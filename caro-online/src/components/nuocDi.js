import React from 'react';

const Nuocdi = props => {
  const { currentposition, onClick, player, turn, value } = props;
  const cl = `btnNuocdi ${currentposition}`;
  return (
    <button type="button" className={cl} onClick={() => onClick()}>
      {player} - Lượt {turn} tại ({value % 20} x {Math.floor(value / 20)})
    </button>
  );
};
export default Nuocdi;
