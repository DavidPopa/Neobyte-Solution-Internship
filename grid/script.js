function getRandomNrBetweenValues(prev, i, next) {
  if (next >= 5) {
      return prev;
  } else if (prev <= 0) {
      return next;
  } else {
      return Math.floor(Math.random() * (next - prev + 1) + prev);
  }
}

function createFirstRow(genFirstRandomNr, len) {
  const firstRowOfIsland = [genFirstRandomNr];
  let prev = 0;
  let next = 0;

  for (let i = 1; i < len.length; i++) {
      prev = genFirstRandomNr - 1;
      next = genFirstRandomNr + 1;
      const random = getRandomNrBetweenValues(prev, i, next);

      if (Math.abs(genFirstRandomNr - random) <= 1) {
          firstRowOfIsland.push(random);
          genFirstRandomNr = random;
      } else {
          i--;
      }
  }

  return firstRowOfIsland;
}

function createFirstColumn(genFirstRandomNr, len) {
  const firstColumnOfIsland = [genFirstRandomNr];
  let prev = 0;
  let next = 0;

  for (let i = 1; i < len.length; i++) {
      prev = genFirstRandomNr - 1;
      next = genFirstRandomNr + 1;
      const random = getRandomNrBetweenValues(prev, i, next);

      if (Math.abs(genFirstRandomNr - random) <= 1) {
          firstColumnOfIsland.push(random);
          genFirstRandomNr = random;
      } else {
          i--;
      }
  }

  return firstColumnOfIsland;
}

function generateIsland(n, m) {
  let len = n;
  let fillUp = n;
  const island = Array.from({ length: len }, () => Array(fillUp).fill(0));
  const genFirstRandomNr = Math.floor(Math.random() * (n + 1));

  // Generate first row and first column
  const fRow = createFirstRow(genFirstRandomNr, island[0]);
  const fColumn = createFirstColumn(genFirstRandomNr, island.map(row => row[0]));

  island[0] = fRow;
  for (let i = 0; i < island.length; i++) {
      island[i][0] = fColumn[i];
  }

  for (let i = 1; i < island.length; i++) {
      for (let j = 1; j < island[i].length; j++) {
          island[i][j] = getRandomNrBetweenValues(island[i - 1][j],island[i][j] ,island[i][j - 1]);
      }
  }

  console.log(island);
}

generateIsland(5, 5);


