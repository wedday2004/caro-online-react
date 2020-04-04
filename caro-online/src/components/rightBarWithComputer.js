import React from 'react';
import { Button } from 'react-bootstrap';
import NuocDi from './nuocDi';

import './css/sideBar.css';

const rightBarWithComputer = props => {
  const {
    sort,
    isSort,
    handleBackClick,
    danhsachnuocdi,
    currentposition
  } = props;

  const renderNuocDi = i => {
    let cl = '';
    if (i === currentposition) {
      cl = 'currentposition';
    }
    let tempPlayer = '';
    let turn = 0;
    for (let j = 0; j < danhsachnuocdi.length; j += 1) {
      if (danhsachnuocdi[j] === i) {
        turn = j;
        if (turn % 2 === 0) tempPlayer = 'Bạn';
        else tempPlayer = 'Máy';
      }
    }
    return (
      <NuocDi
        key={i}
        currentposition={cl}
        player={tempPlayer}
        value={i}
        turn={turn}
        onClick={() => handleBackClick(i)}
      />
    );
  };

  const btnDsnd = [];

  for (let i = danhsachnuocdi.length - 1; i >= 0; i -= 1) {
    btnDsnd.push(renderNuocDi(danhsachnuocdi[i]));
  }
  if (isSort) {
    btnDsnd.reverse();
  }

  return (
    <div className="status">
      <p className="nextPlayerTitle">DANH SÁCH NƯỚC ĐI</p>
      <div className="danhsachnuocdi">
        <div className="btnDanhSachNuocDi"> {btnDsnd}</div>
      </div>
      <Button type="button" className="resetBtn" onClick={() => sort()}>
        SẮP XẾP
      </Button>
    </div>
  );
};

export default rightBarWithComputer;
