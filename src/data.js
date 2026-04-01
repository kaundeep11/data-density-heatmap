export const generateData = (size = 10) => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(Math.floor(Math.random() * 101));
    }
    grid.push(row);
  }
  return grid;
};
