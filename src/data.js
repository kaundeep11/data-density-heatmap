export const generateData = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(Math.floor(Math.random() * 101));
    }
    grid.push(row);
  }
  return grid;
};
