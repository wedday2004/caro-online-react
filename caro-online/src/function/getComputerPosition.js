const getComputerPosition = arr => {
  let isFound = false;
  let vt = -1;
  while (!isFound) {
    vt = Math.floor(Math.random() * 400);
    let dem = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (vt !== arr[i]) {
        dem += 1;
      }
      if (dem === arr.length) {
        isFound = true;
      }
    }
  }
  return vt;
};

export default getComputerPosition;
