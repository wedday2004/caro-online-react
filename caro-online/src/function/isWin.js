const dem = (table, huong, x) => {
  let c = 0;
  let i = x;
  const turn = table[i];
  const doithu = turn === 'X' ? 'O' : 'X';
  let block = 0;
  let a = i % 20;
  let b = Math.floor(i / 20);
  const danhDauThang = [];

  while (a >= 0 && a < 20 && b >= 0 && b < 20 && table[a + b * 20] === turn) {
    c += 1;
    danhDauThang.push(a + b * 20);
    a += huong[0][0];
    b += huong[0][1];
  }

  if (a >= 0 && a < 20 && b >= 0 && b < 20 && table[a + b * 20] === doithu) {
    block += 1;
  }
  i = x;
  a = x % 20;
  b = Math.floor(x / 20);

  while (a >= 0 && a < 20 && b >= 0 && b < 20 && table[a + b * 20] === turn) {
    c += 1;
    danhDauThang.push(a + b * 20);
    a += huong[1][0];
    b += huong[1][1];
  }

  if (a >= 0 && a < 20 && b >= 0 && b < 20 && table[a + b * 20] === doithu) {
    block += 1;
  }

  if ((block === 2 && c === 6) || c < 6) return -1;
  return {
    count: c - 1,
    danhdau: danhDauThang
  };
};

const winner = (table, vitri) => {
  const dic = [
    [[-1, -1], [1, 1]],
    [[0, -1], [0, 1]],
    [[1, -1], [-1, 1]],
    [[-1, 0], [1, 0]]
  ];
  for (let i = 0; i < 4; i += 1) {
    const r = dem(table, dic[i], vitri);
    if (r !== -1) {
      return {
        winner: table[vitri],
        winLine: r.danhdau
      };
    }
  }
  return null;
};
export default winner;
